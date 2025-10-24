"use client"

import type React from "react"

import { Phone, MapPin, Mail } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-lg text-foreground/70">Ready to transform your vehicle? Contact us today</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Phone size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
                <a href="tel:208-318-4160" className="text-foreground/70 hover:text-primary transition-colors">
                  208-318-4160
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-4 bg-primary/10 rounded-lg">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Service Area</h3>
                <p className="text-foreground/70">Caldwell, Boise & Surrounding Areas</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                <p className="text-foreground/70">info@autoluxdetailing.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="(208) 123-4567"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell us about your vehicle..."
                rows={4}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:shadow-lg glow-gold-hover transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
