import { Ulid } from './../Domain/Shared/ulid';
import { BookingSession } from './../Domain/bookingSession';
import { redisConnection } from './redisConnector';
import { BookingSessionRepository } from '../Application/BookingSession/bookingSessionRepository';

export class BookingSessionRedisRepository implements BookingSessionRepository {
  async add(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.set(key, JSON.stringify(bookingSession), {
      EX: 900
    });
  }

  async get(eventId: Ulid, bookingId: Ulid): Promise<BookingSession> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':' + bookingId.value;
    return JSON.parse(await connection.get(key));
  }

  async count(eventId: Ulid): Promise<number> {
    const connection = await redisConnection();
    const key: string = eventId.value + ':*';
    const eventIds: string[] = await connection.keys(key);
    return eventIds.length;
  }

  async delete(bookingSession: BookingSession): Promise<void> {
    const connection = await redisConnection();
    const key: string =
      bookingSession.event_id.value + ':' + bookingSession.booking_id.value;
    connection.del(key);
  }
}
