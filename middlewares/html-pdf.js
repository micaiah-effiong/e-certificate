const toPdf = require('html-pdf'),
	fs = require('fs'),
	ejs = require('ejs');

const STATIC_FILES = {
	css: 'style.css',
	img: ['tech101 certification of completion.png', 'tech 101 sponsorers.png', 'signature.png']
}

module.exports = function(req, res, next){

	// if(req.user.completed == false) return res.status(401).send();
	let template = fs.readFileSync(require.resolve('../public/certificate.html'), 'utf8');
	let html = template.replace(/{{name}}/g, `${req.user.firstname} ${req.user.lastname}`);
	// console.log(html, req.user.firstname);

	toPdf.create(html, {format: 'A5', orientation: 'landscape'}).toBuffer(function(err, buffer){
		if (err) return res.send(err.stack);
		res.set('Content-type', 'application/pdf');
		req.mailing = {
			to: req.user.email, // req.body.email
			subject: "certificate of completion",
			attachments : {
				filename: "certificate.pdf",
				content: buffer
			}
		};

		req.userCertBuffer = buffer;
		next();
	});
}