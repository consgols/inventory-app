import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    email: z.string().email('Invalid email address').trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, { message: 'email is required.' }).trim(),
  password: z.string().min(1, { message: 'password is required.' }).trim(),
});

export const BlogFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'title is required.' })
    .max(100, { message: "Title can't be more than 100 characters" })
    .trim(),
  content: z.string().min(1, { message: 'content is required.' }).trim(),
});

export const ItemFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required.' }).trim(),
  price: z.string().min(1, { message: 'price is required' }),
  description: z.string().min(1, { message: 'description is required.' }).trim(),
  category: z.string().min(1, { message: 'category is required.' }).trim(),
});
