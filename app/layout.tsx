import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { InsightsProvider } from "@/components/insights-context"
import portfolio from "@/data/portfolio.json"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const siteUrl = "https://apst.me"
const profileName = portfolio.profile.name
const profileHeadline = portfolio.profile.headline
const profileSummary = portfolio.profile.summary
const profileImagePrimary = `${siteUrl}/aditya-pratap-singh-tomar-portrait.jpeg`
const profileImageSecondary = `${siteUrl}/aditya-pratap-singh-tomar.webp`
const profileSocials = Object.values(portfolio.profile.socials)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aditya Pratap Singh Tomar (APST) | Data Scientist & Software Engineer",
    template: "%s | Aditya Pratap Singh Tomar",
  },
  description: profileSummary,
  applicationName: "APST Portfolio",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "omdc3wbmImxNA17_x4PEczQXLOKa8SdT6D3weldAzVw",
  },
  keywords: [
    "Aditya Pratap Singh Tomar",
    "APST",
    "Aditya",
    "Aditya Pratap",
    "Aditya Pratap Singh",
    "Software Engineer",
    "Data Scientist",
    "ML Engineer",
    "MLOps",
    "Time Series",
    "Computer Vision",
    "PyTorch",
    "Deployment",
  ],
  authors: [{ name: profileName, url: siteUrl }],
  creator: profileName,
  publisher: profileName,
  openGraph: {
    title: `${profileName} (APST) | Data Scientist & Software Engineer`,
    description: profileHeadline,
    url: siteUrl,
    siteName: "APST Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: profileImagePrimary,
        width: 1200,
        height: 630,
        alt: `${profileName} portrait`,
      },
      {
        url: profileImageSecondary,
        width: 960,
        height: 1200,
        alt: `${profileName} working portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileName} (APST) | Data Scientist & Software Engineer`,
    description: profileHeadline,
    images: [profileImagePrimary],
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
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileName,
    alternateName: ["APST", "Aditya", "Aditya Pratap"],
    url: siteUrl,
    image: [profileImagePrimary, profileImageSecondary],
    description: profileSummary,
    jobTitle: portfolio.profile.title,
    email: portfolio.profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gwalior",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    sameAs: profileSocials,
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "APST Portfolio",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: profileName,
    },
    about: {
      "@type": "Person",
      name: profileName,
    },
  }

  const imageGalleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ImageObject",
        contentUrl: profileImagePrimary,
        name: `${profileName} portrait`,
        description: `${profileName} profile image used in portfolio hero section.`,
      },
      {
        "@type": "ImageObject",
        contentUrl: profileImageSecondary,
        name: `${profileName} portrait while working on machine learning projects`,
        description: `${profileName} profile image used in about section.`,
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryStructuredData) }}
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
