import { ActivityMysqlRepository } from './../../activityMysqlRepository';
import { EventMysqlRepository } from './../../eventMysqlRepository';
import { BookingMysqlRepository } from './../../bookingMysqlRepository';
import { BookingSessionRedisRepository } from './../../bookingRedisRepository';
import { FinishBookingSession } from './../../../Application/BookingSession/finishBookingSession';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class BookingFinishPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const finishBookingSession: FinishBookingSession = new FinishBookingSession(
      new BookingSessionRedisRepository(),
      new BookingMysqlRepository(),
      new ActivityMysqlRepository(),
      new EventMysqlRepository()
    );
    finishBookingSession.make(req);
    res.status(httpStatus.OK).send({ data: 'ok' });
  }
}
