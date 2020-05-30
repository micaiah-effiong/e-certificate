const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	if (!(req.query.sendToMail
		|| req.body.sendMail)) return next();
	jwt.verify(process.env.EMAIL_PASS, process.env.EMAIL_PASS_KEY, (err, pwd)=>{

		if (err){
			res.json({
				success: false,
				error: err,
				msg: "could not send mail"
			})
			return console.log(err)
		}

		const transpoter = nodemailer.createTransport({
			tls: {rejectUnauthorized: false},
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: pwd
			}
		});

		let message = {
			from: process.env.APP_ORG,
			to: req.mailing.to,
			subject: req.mailing.subject || req.mailing.title,
			text: req.mailing.text || "",
			html: req.mailing.html || "",
			attachments: [req.mailing.attachments] || []
		}
		transpoter.sendMail(message).then(function(info){
			next();
		}).catch(console.error);
	})
}

/*
	1. From
	2. To
	3. Subject <Title>
	4. Text
	5. Html
	6. Attachment <certificate pdf>
*/