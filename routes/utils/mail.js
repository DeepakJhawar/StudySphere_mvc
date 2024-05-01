module.exports = class Mail{
    static nodemailer;
    static transporter;
    static init(){
        Mail.nodemailer = require("nodemailer");
        Mail.transporter = Mail.nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASSWORD
            }
        });
    } 
    static async sendOTPByEmail(email, otp) {
        try {
            await Mail.transporter.sendMail({
                from: '"StudySphere" <' + process.env.MAIL_ID + '>',
                to: email,
                subject: "Signup OTP",
                text: `Your six-digit secure OTP for signup: ${otp}`,
                html: `<p>Your six-digit secure OTP for signup: <br><strong style="font-size: 30px">${otp}</strong></p>`
            });
            console.log("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}