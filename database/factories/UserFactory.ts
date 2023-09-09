import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: '12345678',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    loginType: 'email',
  }
}).build()
