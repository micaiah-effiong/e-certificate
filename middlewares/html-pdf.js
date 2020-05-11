const toPdf = require('html-pdf'),
	fs = require('fs'),
	ejs = require('ejs');

module.exports = function(req, res, next){
	let link = '/certificate/verify/?key='+req.user.regNo;
	fs.readFile(require.resolve('../views/index.ejs'), 'utf8', (err, template)=>{
		if (err) return console.log(err);

		let html = ejs.render(template, {
			name: req.user.getFullname(),
			courses: req.user.completedCourse,
			link: `<a href="${link}"> click here to verify certificate </a>`
		});

		toPdf.create(html, {format: 'A5', orientation: 'landscape'}).toBuffer(function(err, buffer){
			if (err) return res.send(err.stack);
			res.set('Content-type', 'application/pdf');
			req.mailing = {
				to: req.user.email, // req.body.email
				subject: "Certificate of Completion",
				attachments : {
					filename: "Certificate.pdf",
					content: buffer
				}
			};

			req.userCertBuffer = buffer;
			next();
		});
	});
}