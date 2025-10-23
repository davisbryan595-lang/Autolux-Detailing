"use client"

import { Sparkles, Droplet, Package } from "lucide-react"

const services = [
  {
    icon: Sparkles,
    title: "Exterior Detailing",
    description: "Professional exterior cleaning and protection for a showroom shine",
    price: "$50-70",
    features: ["Paint correction", "Ceramic coating", "Wheel cleaning", "Trim restoration"],
  },
  {
    icon: Droplet,
    title: "Interior Detailing",
    description: "Deep cleaning and conditioning of your vehicle's interior",
    price: "$70-80",
    features: ["Carpet shampooing", "Leather conditioning", "Odor removal", "Stain treatment"],
  },
  {
    icon: Package,
    title: "Bundle Package",
    description: "Complete interior and exterior detailing for ultimate results",
    price: "$100-120",
    features: ["Full exterior detail", "Full interior detail", "Premium protection", "Best value"],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-foreground/70">Premium detailing packages tailored to your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group bg-background border border-border rounded-xl p-8 hover:border-primary transition-all duration-300 glow-gold-hover cursor-pointer transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon size={32} className="text-primary" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>

                <p className="text-foreground/70 mb-6">{service.description}</p>

                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-3xl font-bold text-primary">{service.price}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg glow-gold-hover transition-all duration-300">
                  Get a Quote
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
