const toPdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const { errorResponse } = require("../handlers/index");

function htmlPdf(req, res, next) {
	fs.readFile(
		require.resolve("../views/index.ejs"),
		"utf8",
		(err, template) => {
			if (err) return next(errorResponse("Server error", 500));
			let html = ejs.render(template, {
				name: req.user.getFullName(),
				courses: req._completedCourse,
				regNo: `Validation No.: ${req.user.regNo}`,
			});

			toPdf
				.create(html, { format: "A5", orientation: "landscape" })
				.toBuffer((err, buffer) => {
					if (err) return next(errorResponse("Server error", 500));
					res.set("Content-type", "application/pdf");
					req.mailing = {
						to: req.user.email, // req.body.email
						subject: "Certificate of Completion",
						attachments: {
							filename: "Certificate.pdf",
							content: buffer,
						},
					};
					req.userCertBuffer = buffer;
					next();
				});
		}
	);
}

module.exports = () => htmlPdf;
