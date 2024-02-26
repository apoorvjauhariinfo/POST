const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: 'Gmail',
			port: 465,
			secure: true,
			logger:true,
			debug:true,
			auth: {
				user: 'apoorv.info@gmail.com',
				pass: 'rlcweoamswlvqzat',
			},
			tls:{
				rejectUnauthorized:true
			}
		});

		await transporter.sendMail({
			from: 'apoorv.info@gmail.com',
			to: email,
			subject: "SEMAMART EMAIL VERIFICATION",
			text: "Please Enter This OTP on SEMAMART " + text,
		
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};