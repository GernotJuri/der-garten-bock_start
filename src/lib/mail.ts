import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporterIdeas = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_IDEAS_USER,
        pass: process.env.SMTP_IDEAS_PASS,
    },
});

const transporterContact = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_CONTACT_USER,
        pass: process.env.SMTP_CONTACT_PASS,
    },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, email, idea, message, context } = req.body;

    if (!email) return res.status(400).json({ error: "E-Mail ist Pflicht." });

    try {
        let transporter;
        let to;
        let subject;
        let htmlContent;

        if (context === "ideas") {
            transporter = transporterIdeas;
            to = process.env.TO_EMAIL_IDEAS || process.env.TO_EMAIL;
            subject = `Neue Idee von ${name || "Unbekannt"}`;
            htmlContent = `
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Idee:</strong><br/>${(idea || "").replace(/\n/g, "<br/>")}</p>
      `;
        } else if (context === "contact") {
            transporter = transporterContact;
            to = process.env.TO_EMAIL_CONTACT || process.env.TO_EMAIL;
            subject = `Neue Kontaktanfrage von ${name || "Unbekannt"}`;
            htmlContent = `
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      `;
        } else {
            return res.status(400).json({ error: "Ungültiger Kontext." });
        }

        await transporter.sendMail({
            from: `"Webseite" <${context === "ideas" ? process.env.SMTP_IDEAS_USER : process.env.SMTP_CONTACT_USER}>`,
            to,
            subject,
            html: htmlContent,
        });

        return res.status(200).json({ message: "E-Mail erfolgreich gesendet." });
    } catch (error) {
        console.error("Mail Fehler:", error);
        return res.status(500).json({ error: "Fehler beim Versenden der E-Mail." });
    }
}
