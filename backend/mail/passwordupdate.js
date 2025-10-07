function passwordUpdateTemplate(name, companyName, supportLink) {
  const title = `Password Updated Successfully - ${companyName}`;

  const body = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #1f2937, #374151); padding: 20px; border-radius: 15px 15px 0 0; color: white;">
      <h1 style="margin: 0; font-size: 28px;">${companyName}</h1>
      <p style="margin: 5px 0 0 0; font-size: 16px;">Your security is our priority</p>
    </div>
    
    <div style="padding: 20px; text-align: left;">
      <h2 style="color: #333; text-align: center;">Password Updated Successfully</h2>
      <p style="color: #555;">Hi <strong>${name}</strong>,</p>
      <p style="color: #555;">Your account password has been successfully changed. If you made this change, no further action is required.</p>
      <p style="color: #555;">If you did not request this change, please 
        <a href="${supportLink}" style="color: #2563eb; text-decoration: none; font-weight: bold;">reset your password immediately</a> 
        or contact our support team.</p>
      
      <div style="margin: 20px auto; text-align: center;">
        <a href="${supportLink}" style="display: inline-block; padding: 12px 25px; background: linear-gradient(90deg, #2563eb, #1e40af); color: white; font-weight: bold; border-radius: 8px; text-decoration: none;">Reset Password</a>
      </div>
      
      <p style="color: #888; font-size: 14px; text-align: center;">Stay secure,<br><strong>${companyName} Team</strong></p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <p style="font-size: 12px; text-align: center; color: #888;">
      &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
    </p>
  </div>
  `;

  return { title, body };
}

module.exports = passwordUpdateTemplate;
