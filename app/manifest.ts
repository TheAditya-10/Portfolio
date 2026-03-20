import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APST Portfolio - Aditya Pratap Singh Tomar",
    short_name: "APST Portfolio",
    description:
      "Official portfolio of Aditya Pratap Singh Tomar (APST), Data Scientist and Software Engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1120",
    theme_color: "#0b1120",
    icons: [
      {
        src: "/favicon.png",
        sizes: "768x768",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
