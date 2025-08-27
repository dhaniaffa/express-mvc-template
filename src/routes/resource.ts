import { Router, RequestHandler } from 'express';

export interface ResourceController {
  index: RequestHandler;
  show?: RequestHandler;
  create?: RequestHandler;
  update?: RequestHandler;
  destroy?: RequestHandler;
}

export function resource(path: string, controller: ResourceController) {
  const router = Router();
  router.get('/', controller.index);
  if (controller.show) router.get('/:id', controller.show);
  if (controller.create) router.post('/', controller.create);
  if (controller.update) router.put('/:id', controller.update);
  if (controller.destroy) router.delete('/:id', controller.destroy);
  return { path, router };
}
