import { Request, Response } from 'express';

import * as userService from '../services/user.service';
import { CreateUserDto, CreateUserSchema, UserDto } from '../dtos/user.dto';
import { asyncWrapper } from '../middleware/asyncWrapper';
import { HttpError } from '../utils/httpError';
import { ResourceResponse } from '../types/response';

/**
 * Create a new user
 *
 * @route POST /api/users
 */
export const createUser = asyncWrapper(async (req: Request, res: Response): Promise<Response> => {
  const createUserDto: CreateUserDto = await CreateUserSchema.parseAsync(req.body);
  // Simulate user creation (dummy)
  const user = userService.createUser(createUserDto);
  const response: ResourceResponse<UserDto> = {
    status: 201,
    data: user,
    message: 'User created successfully',
  };
  return res.status(201).json(response);
});

/**
 * Get all users
 *
 * @route GET /api/users
 */
export const getUsers = asyncWrapper((req: Request, res: Response) => {
  const users: UserDto[] = userService.getAllUsers();
  const response: ResourceResponse<UserDto[]> = {
    status: 200,
    data: users,
    message: 'Users fetched successfully',
  };
  res.json(response);
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
