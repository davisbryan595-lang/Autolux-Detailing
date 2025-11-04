import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-10.28.acacia",
})

async function sendEmail(to: string, subject: string, htmlContent: string) {
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    console.warn("Gmail credentials not configured. Email notification skipped.")
    return false
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    await transporter.sendMail({
      from: gmailUser,
      to: to,
      subject: subject,
      html: htmlContent,
    })

    console.log("Email sent successfully to", to)
    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sessionId,
      customerName,
      customerPhone,
      customerEmail,
      serviceName,
    } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const ownerEmail = process.env.OWNER_EMAIL || "Cjm96887@gmail.com"

    const customerInfo = {
      name: customerName || session.metadata?.customerName || "N/A",
      phone: customerPhone || session.metadata?.customerPhone || "N/A",
      email: customerEmail || session.metadata?.customerEmail || "N/A",
      service:
        serviceName || session.metadata?.service || "Car Detailing",
      amount: ((session.amount_total || 0) / 100).toFixed(2),
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #d4af37;">New Detailing Booking Received!</h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Customer Details</h3>
          <p><strong>Name:</strong> ${customerInfo.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${customerInfo.phone}" style="color: #d4af37; text-decoration: none;">${customerInfo.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${customerInfo.email}" style="color: #d4af37; text-decoration: none;">${customerInfo.email}</a></p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d4af37; margin-top: 0;">Service Details</h3>
          <p><strong>Service:</strong> ${customerInfo.service}</p>
          <p><strong>Amount Paid:</strong> $${customerInfo.amount}</p>
          <p><strong>Session ID:</strong> <code style="background: #eee; padding: 2px 6px;">${sessionId}</code></p>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37;">
          <strong>Action Required:</strong> Please contact the customer at the phone number above to confirm the appointment date and time.
        </div>

        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated notification from your AutoLux Detailing booking system.
        </p>
      </div>
    `

    const emailSent = await sendEmail(
      ownerEmail,
      `New Booking: ${customerInfo.service} - ${customerInfo.name}`,
      emailContent
    )

    return NextResponse.json({
      success: emailSent,
      message: emailSent
        ? "Notification sent successfully"
        : "Email system not configured",
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}
