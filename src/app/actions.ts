'use server'

interface ActionState {
    success: boolean;
    message: string;
}

export async function sendEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const apiKey = process.env.RESEND_API_KEY;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    if (!apiKey) {
        console.error("Missing RESEND_API_KEY");
        return { success: false, message: 'Server configuration error.' };
    }

    if (!name || !email || !message) {
        return { success: false, message: 'Missing required fields.' };
    }

    try {
        // Direct API call to bypass SDK dependencies (Fixes 'async_hooks' error)
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Monk Inquiry <onboarding@resend.dev>',
                to: ['hello@monk.haus'],
                reply_to: email,
                subject: `Project Inquiry: ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
                        <h2 style="font-size: 18px; font-weight: normal; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                            New Inquiry Received
                        </h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; width: 140px;">Client:</td>
                                <td style="padding: 8px 0; font-weight: bold;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Return Email:</td>
                                <td style="padding: 8px 0;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666;">Est. Budget:</td>
                                <td style="padding: 8px 0;">${budget}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                            <p style="margin-bottom: 10px; color: #666;">Context / Brief:</p>
                            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
                        </div>
                        <p style="margin-top: 40px; font-size: 12px; color: #999;">
                            Filed on: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Bucharest' })} (EET)
                        </p>
                    </div>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API Error:', errorData);
            return { success: false, message: 'Failed to send inquiry.' };
        }

        return { success: true, message: 'Inquiry sent.' };

    } catch (error) {
        console.error('Fetch Error:', error);
        return { success: false, message: 'Internal system error.' };
    }
}