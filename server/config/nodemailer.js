import nodemailer from 'nodemailer'

// use a smtp provider to send the mail(you can use any smtp provider that provides the smtp service)
const transporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port: 587,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})
export default transporter