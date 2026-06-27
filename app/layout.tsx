import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { InsightsProvider } from "@/components/insights-context"
import portfolio from "@/data/portfolio.json"
import { faqs, productVisuals, servicePackages } from "@/lib/service-data"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const siteUrl = "https://apst.me"
const profileName = portfolio.profile.name
const profileSummary = portfolio.profile.summary
const profileImagePrimary = `${siteUrl}/aditya-pratap-singh-tomar-portrait.jpeg`
const profileImageSecondary = `${siteUrl}/aditya-pratap-singh-tomar.webp`
const profileSocials = Object.values(portfolio.profile.socials)
const serviceImages = productVisuals.map((item) => `${siteUrl}${item.image}`)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "APST | AI App Development & Software Services",
    template: "%s | Aditya Pratap Singh Tomar",
  },
  description:
    "AI app development, generative AI development, AI chatbot development, RAG knowledge systems, workflow automation, SaaS web apps, and FastAPI backend services.",
  applicationName: "APST AI & Software Services",
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    shortcut: ["/favicon.jpg"],
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
    "AI App Development",
    "Software Development Services",
    "Generative AI Development",
    "AI Chatbot Development",
    "RAG Knowledge Base",
    "Workflow Automation",
    "FastAPI Developer",
    "SaaS Development",
    "AI Automation Services",
    "MLOps Deployment",
  ],
  authors: [{ name: profileName, url: siteUrl }],
  creator: profileName,
  publisher: profileName,
  openGraph: {
    title: "APST | AI App Development & Software Services",
    description:
      "Custom AI applications, chatbots, RAG systems, automation, SaaS web apps, and FastAPI backend development.",
    url: siteUrl,
    siteName: "APST AI & Software Services",
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
      {
        url: `${siteUrl}/ai-chatbot-dashboard.png`,
        width: 1536,
        height: 864,
        alt: "AI chatbot dashboard service preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APST | AI App Development & Software Services",
    description:
      "AI app development, generative AI, RAG, AI chatbot, workflow automation, SaaS, and FastAPI backend services.",
    images: [`${siteUrl}/ai-chatbot-dashboard.png`],
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
    jobTitle: "AI App Developer and Software Engineer",
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
    name: "APST AI & Software Services",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: profileName,
    },
    about: {
      "@type": "Service",
      name: "AI App Development and Software Services",
    },
    potentialAction: {
      "@type": "ContactAction",
      target: `${siteUrl}/#enquiry`,
      name: "Submit a service enquiry",
    },
  }

  const professionalServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "APST AI & Software Services",
    url: siteUrl,
    image: [`${siteUrl}/ai-chatbot-dashboard.png`, ...serviceImages, profileImagePrimary],
    description:
      "AI app development, generative AI development, chatbot development, RAG knowledge systems, workflow automation, SaaS web app development, FastAPI backend development, and MLOps deployment services.",
    founder: {
      "@type": "Person",
      name: profileName,
    },
    email: portfolio.profile.email,
    telephone: portfolio.profile.phone,
    areaServed: ["India", "United States", "United Kingdom", "Global"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gwalior",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    sameAs: profileSocials,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI and Software Development Services",
      itemListElement: servicePackages.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          keywords: service.keywords,
          provider: {
            "@type": "ProfessionalService",
            name: "APST AI & Software Services",
          },
        },
      })),
    },
  }

  const serviceItemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI and software services",
    itemListElement: servicePackages.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.description,
      url: `${siteUrl}/#services`,
    })),
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
      ...productVisuals.map((item) => ({
        "@type": "ImageObject",
        contentUrl: `${siteUrl}${item.image}`,
        name: item.title,
        description: item.description,
      })),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceItemListStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
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
