const toPdf = require('html-pdf');
const errorResponse = require('../handlers/error');
const fs = require('fs');
const ejs = require('ejs');

module.exports = function(req, res, next){
	fs.readFile(require.resolve('../views/index.ejs'), 'utf8', (err, template)=>{
		if (err) return console.log(err);
		let html = ejs.render(template, {
			name: req.user.getFullName(),
			courses: req._completedCourse,
			regNo: `Validation No.: ${req.user.regNo}`
		});

		toPdf.create(html, {format: 'A5', orientation: 'landscape'}).toBuffer(function(err, buffer){
			if (err) return next(errorResponse('Server error', 500));
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