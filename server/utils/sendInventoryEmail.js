const nodemailer = require("nodemailer");

module.exports = async (email, link) => {
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
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Accept Role of Inventory Manager",
      text: `Dear User,
			You have assigned As Inventory Manager for Your Respective Hospital. Please Click
            on link below to accpt it and set your password Accordingly.

			${link}
			
			
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
