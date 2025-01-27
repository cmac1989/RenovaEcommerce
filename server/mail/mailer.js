const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("Mail host:", process.env.MAIL_HOST);
console.log("Mail port:", process.env.MAIL_PORT);
console.log("Mailer email:", process.env.MAILER_EMAIL);
console.log("Mailer email:", process.env.MAILER_PASSWORD);

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     secure: false,
//     auth: {
//         user: process.env.MAILER_EMAIL,
//         pass: process.env.MAILER_PASSWORD,
//     },
//     logger: true, // Log SMTP communication to console
//     debug: true, // Enable debug output
// })
const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        type: 'OAuth2',
        user: 'cameronmcraecpm@outlook.com',
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
        refreshToken: 'your-refresh-token',
    },
});

// Define email options
const mailOptions = {
    from: '"Your Name" <your-email@example.com>', // Sender address
    to: 'recipient@example.com', // Receiver(s)
    subject: 'Hello from Nodemailer!', // Subject line
    text: 'This is a plain text email!', // Plain text body
    html: '<b>This is an HTML email!</b>', // HTML body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});