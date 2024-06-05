const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      logger: true,
      debug: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account Verification - SEMAMART",
      text: `Dear User,
			Thank you for choosing SEMMART! We're thrilled to have you on board. 
			To ensure the security of your account, we require a quick verification step.
			Please use the following One-Time Passcode (OTP) to complete your registration:
			
			OTP: ${text}
			
			Welcome to SEMAMART!
			
			Best regards,
			SEMAMART Team
			`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
