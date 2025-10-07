function paymentSuccessTemplate(name, amount, orderId, paymentId) {
  const title = "🎉 Payment Successful - Enrollment Confirmed";

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 650px; margin: auto; padding: 0; 
              background: #f4f7fb; border-radius: 15px; 
              overflow: hidden;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #43cea2, #185a9d);
                padding: 30px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">
        ✅ Payment Confirmed
      </h1>
      <p style="margin: 8px 0 0; font-size: 16px; opacity: 0.9;">
        Thank you for your payment, ${name}!
      </p>
    </div>

    <!-- Badge -->
    <div style="text-align: center; margin-top: -20px;">
      <span style="display: inline-block; background: #fff;
                   padding: 8px 18px; border-radius: 20px;
                   font-size: 14px; font-weight: bold; 
                   color: #185a9d; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        🎓 Enrollment Confirmed
      </span>
    </div>

    <!-- Body -->
    <div style="padding: 25px; text-align: center; color: #333;">
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        We’re excited to let you know that your payment has been received successfully. 
        You now have full access to your course dashboard.
      </p>

      <!-- Payment Details Card -->
      <div style="margin: 25px auto; padding: 20px; background: #fff;
                  border-radius: 12px; box-shadow: 0 6px 15px rgba(0,0,0,0.05);
                  max-width: 450px; text-align: left;">
        <h3 style="margin: 0 0 12px; font-size: 18px; color: #185a9d;">
          Payment Summary
        </h3>
        <p style="margin: 6px 0; font-size: 15px; color: #333;">
          💳 <b>Amount Paid:</b> ₹${amount}
        </p>
        <p style="margin: 6px 0; font-size: 15px; color: #333;">
          🧾 <b>Order ID:</b> ${orderId}
        </p>
        <p style="margin: 6px 0; font-size: 15px; color: #333;">
          🔑 <b>Payment ID:</b> ${paymentId}
        </p>
      </div>

      <!-- CTA -->
      <a href="http://localhost:3000/dashboard"
        style="display: inline-block; margin-top: 20px; padding: 12px 28px; 
               background: linear-gradient(135deg, #43cea2, #185a9d);
               color: white; text-decoration: none; border-radius: 10px;
               font-size: 16px; font-weight: bold; letter-spacing: 0.5px;
               box-shadow: 0 6px 12px rgba(0,0,0,0.15);">
        Go to Dashboard
      </a>
    </div>

    <!-- Footer -->
    <div style="background: #fafafa; padding: 18px; text-align: center;
                font-size: 12px; color: #888; border-top: 1px solid #eee;">
      <p style="margin: 0;">
        Need help? Contact us at 
        <a href="mailto:hardikvishwakarma49@gmail.com" 
           style="color: #185a9d; text-decoration: none;">
          hardikvishwakarma49@gmail.com
        </a>
      </p>
      <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} MyProject. All rights reserved.</p>
    </div>
  </div>
  `;

  return { title, body };
}

module.exports = paymentSuccessTemplate;
