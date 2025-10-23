"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function SpecialOfferPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => setIsOpen(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-card border-2 border-primary rounded-2xl p-8 max-w-md w-full relative glow-gold animate-fade-in">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
            <span className="text-4xl">✨</span>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-2">Special Offer!</h2>

          <p className="text-foreground/80 mb-6">
            Get <span className="text-primary font-bold">20% OFF</span> your first detailing service
          </p>

          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground/70 mb-2">Use code:</p>
            <p className="text-2xl font-bold text-primary font-mono">AUTOLUX20</p>
          </div>

          <p className="text-sm text-foreground/60 mb-6">Limited time offer - Valid for new customers only</p>

          <div className="space-y-3">
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:shadow-lg glow-gold-hover transition-all duration-300">
              Claim Offer
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
