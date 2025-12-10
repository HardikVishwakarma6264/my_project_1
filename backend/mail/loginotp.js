function otpMailTemplate(otp) {
  const title = "OTP Verification Email - BY->HardikNotion";

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; width: 100%; margin: auto; padding: 15px; background: #f9f9f9; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); box-sizing: border-box;" class="container">
    
    <div style="text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #ff7e5f, #feb47b); padding: 18px; border-radius: 15px 15px 0 0; color: white;" class="header">
      <h1 style="margin: 0; font-size: clamp(22px, 5vw, 32px);" class="title">HardikNotion</h1>
      <p style="margin: 5px 0 0 0; font-size: clamp(12px, 3.5vw, 16px);" class="subtitle">
        Your gateway to easy in HardikNotion
      </p>
    </div>
    
    <div style="padding: 15px; text-align: center;" class="content">
      <h2 style="color: #333; font-size: clamp(18px, 4.5vw, 24px);" class="heading">
        OTP Verification Email
      </h2>

      <p style="color: #555; font-size: 14px;" class="text">Hi Buddy,</p>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        Use the OTP below to verify your account. It's valid for <b>3 minutes</b> only.
      </p>

      <div style="margin: 20px auto; display: inline-block; background: linear-gradient(270deg, #ff7e5f, #feb47b, #ff7e5f); background-size: 600% 600%; padding: 14px 28px; border-radius: 10px; font-size: clamp(22px, 6vw, 32px); font-weight: bold; color: white; animation: gradientAnimation 4s ease infinite; letter-spacing: 3px;">
        ${otp}
      </div>

      <p style="color: #888; font-size: 13px; margin-top: 20px;" class="text-muted">
        If you did not request this, please ignore this email.
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <p style="font-size: 12px; text-align: center; color: #888; word-break: break-all;" class="footer">
      Questions? Contact us at 
      <a href="mailto:hardikvishwakarma49@gmail.com" style="color: #ff7e5f;" class="link">
        hardikvishwakarma49@gmail.com
      </a>
    </p>
  </div>

  <style>
    @keyframes gradientAnimation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* ---------------- DARK MODE ENABLED ---------------- */
    @media (prefers-color-scheme: dark) {
      .container {
        background: #1a1a1a !important;
        color: #e6e6e6 !important;
        box-shadow: 0 8px 30px rgba(255,255,255,0.05) !important;
      }

      .content, .footer, .text, .text-muted {
        color: #d1d1d1 !important;
      }

      h2, h1, p {
        color: #f0f0f0 !important;
      }

      .footer {
        color: #bbbbbb !important;
      }

      hr {
        border-top: 1px solid #333 !important;
      }
    }
  </style>
  `;

  return { title, body };
}

module.exports = otpMailTemplate;
