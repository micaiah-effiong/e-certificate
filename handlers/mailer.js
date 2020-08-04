const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../handlers/index");

function mailer(mail) {
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

  let { to, subject, title, text, html, attachments } = mail;
  attachments = attachments ? [attachments] : [];
  let message = {
    from: process.env.ORG_NAME,
    to: to,
    subject: subject || title || "",
    text: text || "",
    html: html || "",
    attachments,
  };

  transpoter
    .sendMail(message)
    .then((info) => {
      next();
    })
    .catch((err) => next(err));
}

module.exports = mailer;
