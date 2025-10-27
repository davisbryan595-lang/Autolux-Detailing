"use client"

import type React from "react"
import { useState } from "react"
import { CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const services = [
  { id: "exterior", name: "Exterior Detailing", price: 60 },
  { id: "interior", name: "Interior Detailing", price: 75 },
  { id: "bundle", name: "Bundle Package", price: 110 },
]

export default function BookingForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "exterior",
    vehicleInfo: "",
  })

  const selectedService = services.find((s) => s.id === formData.service)
  const price = selectedService?.price || 0

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService?.name,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          vehicleInfo: formData.vehicleInfo,
          price: price,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process booking. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-foreground font-semibold mb-2">
          Select Service *
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
          required
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-foreground font-semibold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-foreground font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="(208) 123-4567"
            required
          />
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-2">
            Vehicle Information (Optional)
          </label>
          <input
            type="text"
            name="vehicleInfo"
            value={formData.vehicleInfo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="2020 Honda Civic"
          />
        </div>
      </div>

      <div className="bg-primary/10 border border-primary rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-foreground font-semibold">Service Total:</span>
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-foreground/70">
          You will be redirected to Stripe's secure payment page to complete your booking.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:shadow-lg glow-gold-hover transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
      >
        <CreditCard size={20} />
        {loading ? "Processing..." : `Pay $${price.toFixed(2)} & Book Service`}
      </button>

      <p className="text-xs text-foreground/60 text-center">
        By clicking the button above, you agree to our payment terms. You'll be redirected to
        Stripe to securely complete your payment.
      </p>
    </form>
  )
}
