function coursePurchaseTemplate(studentName, courseName) {
  const title = `Course Purchase Confirmation - ${courseName}`;

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; width:100%; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);" class="container">
    
    <div style="text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #4facfe, #00f2fe); padding: 20px; border-radius: 15px 15px 0 0; color: white;">
      <h1 style="margin: 0; font-size: clamp(22px, 5vw, 32px);">Thank You!</h1>
      <p style="margin: 5px 0 0 0; font-size: clamp(12px, 3.5vw, 16px);">
        Your course purchase was successful 🎉
      </p>
    </div>
    
    <div style="padding: 20px; text-align: center;" class="content">
      <h2 style="color: #333; font-size: clamp(18px, 4.5vw, 24px);" class="text">
        Hello ${studentName},
      </h2>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        You have successfully enrolled in the course:
      </p>

      <div style="margin: 20px 0; display: inline-block; background: linear-gradient(270deg, #4facfe, #00f2fe, #4facfe); background-size: 600% 600%; padding: 15px 30px; border-radius: 10px; font-size: clamp(18px, 5vw, 22px); font-weight: bold; color: white; animation: gradientAnimation 4s ease infinite;">
        ${courseName}
      </div>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        We’re excited to have you onboard 🚀. Start learning and enjoy your journey.
      </p>

      <a
  href="https://hardiknotion.hardikvish.me/login"
  style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #4facfe; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: clamp(14px, 4vw, 16px);"
>
  Go to My Course
</a>

      <p style="color: #888; font-size: 14px; margin-top: 20px;" class="muted">
        If you face any issues, feel free to contact us.
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <p style="font-size: 12px; text-align: center; color: #888;" class="footer">
      Questions? Contact us at 
      <a href="mailto:hardikvishwakarma49@gmail.com" style="color: #4facfe;">
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
        box-shadow: 0 8px 30px rgba(255,255,255,0.06) !important;
      }

      .content {
        background: #1a1a1a !important;
      }

      .text {
        color: #e6e6e6 !important;
      }

      .muted {
        color: #aaaaaa !important;
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

module.exports = coursePurchaseTemplate;
