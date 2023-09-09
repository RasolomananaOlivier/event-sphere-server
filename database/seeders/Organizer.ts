import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import OrganizerFactory from 'Database/factories/OrganizerFactory'

export default class extends BaseSeeder {
  public async run() {
    await OrganizerFactory.with('user')
      .with('events', 3, (event) => event.with('speakers', 2))
      .createMany(3)
  }
}
