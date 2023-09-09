import Organizer from 'App/Models/Organizer'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import EventFactory from './EventFactory'

export default Factory.define(Organizer, ({ faker }) => {
  return {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    logo: faker.image.url(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    website: faker.internet.url(),
  }
})
  .relation('user', () => UserFactory)
  .relation('events', () => EventFactory)
  .build()
