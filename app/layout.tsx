import type React from "react"
import type { Metadata } from "next"
import './globals.css'
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Shrinav - Digital Solutions & Code Craftsmanship",
  description:
    "Transform your ideas into powerful digital experiences. Professional web development, mobile apps, and digital solutions with clean code and modern technology.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-oswald">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}