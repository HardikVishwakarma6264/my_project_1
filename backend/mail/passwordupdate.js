function passwordUpdateTemplate(name, companyName, supportLink) {
  const title = `Password Updated Successfully - ${companyName}`;

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; width:100%; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);" class="container">
    
    <div style="text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #1f2937, #374151); padding: 20px; border-radius: 15px 15px 0 0; color: white;">
      <h1 style="margin: 0; font-size: clamp(22px, 5vw, 28px);">${companyName}</h1>
      <p style="margin: 5px 0 0 0; font-size: clamp(12px, 3.5vw, 16px);">
        Your security is our priority
      </p>
    </div>
    
    <div style="padding: 20px; text-align: left;" class="content">
      <h2 style="color: #333; text-align: center; font-size: clamp(18px, 4.5vw, 24px);" class="text">
        Password Updated Successfully
      </h2>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        Hi <strong>${name}</strong>,
      </p>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        Your account password has been successfully changed. If you made this change, no further action is required.
      </p>

      <p style="color: #555; font-size: clamp(13px, 3.8vw, 16px);" class="text">
        If you did not request this change, please 
        <a href="${supportLink}" style="color: #2563eb; text-decoration: none; font-weight: bold;">
          reset your password immediately
        </a> 
        or contact our support team.
      </p>
      
      <div style="margin: 20px auto; text-align: center;">
        <a href="${supportLink}" 
           style="display: inline-block; padding: 12px 25px; background: linear-gradient(90deg, #2563eb, #1e40af); color: white; font-weight: bold; border-radius: 8px; text-decoration: none; font-size: clamp(14px, 4vw, 16px);">
          Reset Password
        </a>
      </div>
      
      <p style="color: #888; font-size: 14px; text-align: center;" class="muted">
        Stay secure,<br><strong>${companyName} Team</strong>
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <p style="font-size: 12px; text-align: center; color: #888;" class="footer">
      &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
    </p>
  </div>

  <style>
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

module.exports = passwordUpdateTemplate;
