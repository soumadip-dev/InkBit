import z from 'zod';

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  content: z.string().refine(
    content => {
      const textContent = content.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    },
    { message: 'Content must be at least 10 characters long' }
  ),
  image: z.instanceof(File),
});
