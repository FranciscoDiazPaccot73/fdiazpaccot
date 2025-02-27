import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().optional(),
    tags: z.string().optional(),
    readingTime: z.string().optional(),
    mediumBlog: z.string().optional(),
    devBlog: z.string().optional(),
    languages: z.array(z.string()).optional(),
    blogLanguage: z.enum(["es", "en"]).default("en"),
    published: z.boolean().optional(),
  }),
});

export const collections = { blog };
