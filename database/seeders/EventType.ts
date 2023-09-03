import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EventType from 'App/Models/EventType'

export default class extends BaseSeeder {
  public async run() {
    await EventType.createMany([
      {
        name: 'Conference',
        description: 'A conference is a meeting of people who "confer" about a topic.',
      },
      {
        name: 'Seminar',
        description:
          'A seminar is a form of academic instruction, either at an academic institution or offered by a commercial or professional organization.',
      },
      {
        name: 'Webinar',
        description:
          'A webinar is an event held on the internet which is attended exclusively by an online audience.',
      },
      {
        name: 'Workshop',
        description:
          'A workshop is an informative or instructional class focused on teaching specialized skills or exploring a particular subject.',
      },
      {
        name: 'Hackathon',
        description:
          'A hackathon is a design sprint-like event; often, in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, domain experts, and others collaborate intensively on software projects.',
      },
    ])
  }
}
