
const nodemailer = require('nodemailer');

require('dotenv').config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

// Send email function
const sendEmailConfirmation = async (to, subject, text) => {
    const mailOptions = {
        from: `"Divine Dining Restaurant" <noreply@${process.env.EMAIL_USER}>`,
        //from: '"Divine Dining" <noreply@yourdomain.com>',
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
        // html: '<b>Hello world?</b>' // Optional: HTML body
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmailConfirmation };
