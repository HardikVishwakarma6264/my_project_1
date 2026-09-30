function passwordreset({ name = "User", resetLink, expiresInMinutes = 30 }) {
  const title = "Reset Your Password - FutureNotion";

  const body = `
  <div style="font-family: Arial, 'Segoe UI', sans-serif; background:#f5f7fb; padding:24px;" class="outer">
    <div style="max-width:600px; width:100%; margin:auto; background:#fff; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.08); overflow:hidden;" class="card">
      
      <!-- Header -->
      <div style="text-align:center; background:linear-gradient(90deg,#6a11cb,#2575fc); color:#fff; padding:24px;">
        <h1 style="margin:0; font-size:clamp(20px, 5vw, 26px);">FutureNotion</h1>
        <p style="margin:4px 0 0; font-size:clamp(12px, 3.5vw, 14px); opacity:0.9;">
          Secure Password Reset
        </p>
      </div>

      <!-- Content -->
      <div style="padding:24px;" class="content">
        <p style="font-size:clamp(14px, 4vw, 16px); color:#333;" class="text">
          Hi ${name},
        </p>

        <p style="font-size:clamp(13px, 3.8vw, 14px); color:#555; line-height:1.6;" class="text">
          We received a request to reset your password. Click the button below to set a new one.
          <br>This link will expire in <b>${expiresInMinutes} minutes</b>.
        </p>

        <div style="text-align:center; margin:28px 0;">
          <a href="${resetLink}" target="_blank"
             style="display:inline-block; padding:12px 24px; background:linear-gradient(90deg,#6a11cb,#2575fc); color:#fff;
                    font-weight:bold; border-radius:8px; text-decoration:none; font-size:clamp(14px, 4vw, 16px);">
            Reset Password
          </a>
        </div>

        <p style="font-size:13px; color:#666;" class="text">
          If the button doesn’t work, copy and paste this URL into your browser:
        </p>

        <p style="font-size:12px; background:#f4f6fb; padding:10px; border-radius:6px; word-break:break-all;" class="linkbox">
          <a href="${resetLink}" target="_blank" style="color:#2575fc;">${resetLink}</a>
        </p>

        <p style="font-size:12px; color:#999; margin-top:20px;" class="muted">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:12px; background:#fafafa; font-size:12px; color:#aaa;" class="footer">
        © ${new Date().getFullYear()} FutureNotion. All rights reserved.
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

      .linkbox {
        background: #222 !important;
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

module.exports = passwordreset;
