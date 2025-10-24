import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Loader from "@/components/Loader";
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoLux Detailing - Luxury Car Detailing Services",
  description:
    "Premium car detailing services in Caldwell, Boise & surrounding areas. Exterior, Interior, and Bundle packages available.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
    
    import Loader from "@/components/Loader";

export default function Loading() {
  return <Loader />;
}

  )
}
