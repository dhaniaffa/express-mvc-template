import z from 'zod';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export const BaseUserSchema = z.object({
  id: z.number(),
  name: z.string().min(5),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
});

export const CreateUserSchema = BaseUserSchema.omit({ id: true });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
