import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-10-28.acacia",
})

// Function to send SMS via Twilio
async function sendSMS(phoneNumber: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.warn(
      "Twilio credentials not configured. SMS notification skipped."
    )
    return false
  }

  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: phoneNumber,
        From: twilioPhoneNumber,
        Body: message,
      }).toString(),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Twilio SMS error:", error)
      return false
    }

    console.log("SMS sent successfully to", phoneNumber)
    return true
  } catch (error) {
    console.error("Failed to send SMS:", error)
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

    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const ownerPhoneNumber = process.env.OWNER_PHONE_NUMBER

    if (!ownerPhoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Owner phone number not configured. Please set OWNER_PHONE_NUMBER environment variable.",
        },
        { status: 200 }
      )
    }

    // Create notification message for owner
    const notificationMessage = `New Detailing Booking! 
Service: ${serviceName || session.metadata?.service || "Car Detailing"}
Customer: ${customerName || session.metadata?.customerName || "N/A"}
Phone: ${customerPhone || session.metadata?.customerPhone || "N/A"}
Email: ${customerEmail || session.metadata?.customerEmail || "N/A"}
Amount: $${(session.amount_total || 0) / 100}

Call them to confirm the appointment.`

    // Send SMS to owner
    const smsSent = await sendSMS(ownerPhoneNumber, notificationMessage)

    return NextResponse.json({
      success: smsSent,
      message: smsSent
        ? "Notification sent successfully"
        : "Notification system not configured",
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}
