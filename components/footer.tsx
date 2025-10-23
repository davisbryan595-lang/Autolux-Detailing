import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image src="/logo.png" alt="AutoLux Detailing" width={80} height={80} className="h-16 w-auto" />
            </div>
            <p className="text-foreground/70">Luxury detailing you can trust</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Exterior Detailing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Interior Detailing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Bundle Package
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <p className="text-foreground/70 mb-2">208-318-4160</p>
            <p className="text-foreground/70">Caldwell, Boise & Area</p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-foreground/60">
          <p>&copy; 2025 AutoLux Detailing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
