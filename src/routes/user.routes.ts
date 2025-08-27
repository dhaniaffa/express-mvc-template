import * as userController from '../controllers/user.controller';

import { resource } from './resource';

const { router } = resource('/', {
  index: userController.getUsers,
  show: userController.getUser,
  create: userController.createUser,
});

export default router;
