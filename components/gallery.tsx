"use client"

import { useState } from "react"

const galleryImages = [
  {
    id: 1,
    title: "Exterior Polish",
    image: "/luxury-car-exterior-detailing-shine.jpg",
  },
  {
    id: 2,
    title: "Interior Clean",
    image: "/car-leather-detailing.png",
  },
  {
    id: 3,
    title: "Wheel Detail",
    image: "/car-wheel-detailing-chrome.jpg",
  },
  {
    id: 4,
    title: "Paint Protection",
    image: "/car-paint-ceramic-coating.jpg",
  },
  {
    id: 5,
    title: "Full Detail",
    image: "/luxury-car-full-detailing.jpg",
  },
  {
    id: 6,
    title: "Premium Finish",
    image: "/car-premium-detailing-finish.jpg",
  },
]

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Work</h2>
          <p className="text-lg text-foreground/70">See the transformation we deliver</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl cursor-pointer h-80"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>

              {/* Content */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredId === item.id ? "opacity-100" : "opacity-0"}`}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
                    View Details
                  </button>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
