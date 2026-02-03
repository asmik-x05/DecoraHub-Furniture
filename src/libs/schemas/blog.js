import z from "zod";

const blogSchema = z.object({
  title: z.string().max(32),
  shortDescription: z.string().max(93),
});

export { blogSchema };
