const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    process.env.SMTP_CLIENT_ID,
    process.env.SMTP_CLEINT_SECRET,
    process.env.SMTP_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.SMTP_REFRESH_TOKEN });

async function sendEmail(options) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE_PROVIDER,
            auth: {
                type: 'OAuth2',
                user: process.env.SMTP_EMAIL_ADRESS,
                clientId: process.env.SMTP_CLIENT_ID,
                clientSecret: process.env.SMTP_CLEINT_SECRET,
                refreshToken: process.env.SMTP_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: `Saikiran Patil <${process.env.SMTP_EMAIL_ADRESS}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;