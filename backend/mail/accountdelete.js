function accountDeletionEmail({ name = "User", supportLink = "https://hardiknotion.com/support" }) {
  const title = "Account Deleted Successfully - Hardik Notion";

  const body = `
  <div style="font-family: Arial, 'Segoe UI', sans-serif; background:#f5f7fb; padding:24px;" class="outer">
    <div style="max-width:600px; width:100%; margin:auto; background:#fff; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.08); overflow:hidden;" class="card">
      
      <!-- Header -->
      <div style="text-align:center; background:linear-gradient(90deg,#ff4b2b,#ff416c); color:#fff; padding:24px;">
        <h1 style="margin:0; font-size:clamp(20px, 5vw, 26px);">Hardik Notion</h1>
        <p style="margin:4px 0 0; font-size:clamp(12px, 3.5vw, 14px); opacity:0.9;">
          Account Deletion Confirmation
        </p>
      </div>

      <!-- Content -->
      <div style="padding:24px;" class="content">
        <p style="font-size:clamp(14px, 4vw, 16px); color:#333;" class="text">
          Hi ${name},
        </p>

        <p style="font-size:clamp(13px, 3.8vw, 14px); color:#555; line-height:1.6;" class="text">
          We're confirming that your account has been <b>successfully deleted</b> from our system. 
          All your personal data and enrolled details have been permanently removed.
        </p>

        <p style="font-size:clamp(13px, 3.8vw, 14px); color:#555; line-height:1.6; margin-top:20px;" class="text">
          If this was not you or if you believe this was a mistake, please contact our support team immediately.
        </p>

        <div style="text-align:center; margin:28px 0;">
          <a href="${supportLink}" target="_blank"
             style="display:inline-block; padding:12px 24px; background:linear-gradient(90deg,#ff4b2b,#ff416c); color:#fff;
                    font-weight:bold; border-radius:8px; text-decoration:none; font-size:clamp(14px, 4vw, 16px);">
            Contact Support
          </a>
        </div>

        <p style="font-size:12px; color:#999; margin-top:20px;" class="muted">
          Thank you for being with us. We hope to see you again in the future.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:12px; background:#fafafa; font-size:12px; color:#aaa;" class="footer">
        © ${new Date().getFullYear()} Hardik Notion
      </div>
    </div>
  </div>

  <style>
    /* ---------------- DARK MODE ENABLED ---------------- */
    @media (prefers-color-scheme: dark) {
      .outer {
        background: #0f0f0f !important;
      }

      .card {
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
        background: #111 !important;
        color: #888 !important;
      }
    }
  </style>
  `;

  return { title, body };
}

module.exports = accountDeletionEmail;
