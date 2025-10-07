function accountDeletionEmail({ name = "User", supportLink = "https://hardiknotion.com/support" }) {
  const title = "Account Deleted Successfully - Hardik Notion";

  const body = `
  <div style="font-family: Arial, 'Segoe UI', sans-serif; background:#f5f7fb; padding:24px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <div style="text-align:center; background:linear-gradient(90deg,#ff4b2b,#ff416c); color:#fff; padding:24px;">
        <h1 style="margin:0; font-size:24px;">Hardik Notion</h1>
        <p style="margin:4px 0 0; font-size:14px; opacity:0.9;">Account Deletion Confirmation</p>
      </div>

      <!-- Content -->
      <div style="padding:24px;">
        <p style="font-size:16px; color:#333;">Hi ${name},</p>
        <p style="font-size:14px; color:#555; line-height:1.6;">
          We're confirming that your account has been <b>successfully deleted</b> from our system. 
          All your personal data and enrolled details have been permanently removed.
        </p>

        <p style="font-size:14px; color:#555; line-height:1.6; margin-top:20px;">
          If this was not you or if you believe this was a mistake, please contact our support team immediately.
        </p>

        <div style="text-align:center; margin:28px 0;">
          <a href="${supportLink}" target="_blank"
             style="display:inline-block; padding:12px 24px; background:linear-gradient(90deg,#ff4b2b,#ff416c); color:#fff;
                    font-weight:bold; border-radius:8px; text-decoration:none; font-size:16px;">
            Contact Support
          </a>
        </div>

        <p style="font-size:12px; color:#999; margin-top:20px;">
          Thank you for being with us. We hope to see you again in the future.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:12px; background:#fafafa; font-size:12px; color:#aaa;">
        © ${new Date().getFullYear()} Hardik Notion
      </div>
    </div>
  </div>
  `;

  return { title, body };
}

module.exports = accountDeletionEmail;
