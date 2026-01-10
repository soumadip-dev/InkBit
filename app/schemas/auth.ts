import z from 'zod';

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password must be at most 30 characters long'),
});

const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password must be at most 30 characters long'),
});

export { signInSchema, signUpSchema };
