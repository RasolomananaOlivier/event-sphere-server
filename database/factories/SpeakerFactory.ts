import Speaker from 'App/Models/Speaker'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Speaker, ({ faker }) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    bio: faker.lorem.paragraph(),
    photo: faker.image.avatar(),
    expertise: faker.lorem.words(3),
  }
}).build()
