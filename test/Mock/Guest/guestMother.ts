import { Ulid } from './../../../src/Domain/Shared/ulid';
import { Guest } from './../../../src/Domain/guest';
import faker from 'faker';

export const makeRandomGuest = (partnerId: Ulid): Guest => {
  return Guest.fromPrimitives({
    guest_id: Ulid.create().value,
    partner_id: partnerId.value,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  });
};
