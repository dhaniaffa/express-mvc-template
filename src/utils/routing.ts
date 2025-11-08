import { Router, RequestHandler } from 'express';

export interface ResourceController {
  index: RequestHandler;
  show?: RequestHandler;
  create?: RequestHandler;
  update?: RequestHandler;
  destroy?: RequestHandler;
}

/**
 * Creates an Express router for a given resource path and controller.
 *
 * The generated router will have the following routes:
 * - GET / (index)
 * - GET /:id (show)
 * - POST / (create)
 * - PUT /:id (update)
 * - DELETE /:id (destroy)
 *
 * @param {string} path - The path of the resource
 * @param {ResourceController} controller - The controller for the resource
 * @returns {{ path: string, router: Router }} - An object containing the path and the generated router
 */
export function resource(path: string, controller: ResourceController) {
  const router = Router();
  router.get('/', controller.index);
  if (controller.show) router.get('/:id', controller.show);
  if (controller.create) router.post('/', controller.create);
  if (controller.update) router.put('/:id', controller.update);
  if (controller.destroy) router.delete('/:id', controller.destroy);
  return { path, router };
}

// Tambahkan helper routing lain di sini jika diperlukan
