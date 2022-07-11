import { GetBookingsWithFilter } from './../../../Application/Booking/getBookingsWithFilter';
import { Booking } from '../../../Domain/booking';
import { BookingMysqlRepository } from '../../Repository/bookingMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingListWithFiltersController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getBookingsWithFilter: GetBookingsWithFilter =
      new GetBookingsWithFilter(new BookingMysqlRepository());
    const bookings: Booking[] = await getBookingsWithFilter.make({
      filter: req.query.filter as string,
      attributes: {
        partner_id: req.query.partner_id as string
      }
    });
    res.status(httpStatus.OK).send(this.toResponse(bookings));
  }

  private toResponse(bookings: Booking[]): any {
    return {
      data: bookings.map((booking) => booking.toPrimitives())
    };
  }
}
