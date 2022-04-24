import { Ulid } from './../../../src/Domain/Shared/ulid';
import { Partner } from './../../../src/Domain/partner';
import { Activity } from './../../../src/Domain/activity';
import faker from 'faker';

export const makeRandomActivity = (partner: Partner): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    partner_id: partner.partner_id.value,
    image_id: Ulid.create().value
  });
};

export const makeRandomActivityWhithoutImage = (partner: Partner): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    partner_id: partner.partner_id.value,
    image_id: null
  });
};

export const makeRandomIsolatedActivity = (): Activity => {
  return Activity.fromPrimitives({
    activity_id: Ulid.create().value,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.datatype.number(2000),
    currency: 'EUR',
    partner_id: Ulid.create().value,
    image_id: Ulid.create().value
  });
};
