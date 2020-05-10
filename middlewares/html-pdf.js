const toPdf = require('html-pdf'),
	fs = require('fs'),
	ejs = require('ejs');

module.exports = function(req, res, next){
	let link = '/certificate/verify/?key='+req.user.regNo;
	let template = fs.readFileSync(require.resolve('../views/index.ejs'), 'utf8');
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