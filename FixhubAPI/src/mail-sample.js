var nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
    service: "service",
    auth: {
        user: "user@gmail.com",
        pass: "password",
    },
});

module.exports = transporter;
