import Event from 'App/Models/Event'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'
import SpeakerFactory from './SpeakerFactory'

export default Factory.define(Event, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    typeId: faker.number.int({ min: 1, max: 3 }),
    description: faker.lorem.paragraph(),
    date: DateTime.fromJSDate(faker.date.future()),
    location: faker.location.city(),
    duration: faker.number.int({ min: 60, max: 180 }),
    deadline: DateTime.fromJSDate(faker.date.future()),
    maxAttendees: faker.number.int({ min: 10, max: 100 }),
    price: faker.number.float({ min: 0, max: 1000000 }),
    banner: faker.image.url(),
  }
})
  .relation('speakers', () => SpeakerFactory)
  .build()
