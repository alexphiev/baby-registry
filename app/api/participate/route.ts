import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { productTitle, firstName, lastName, amount, message } = body as Record<string, string>;

  if (!firstName?.trim() || !lastName?.trim() || !amount || !productTitle?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Liste de naissance <onboarding@resend.dev>",
    to: "alexandre.phiev@gmail.com",
    subject: `🎁 ${firstName} ${lastName} — ${amount} € — ${productTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color: #3a3530;">
        <h2 style="color: #b2c5b0; margin-bottom: 1.5rem;">Nouvelle participation reçue</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 140px;">Cadeau</td>
            <td style="padding: 8px 0;">${productTitle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Prénom</td>
            <td style="padding: 8px 0;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Nom</td>
            <td style="padding: 8px 0;">${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Montant</td>
            <td style="padding: 8px 0;">${amount} €</td>
          </tr>
          ${message?.trim() ? `
          <tr>
            <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${message}</td>
          </tr>` : ""}
        </table>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
