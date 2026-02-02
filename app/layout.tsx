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
  title: "Aditya Pratap Singh Tomar | ML Engineer & AI Researcher",
  description:
    "AI-native portfolio of Aditya Pratap Singh Tomar: ML engineer and data scientist building production-grade AI systems, RAG pipelines, and research-driven deployments.",
  keywords: [
    "ML Engineer",
    "Data Scientist",
    "AI Researcher",
    "RAG",
    "LLM",
    "MLOps",
    "PyTorch",
    "Deployment",
  ],
  authors: [{ name: "Aditya Pratap Singh Tomar" }],
  openGraph: {
    title: "Aditya Pratap Singh Tomar | ML Engineer & AI Researcher",
    description: "Production AI systems, RAG pipelines, and reliable ML deployments.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
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
