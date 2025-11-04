import { Request, Response } from 'express';
import { z } from 'zod';

import * as userService from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { HttpError } from '../utils/httpError';
import { formatZodError } from '../utils/zodErrorFormatter';

// Zod schema for user creation
const userCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
});

/**
 * Create a new user
 *
 * @route POST /api/users
 */
export const createUser = asyncWrapper((req: Request, res: Response) => {
  const result = userCreateSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ status: 400, error: formatZodError(result.error), message: 'Validation error' });
    return;
  }
  // Simulate user creation (dummy)
  const newUser: UserDto = {
    id: Math.floor(Math.random() * 10000),
    name: result.data.name,
  };
  res.status(201).json(newUser);
});

/**
 * Get all users
 *
 * @route GET /api/users
 */
export const getUsers = asyncWrapper((req: Request, res: Response) => {
  const users: UserDto[] = userService.getAllUsers();
  res.json(users);
});

/**
 * Get a user by id
 *
 * @route GET /api/users/:id
 */
export const getUser = asyncWrapper(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user: UserDto | undefined = await Promise.resolve(userService.getUserById(id));
  if (!user) {
    throw new HttpError('User not found', 404);
  }
  res.json(user);
});
