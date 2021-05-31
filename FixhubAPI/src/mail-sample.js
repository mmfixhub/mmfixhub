var nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
    service: "service",
    auth: {
        user: "user@service.com",
        pass: "password",
    },
});

module.exports = transporter;
