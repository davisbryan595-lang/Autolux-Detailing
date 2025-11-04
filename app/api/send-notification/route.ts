import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-10.28.acacia",
})

async function sendEmailViaFormsubmit(
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  serviceName: string,
  amount: string,
  sessionId: string
) {
  const ownerEmail = "Cjm96887@gmail.com"

  try {
    const response = await fetch("https://formsubmit.co/ajax/" + ownerEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        subject: `New Booking: ${serviceName} - ${customerName}`,
        message: `
New Detailing Booking Received!

CUSTOMER DETAILS:
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

SERVICE DETAILS:
Service: ${serviceName}
Amount Paid: $${amount}
Session ID: ${sessionId}

ACTION REQUIRED:
Please contact the customer at the phone number above to confirm the appointment date and time.

This is an automated notification from your AutoLux Detailing booking system.
        `,
        _captcha: "false",
      }),
    })

    const data = await response.json()

    if (data.success) {
      console.log("Email sent successfully via Formsubmit")
      return true
    } else {
      console.error("Formsubmit error:", data)
      return false
    }
  } catch (error) {
    console.error("Failed to send email via Formsubmit:", error)
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

    const customerInfo = {
      name: customerName || session.metadata?.customerName || "N/A",
      phone: customerPhone || session.metadata?.customerPhone || "N/A",
      email: customerEmail || session.metadata?.customerEmail || "N/A",
      service:
        serviceName || session.metadata?.service || "Car Detailing",
      amount: ((session.amount_total || 0) / 100).toFixed(2),
    }

    const emailSent = await sendEmailViaFormsubmit(
      customerInfo.name,
      customerInfo.phone,
      customerInfo.email,
      customerInfo.service,
      customerInfo.amount,
      sessionId
    )

    return NextResponse.json({
      success: emailSent,
      message: emailSent
        ? "Notification sent successfully"
        : "Failed to send notification",
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}
