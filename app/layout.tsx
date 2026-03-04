import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { InsightsProvider } from "@/components/insights-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Aditya Pratap Singh Tomar | Data Scientist & Software Engineer",
  description:
    "Portfolio of Aditya Pratap Singh Tomar: data scientist and software engineer building production-grade ML systems with measurable outcomes.",
  keywords: [
    "Software Engineer",
    "Data Scientist",
    "ML Engineer",
    "MLOps",
    "Time Series",
    "Computer Vision",
    "PyTorch",
    "Deployment",
  ],
  authors: [{ name: "Aditya Pratap Singh Tomar" }],
  openGraph: {
    title: "Aditya Pratap Singh Tomar | Data Scientist & Software Engineer",
    description: "Production ML systems, data-driven software engineering, and reliable deployment workflows.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="omdc3wbmImxNA17_x4PEczQXLOKa8SdT6D3weldAzVw"
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <InsightsProvider>{children}</InsightsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
