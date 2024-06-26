const nodemailer = require("nodemailer");

module.exports = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "semaahealthcare@gmail.com",
        pass: "pwkcapywevrsoofr",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Accept Role of Administrator",
      text: `Dear User,
			You have assigned As Administration for Your SEMA. Please Click
            on link below to accpt it and set your password Accordingly.

			${link}
			
			
			Welcome to SEMAMART!
			
			Best regards,
			Pratibha
			`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
