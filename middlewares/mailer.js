const nodemailer = require('nodemailer');

module.exports = function (req, res, next) {
	console.log(req.query, (!!req.query.sendToMail));
	if (!!req.query.sendToMail == false ||
		!!req.body.sendMail == false) return next();

	console.log('creating account');

	console.log('creating transport');
	const transpoter = nodemailer.createTransport({
		/*host: 'smtp.ethereal.email',
		port: 587,
		secure: false,*/
		tls: {rejectUnauthorized: false},
		service: 'gmail',
		auth: {
			user: "micaiah.effiong@gmail.com",
			pass: ''
		}
	});
	// let message = Object.create(null);
	console.log('creating message');
	let message = {
		from: "Micaiah Effiong",
		to: req.mailing.userEmail,
		subject: req.mailing.subject || req.mailing.title,
		text: req.mailing.text || "",
		html: req.mailing.html || "",
		attachments: [req.mailing.attachments] || []
	}
	console.log('sending message');
	transpoter.sendMail(message).then(function(info){
		console.log('done with mailer', info);
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