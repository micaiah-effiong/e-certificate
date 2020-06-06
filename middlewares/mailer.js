const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const errorResponse = require('../handlers/error');

module.exports = function (req, res, next) {
	if (!(req.query.sendToMail
		|| req.body.sendToMail)) return next();
	jwt.verify(process.env.EMAIL_PASS, process.env.EMAIL_PASS_KEY, (err, pwd)=>{

		if (err){
			return next(errorResponse('Could not send mail', 500));
		}

		const transpoter = nodemailer.createTransport({
			tls: {rejectUnauthorized: false},
			service: 'gmail',
			host: 'smtp.gmail.com',
	    port: 465,
	    secure: false,
			auth: {
				type: 'oauth2',
				user: process.env.EMAIL,
		    clientId: process.env.CLIENT_ID,
		    clientSecret: process.env.CLIENT_SECRET,
		    refreshToken: process.env.REFRESH_TOKEN,
		    "expires_in": 3599,
		    accessToken: process.env.ACCESS_TOKEN,
			}
		});

		transpoter.set('oauth2_provision_cb', (user, renew, callback)=>{
			let accessToken = userTokens[user];
			if (!accessToken) return callback(new Error('Unknown user'));
			return callback(null, accessToken)
		});

		let message = {
			from: process.env.APP_ORG,
			to: req.mailing.to,
			subject: req.mailing.subject || req.mailing.title,
			text: req.mailing.text || "",
			html: req.mailing.html || "",
			attachments: [req.mailing.attachments] || []
		}
		transpoter.sendMail(message)
		.then(info=>{
			next();
		})
		.catch(err=>next(err));
	});
}

/*
	1. From
	2. To
	3. Subject <Title>
	4. Text
	5. Html
	6. Attachment <certificate pdf>
*/