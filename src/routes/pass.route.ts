import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const passPostController = container.get(
    'Infrastructure.Web.Pass.PassPostController'
  );
  router.post(
    '/pass',
    body('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => passPostController.run(req, res)
  );

  const passPutController = container.get(
    'Infrastructure.Web.Pass.PassPutController'
  );
  router.put(
    '/pass',
    body('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => passPutController.run(req, res)
  );

  const passDeleteController = container.get(
    'Infrastructure.Web.Pass.PassDeleteController'
  );
  router.delete(
    '/pass/:pass_id',
    param('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => passDeleteController.run(req, res)
  );

  const passGetController = container.get(
    'Infrastructure.Web.Pass.PassGetController'
  );
  router.get(
    '/pass/:pass_id',
    param('pass_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => passGetController.run(req, res)
  );

  const passGetByPartnerController = container.get(
    'Infrastructure.Web.Pass.PassGetByPartnerController'
  );
  router.get(
    '/pass/partner/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => passGetByPartnerController.run(req, res)
  );
};
