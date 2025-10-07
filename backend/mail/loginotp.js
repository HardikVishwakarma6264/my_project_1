function otpMailTemplate(otp) {
  const title = "OTP Verification Email - BY->Hardik Vishwakarma";

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #ff7e5f, #feb47b); padding: 20px; border-radius: 15px 15px 0 0; color: white;">
      <h1 style="margin: 0; font-size: 32px;">HardikNotion</h1>
      <p style="margin: 5px 0 0 0; font-size: 16px;">Your gateway to easy in HardikNotion</p>
    </div>
    
    <div style="padding: 20px; text-align: center;">
      <h2 style="color: #333;">OTP Verification Email</h2>
      <p style="color: #555;">Hi Buddy,</p>
      <p style="color: #555;">Use the OTP below to verify your account. It's valid for <b>3 minutes</b> only.</p>

      <div style="margin: 20px 0; display: inline-block; background: linear-gradient(270deg, #ff7e5f, #feb47b, #ff7e5f); background-size: 600% 600%; padding: 15px 30px; border-radius: 10px; font-size: 28px; font-weight: bold; color: white; animation: gradientAnimation 4s ease infinite;">
        ${otp}
      </div>

      <p style="color: #888; font-size: 14px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <p style="font-size: 12px; text-align: center; color: #888;">
      Questions? Contact us at <a href="mailto:hardikvishwakarma49@gmail.com" style="color: #ff7e5f;">hardikvishwakarma49@gmail.com</a>
    </p>
  </div>

  <style>
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  </style>
  `;

  return { title, body };
}

module.exports = otpMailTemplate;
