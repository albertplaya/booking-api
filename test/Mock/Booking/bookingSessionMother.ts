import { Booking, BookingPrimitives } from './../../../src/Domain/booking';
import { Ulid } from '../../../src/Domain/Shared/ulid';
import faker from 'faker';
import { Event } from '../../../src/Domain/event';
import { makeRandomGuest } from '../Guest/guestMother';

export const makeNewRandomBooking = (): Booking => {
  const bookingPrimitives: BookingPrimitives = {
    booking_id: Ulid.create().value,
    event_id: Ulid.create().value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: new Date('2022-05-15 06:39:09').toISOString(),
    duration: faker.datatype.number(),
    guest: makeRandomGuest().toPrimitives()
  };
  return Booking.fromPrimitives(bookingPrimitives);
};

export const makeNewRandomBookingWithEvent = (event: Event): Booking => {
  const bookingPrimitives: BookingPrimitives = {
    booking_id: Ulid.create().value,
    event_id: event.event_id.value,
    status: 'init',
    title: faker.lorem.word(),
    start_date: event.start_date.toISOString(),
    duration: event.duration,
    guest: makeRandomGuest().toPrimitives()
  };
  return Booking.fromPrimitives(bookingPrimitives);
};
