import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Aditya Pratap Singh Tomar | Data Scientist & ML Engineer",
  description:
    "Data Scientist and MLOps Engineer with strong experience in building end-to-end, production-ready ML systems, spanning data pipelines, deep learning models (Transformers, LLMs), MLOps workflows, and scalable deployment.",
  keywords: [
    "Data Scientist",
    "ML Engineer",
    "Machine Learning",
    "Deep Learning",
    "MLOps",
    "Python",
    "PyTorch",
    "TensorFlow",
  ],
  authors: [{ name: "Aditya Pratap Singh Tomar" }],
  openGraph: {
    title: "Aditya Pratap Singh Tomar | Data Scientist & ML Engineer",
    description: "Building production-ready ML systems with deep learning, Transformers, and scalable deployment.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
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
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
