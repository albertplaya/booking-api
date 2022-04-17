import { Event } from '../../Domain/event';
import { Activity } from '../../Domain/activity';
import { EventRepository } from '../Event/eventRepository';
import { ActivityRepository } from '../Activity/activityRepository';
import { Booking } from '../../Domain/booking';
import { Request } from 'express';
import { BookingSession } from '../../Domain/bookingSession';
import { Ulid } from '../../Domain/Shared/ulid';
import { BookingSessionRepository } from './bookingSessionRepository';
import { BookingRepository } from '../Booking/bookingRepository';

export class FinishBookingSession {
  bookingSessionRepository: BookingSessionRepository;
  bookingRepository: BookingRepository;
  activityRepository: ActivityRepository;
  eventRepository: EventRepository;

  constructor(
    bookingSessionRepository: BookingSessionRepository,
    bookingRepository: BookingRepository,
    activityRepository: ActivityRepository,
    eventRepository: EventRepository
  ) {
    this.bookingSessionRepository = bookingSessionRepository;
    this.bookingRepository = bookingRepository;
    this.activityRepository = activityRepository;
    this.eventRepository = eventRepository;
  }

  async make(request: Request): Promise<void> {
    const bookingSession: BookingSession =
      await this.bookingSessionRepository.get(
        Ulid.fromPrimitives(request.body.event_id),
        Ulid.fromPrimitives(request.body.booking_id)
      );

    const event: Event = await this.eventRepository.get(
      Ulid.fromPrimitives(request.body.event_id)
    );

    const activity: Activity = await this.activityRepository.get(
      event.activity_id
    );

    const booking: Booking = Booking.create({
      booking_id: bookingSession.booking_id,
      event_id: bookingSession.event_id,
      status: 'paid',
      title: activity.title,
      start_date: event.start_date,
      duration: event.duration,
      guest: bookingSession.guest
    });

    this.bookingSessionRepository.delete(bookingSession);
    this.bookingRepository.add(booking);
    this.incrementCapacity(event);
  }

  async incrementCapacity(event: Event): Promise<void> {
    event.incrementCapacity();
    this.eventRepository.update(event);
  }
}
