import type { MetadataRoute } from "next"

const siteUrl = "https://apst.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/aditya-pratap-singh-tomar-portrait.jpeg`,
        `${siteUrl}/aditya-pratap-singh-tomar.webp`,
        `${siteUrl}/ai-chatbot-dashboard.png`,
        `${siteUrl}/ai-workflow-automation.png`,
        `${siteUrl}/rag-knowledge-dashboard.png`,
      ],
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${siteUrl}/aditya-pratap-singh-tomar.webp`],
    },
    {
      url: `${siteUrl}/founder`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [
        `${siteUrl}/aditya-pratap-singh-tomar-portrait.jpeg`,
        `${siteUrl}/aditya-pratap-singh-tomar.webp`,
      ],
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/skills`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
