const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../handlers/index");

function mailer(req, res, next) {
  if (!(req.query.sendToMail || req.body.sendToMail)) return next();

  const transpoter = nodemailer.createTransport({
    // tls: {rejectUnauthorized: false},
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "oauth2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      expires_in: 3599,
      accessToken: process.env.ACCESS_TOKEN,
    },
  });

  transpoter.set("oauth2_provision_cb", (user, renew, callback) => {
    let accessToken = userTokens[user];
    if (!accessToken) return callback(new Error("Unknown user"));
    return callback(null, accessToken);
  });

  let message = {
    from: process.env.ORG_NAME,
    to: req.mailing.to,
    subject: req.mailing.subject || req.mailing.title || "",
    text: req.mailing.text || "",
    html: req.mailing.html || "",
    attachments: [req.mailing.attachments] || [],
  };

  transpoter
    .sendMail(message)
    .then((info) => {
      next();
    })
    .catch((err) => next(err));
}

module.exports = () => mailer;
