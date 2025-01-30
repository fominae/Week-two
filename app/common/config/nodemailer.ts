import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true для 465, false для других портов
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function sendEmail(to: string, subject: string, text: string) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        text
    });
}
