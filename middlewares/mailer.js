const nodemailer = require('nodemailer');

module.exports = function (req, res, next) {
	if (!!req.query.sendToMail == false ||
		!!req.body.sendMail == false) return next();

	const transpoter = nodemailer.createTransport({
		tls: {rejectUnauthorized: false},
		service: 'gmail',
		auth: {
			user: "micaiah.effiong@gmail.com",
			pass: process.env.emailPass
		}
	});

	let message = {
		from: "Micaiah Effiong",
		to: req.mailing.to,
		subject: req.mailing.subject || req.mailing.title,
		text: req.mailing.text || "",
		html: req.mailing.html || "",
		attachments: [req.mailing.attachments] || []
	}
	transpoter.sendMail(message).then(function(info){
		next();
	}).catch(console.error);
}

/*
	1. From
	2. To
	3. Subject <Title>
	4. Text
	5. Html
	6. Attachment <certificate pdf>
*/