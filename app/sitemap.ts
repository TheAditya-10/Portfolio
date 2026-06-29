import type { MetadataRoute } from "next"
import { getProjectsByVariant } from "@/lib/content"
import { servicePackages } from "@/lib/service-data"

const siteUrl = "https://apst.me"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const serviceUrls = servicePackages.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))
  const caseStudyUrls = getProjectsByVariant("all").map((project) => ({
    url: `${siteUrl}/case-studies/${project.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: project.flagship ? 0.85 : 0.7,
  }))

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
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
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
    ...serviceUrls,
    ...caseStudyUrls,
  ]
}
