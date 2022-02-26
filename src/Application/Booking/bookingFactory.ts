import { GuestFactory } from './../Guest/guestFactory';
import { Booking } from '../../Domain/booking';
import { Uuid } from '../../Domain/Shared/uuid';
export interface BookingPrimitives {
  booking_id: string;
  event_id: string;
  status: string;
  title: string;
  start_date: string;
  duration: number;
  guest: {
    guest_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export class BookingFactory {
  static fromPrimitives(primitives: BookingPrimitives): Booking {
    return Booking.create({
      booking_id: Uuid.fromPrimitives(primitives.booking_id),
      event_id: Uuid.fromPrimitives(primitives.event_id),
      status: primitives.status,
      title: primitives.title,
      start_date: new Date(primitives.start_date),
      duration: primitives.duration,
      guest: GuestFactory.fromPrimitives(primitives.guest)
    });
  }
}
