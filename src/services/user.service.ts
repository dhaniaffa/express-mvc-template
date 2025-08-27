import { users } from '../models/user.model';
import { UserDto } from '../dtos/user.dto';

export const getAllUsers = (): UserDto[] => {
  // Map User model to UserDto
  return users.map(({ id, name }) => ({ id, name }));
};

export const getUserById = (id: number): UserDto | undefined => {
  const user = users.find((u) => u.id === id);
  return user ? { id: user.id, name: user.name } : undefined;
};
