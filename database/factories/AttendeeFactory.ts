import Attendee from 'App/Models/Attendee'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'
import EventFactory from './EventFactory'
import UserFactory from './UserFactory'
import PaymentFactory from './PaymentFactory'

export default Factory.define(Attendee, ({ faker }) => {
  return {
    userId: 1,
    eventId: 1,
    registrationDate: DateTime.fromJSDate(faker.date.future()),
    attendanceStatus: faker.helpers.arrayElement(['present', 'absent', 'registered']),
  }
})
  .relation('event', () => EventFactory)
  .relation('user', () => UserFactory)
  .relation('Payment', () => PaymentFactory)
  .build()
