const nodemailer = require("nodemailer");

module.exports = async (email, link) => {
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
				rejectUnauthorized:false
			}
		});

		await transporter.sendMail({
			from: 'apoorv.info@gmail.com',
			to: email,
			subject: "Accept Role of Administrator",
			text: 
			`Dear User,
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