import { users } from '../models/user.model';
import { UserDto } from '../dtos/user.dto';
import Logger from '../utils/logger';
import { HttpError } from '../utils/httpError';

export const getAllUsers = (): UserDto[] => {
  try {
    Logger.info('Fetching all users');
    const userDtos = users.map(({ id, name, email }) => ({ id, name, email }));
    Logger.debug(`Found ${userDtos.length} users`);
    return userDtos;
  } catch (error) {
    Logger.error('Error fetching all users', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw new HttpError('Failed to fetch users', 500);
  }
};

export const getUserById = (id: number): UserDto | undefined => {
  try {
    Logger.info(`Fetching user with id: ${id}`);
    const user = users.find((u) => u.id === id);

    if (!user) {
      Logger.warn(`User with id ${id} not found`);
      return undefined;
    }

    Logger.debug(`Found user: ${JSON.stringify({ id: user.id, name: user.name })}`);
    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    Logger.error(`Error fetching user with id ${id}`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw new HttpError('Failed to fetch user', 500);
  }
};

export const createUser = (user: Omit<UserDto, 'id'>) => {
  users.push({ id: users.length + 1, ...user });
  return { id: users.length, ...user };
};
