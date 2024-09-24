const nodemailer = require("nodemailer");

module.exports = async (email, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hintelsemamart@gmail.com",
        pass: "frsvchpqbzwpvgyd",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account Verification - SEMAMART",
      text: `Dear User,
			Thank you for choosing SEMAMART! We're thrilled to have you on board. 
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
