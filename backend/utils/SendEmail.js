import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: process.env.NODEMAILER_SERVICE,
			port: 587,
			secure: true,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS
			}
		});

		await transporter.sendMail({
			from: process.env.NODEMAILER_USER,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("Email sent successfully");
	} catch (error) {
		console.log(error, "Email not sent");
	}
};

export default sendEmail;