import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
//-----------------------------------------------------------------------------
export async function sendMail(subject: string, toEmail: string, otpText: string) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    })

    var mailOptions: Mail.Options = {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject: subject,
        html: otpText,
    }

    transporter.sendMail(mailOptions, (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
        if (error) {
            throw error
        } else {
            return true;
        }
    })
}