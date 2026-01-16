'use server'

import { Resend } from 'resend';

interface ActionState {
    success: boolean;
    message: string;
}

export async function sendEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
    console.log("Started sendEmail action...");

    const apiKey = process.env.RESEND_API_KEY;

    // Log if key exists (DO NOT log the actual key)
    if (!apiKey) {
        console.error("❌ CRITICAL: RESEND_API_KEY is missing in Cloudflare environment.");
        return { success: false, message: 'Server configuration error: Missing API Key.' };
    } else {
        console.log(`✅ API Key found (Length: ${apiKey.length})`);
    }

    const resend = new Resend(apiKey);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        console.warn("⚠️ Validation failed: Missing fields.");
        return { success: false, message: 'Missing required fields.' };
    }

    try {
        console.log(`📨 Attempting to send email from: ${email}`);

        const data = await resend.emails.send({
            from: 'Monk Inquiry <onboarding@resend.dev>',
            to: ['hello@monk.haus'],
            replyTo: email,
            subject: `Project Inquiry: ${name}`,
            html: `
                <div>
                    <h1>Inquiry from ${name}</h1>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Budget:</strong> ${budget}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
            `,
        });

        if (data.error) {
            console.error("❌ Resend API Error:", data.error);
            return { success: false, message: 'Failed to send inquiry (Provider Error).' };
        }

        console.log("✅ Email sent successfully ID:", data.data?.id);
        return { success: true, message: 'Inquiry sent.' };

    } catch (error) {
        console.error('❌ UNHANDLED EXCEPTION in sendEmail:', error);
        return { success: false, message: 'Internal system error.' };
    }
}