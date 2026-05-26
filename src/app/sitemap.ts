import { MetadataRoute }
from "next"

export default function sitemap():
MetadataRoute.Sitemap {

  return [

    {
      url:
        "http://localhost:3000",

      lastModified:
        new Date(),
    },

    {
      url:
        "http://localhost:3000/hotel",

      lastModified:
        new Date(),
    },

    {
      url:
        "http://localhost:3000/restaurant",

      lastModified:
        new Date(),
    },

    {
      url:
        "http://localhost:3000/evenements",

      lastModified:
        new Date(),
    },

    {
      url:
        "http://localhost:3000/contact",

      lastModified:
        new Date(),
    },
  ]
}