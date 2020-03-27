const toPdf = require('html-pdf'),
	fs = require('fs'),
	ejs = require('ejs');

module.exports = function(req, res, next){


	/*
	fetch('localhost:3300/certificate')
		.then(function(_res){
			console.log(_res)
		}, function(e){
			console.log(e)
		});
	*/

	// if(req.user.completed == false) return res.status(401).send();

	let template = fs.readFileSync(require.resolve('../public/certificate.html'), 'utf8');
	console.log('creating pdf');
	toPdf.create(template, {format: 'A5', orientation: 'landscape'}).toBuffer(function(err, buffer){
		if (err) return res.send(err.stack);
		res.set('Content-type', 'application/pdf');
		req.mailing = {
			userEmail: "micaiah.effiong@gmail.com", // req.body.email
			subject: "certificate of completion",
			attachments : {
				filename: "certificate.pdf",
				content: buffer
			}
		};

		req.userCertBuffer = buffer
		console.log('going to mailer');
		next();
	});
}