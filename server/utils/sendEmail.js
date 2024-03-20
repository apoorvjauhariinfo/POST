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
				pass: 'kodjxbpggzfawyto',
			},
			tls:{
				rejectUnauthorized:true
			}
		});

		await transporter.sendMail({
			from: 'apoorv.info@gmail.com',
			to: email,
			subject: "Account Verification - SEMAMART",
			text: 
			`Dear User,
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