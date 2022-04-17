import { Guest } from './../../Domain/guest';
import { GuestRepository } from './../Guest/guestRepository';
import { BookingSessionProps } from '../../Domain/bookingSession';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSessionRepository } from './bookingSessionRepository';

export class AddGuestBookingSession {
  constructor(
    private bookingSessionRepository: BookingSessionRepository,
    private guestRepository: GuestRepository
  ) {}

  async make(request: Request): Promise<void> {
    const guest: Guest = Guest.new(request.body.guest);
    this.guestRepository.add(guest);

    const bookingSessionProps: BookingSessionProps = {
      booking_id: Ulid.fromPrimitives(request.body.booking_id),
      event_id: Ulid.fromPrimitives(request.body.event_id),
      status: 'guest',
      guest: guest
    };

    const bookingSession: BookingSession =
      BookingSession.create(bookingSessionProps);
    this.bookingSessionRepository.add(bookingSession);
  }
}
