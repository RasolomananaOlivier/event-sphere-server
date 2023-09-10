import Payment from 'App/Models/Payment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import AttendeeFactory from './AttendeeFactory'
import { DateTime } from 'luxon'

export default Factory.define(Payment, ({ faker }) => {
  return {
    paymentDate: DateTime.fromJSDate(faker.date.future()),
    amount: faker.number.float({ min: 0, max: 100 }),
    method: faker.helpers.arrayElement(['bank_transfer', 'credit_card', 'paypal']),
    status: faker.helpers.arrayElement(['pending', 'paid', 'failed']),
  }
})
  .relation('attendee', () => AttendeeFactory)
  .build()
