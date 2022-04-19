import { Event } from './../../Domain/event';
import { Ulid } from '../../Domain/Shared/ulid';
import { Request } from 'express';
import { EventRepository } from './eventRepository';

export class CreateEvent {
  constructor(private eventRepository: EventRepository) {}

  make(request: Request): Ulid {
    const event: Event = Event.create({
      event_id: Ulid.fromPrimitives(request.body.event_id),
      start_date: new Date(request.body.start_date),
      duration: request.body.duration,
      capacity: request.body.capacity,
      current_capacity: 0,
      activity_id: Ulid.fromPrimitives(request.body.activity_id)
    });
    this.eventRepository.add(event);
    return event.event_id;
  }
}
