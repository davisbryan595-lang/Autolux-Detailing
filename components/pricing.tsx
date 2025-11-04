"use client"

import { Check } from "lucide-react"

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const pricingPlans = [
  {
    name: "Exterior",
    price: "$70-90",
    description: "Perfect for maintaining your car's exterior",
    features: ["Wash & dry", "Wax application", "Tire shine", "Door jambs", "Window cleaning"],
    highlighted: false,
  },
  {
    name: "Interior",
    price: "$90-110",
    description: "Deep clean for a fresh interior",
    features: ["Vacuum & shampoo", "Leather conditioning", "Dashboard cleaning", "Odor elimination", "Stain removal"],
    highlighted: true,
  },
  {
    name: "Bundle",
    price: "$140-160",
    description: "Complete transformation inside & out",
    features: [
      "Full exterior detail",
      "Full interior detail",
      "Tire shine & Door jambs",
      "Premium protection",
      "Satisfaction guaranteed",
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pricing</h2>
          <p className="text-lg text-foreground/70">Transparent pricing for premium services</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${
                plan.highlighted
                  ? "bg-primary/10 border-2 border-primary glow-gold"
                  : "bg-background border border-border hover:border-primary"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>

              <p className="text-foreground/70 mb-6">{plan.description}</p>

              <div className="mb-8">
                <p className="text-4xl font-bold text-primary">{plan.price}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={20} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("contact")}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-lg glow-gold-hover"
                    : "bg-background border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                Get a Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
