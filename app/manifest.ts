import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APST AI & Software Services",
    short_name: "APST Services",
    description:
      "AI app development, generative AI, chatbot, RAG, automation, SaaS, and backend services by Aditya Pratap Singh Tomar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1120",
    theme_color: "#0b1120",
    icons: [
      {
        src: "/favicon.jpg",
        sizes: "768x768",
        type: "image/jpeg",
      },
      {
        src: "/favicon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  }
}
