import { apiconnector } from "../apiconnector";
import { paymentenroll } from "../apis";
import toast from "react-hot-toast";
import hard_img from "../..//images/hard_img.jpg";
import { clearCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VARIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = paymentenroll;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buycourse({
  courses,
  token,
  userdetail,
  navigate,
  dispatch,
}) {
  const toastid = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // ✅ Create Razorpay order from backend
    const orderresponse = await apiconnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("ORDER RESPONSE aya", orderresponse.data);


    if (!orderresponse.data.success) {
      throw new Error(orderresponse.data.message);
    }

    const options = {
  key: process.env.REACT_APP_RAZORPAY_KEY, // ✅ sahi
  currency: orderresponse.data.order.currency,
amount: orderresponse.data.order.amount,
order_id: orderresponse.data.order.id,

  name: "HardikNotion",
  description: "Thank you for purchasing the course",
  // image: hard_img,
  prefill: {
    name: `${userdetail.firstname}`,
    email: userdetail.email,
  },
  handler: function (response) {
    sendpaymentsuccessemail(
      response.razorpay_order_id,
      response.razorpay_payment_id,
      orderresponse.data.order.amount,
      token
    );

    verifypayment({ ...response, courses }, token, navigate, dispatch);
  },
};


    // ✅ Open Razorpay checkout
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log("PAYMENT API ERROR........->", error);
    toast.error("Could not make payment");
  }
  toast.dismiss(toastid);
}

export const sendpaymentsuccessemail = async (orderid, paymentid, amount, token) => {
  try {
    const response = await apiconnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderid,
        paymentid,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Payment success email error:", error.response?.data || error.message);
    throw error;
  }
};




//verify payment

async function verifypayment(bodydata, token, navigate, dispatch) {
  const toastid = toast.loading("Verifiying payment....");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiconnector("POST", COURSE_VARIFY_API, bodydata, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");

    // ✅ Clear cart after successful payment
    dispatch(clearCart());
  } catch (error) {
    console.log("payment verify error...->", error);
    toast.error("Could not verify payment");
  }
  toast.dismiss(toastid);
  dispatch(setPaymentLoading(false));
}
