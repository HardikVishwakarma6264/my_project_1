function passwordreset({ name = "User", resetLink, expiresInMinutes = 30 }) {
  const title = "Reset Your Password - Hostel-9";

  const body = `
  <div style="font-family: Arial, 'Segoe UI', sans-serif; background:#f5f7fb; padding:24px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <div style="text-align:center; background:linear-gradient(90deg,#6a11cb,#2575fc); color:#fff; padding:24px;">
        <h1 style="margin:0; font-size:24px;">HardikNotion</h1>
        <p style="margin:4px 0 0; font-size:14px; opacity:0.9;">Secure Password Reset</p>
      </div>

      <!-- Content -->
      <div style="padding:24px;">
        <p style="font-size:16px; color:#333;">Hi ${name},</p>
        <p style="font-size:14px; color:#555; line-height:1.6;">
          We received a request to reset your password. Click the button below to set a new one.
          <br>This link will expire in <b>${expiresInMinutes} minutes</b>.
        </p>

        <div style="text-align:center; margin:28px 0;">
          <a href="${resetLink}" target="_blank"
             style="display:inline-block; padding:12px 24px; background:linear-gradient(90deg,#6a11cb,#2575fc); color:#fff;
                    font-weight:bold; border-radius:8px; text-decoration:none; font-size:16px;">
            Reset Password
          </a>
        </div>

        <p style="font-size:13px; color:#666;">If the button doesn’t work, copy and paste this URL into your browser:</p>
        <p style="font-size:12px; background:#f4f6fb; padding:10px; border-radius:6px; word-break:break-all;">
          <a href="${resetLink}" target="_blank" style="color:#2575fc;">${resetLink}</a>
        </p>

        <p style="font-size:12px; color:#999; margin-top:20px;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:12px; background:#fafafa; font-size:12px; color:#aaa;">
        © ${new Date().getFullYear()} Hostel-9
      </div>
    </div>
  </div>
  `;

  return { title, body };
}

module.exports = passwordreset;
