"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/3045163/3045163-sd_640_360_25fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="mb-8 animate-fade-in flex justify-center">
          <Image
            src="/logo.png"
            alt="AutoLux Detailing Logo"
            width={200}
            height={200}
            className="h-32 w-auto drop-shadow-2xl"
          />
        </div>

        <div className="mb-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-glow">Luxury Detailing</h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-2">You Can Trust</p>
        </div>

        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Professional car detailing services serving Caldwell, Boise & surrounding areas
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:shadow-lg glow-gold-hover transition-all duration-300 transform hover:scale-105">
            Get a Quote
          </button>
          <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold text-lg hover:bg-primary/10 transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-primary" />
        </div>
      </div>
    </section>
  )
}
