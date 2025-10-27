"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function BookingSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-foreground">Processing your booking...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Booking Confirmed!
        </h1>

        <p className="text-lg text-foreground/70 mb-4">
          Thank you for booking our detailing service. We've received your payment and will contact you soon to confirm the appointment date and time.
        </p>

        <p className="text-md text-foreground/60 mb-8">
          {sessionId && (
            <>
              Confirmation ID: <span className="font-mono text-primary">{sessionId}</span>
            </>
          )}
        </p>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">What's Next?</h2>
          <ul className="text-left space-y-3 text-foreground/80">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <span>A confirmation email has been sent to your email address</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <span>We'll call you at the phone number provided to schedule your appointment</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <span>Our team will arrive at the scheduled time to provide your premium detailing service</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/#contact"
            className="inline-block py-3 px-8 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg glow-gold-hover transition-all duration-300"
          >
            Back to Home
          </Link>
          <p className="text-foreground/60 text-sm">
            Questions? Call us at{" "}
            <a
              href="tel:208-318-4160"
              className="text-primary hover:underline font-semibold"
            >
              208-318-4160
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
