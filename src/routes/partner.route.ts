import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const partnerGetController = container.get(
    'Infrastructure.Web.Partner.PartnerGetController'
  );
  router.get(
    '/partner/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => partnerGetController.run(req, res)
  );

  const partnerPostController = container.get(
    'Infrastructure.Web.Partner.PartnerPostController'
  );
  router.post(
    '/partner',
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('email').isEmail(),
    body('given_name')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('family_name')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('picture')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('locale').isString().isLength({ min: 1, max: 255 }),
    body('subscription_plan').isString().isLength({ min: 1, max: 255 }),
    body('subdomain')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => partnerPostController.run(req, res)
  );

  const partnerGetByEmailController = container.get(
    'Infrastructure.Web.Partner.PartnerGetByEmailController'
  );
  router.get(
    '/partner/email/:email',
    param('email').isEmail(),
    validateMiddleware,
    (req: Request, res: Response) => partnerGetByEmailController.run(req, res)
  );

  const partnerGetBySubdomainController = container.get(
    'Infrastructure.Web.Partner.PartnerGetBySubdomainController'
  );
  router.get(
    '/partner/subdomain/:subdomain',
    param('subdomain').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) =>
      partnerGetBySubdomainController.run(req, res)
  );
};
