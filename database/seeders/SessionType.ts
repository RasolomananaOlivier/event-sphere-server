import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SessionType from 'App/Models/SessionType'

export default class extends BaseSeeder {
  public async run() {
    const sessionTypes = [
      {
        name: 'Presentation',
        description:
          'A speaker or presenter delivers a talk or lecture on a specific topic, sharing information, insights, or research findings.',
      },
      {
        name: 'Panel Discussion',
        description:
          'A group of experts or panelists engage in a discussion, sharing their opinions and expertise on a particular subject.',
      },
      {
        name: 'Workshop',
        description:
          'An interactive session where participants engage in hands-on activities, practical exercises, or skill-building activities.',
      },
      {
        name: 'Q&A Session',
        description:
          'An opportunity for attendees to ask questions to a speaker or a panel of experts, with responses provided in real-time.',
      },
      {
        name: 'Roundtable Discussion',
        description:
          'A session where a small group of participants discusses a specific topic or challenge, often led by a facilitator.',
      },
      {
        name: 'Networking Session',
        description:
          'Time allocated for attendees to connect with each other, engage in conversations, and build professional relationships.',
      },
      {
        name: 'Breakout Session',
        description:
          'Smaller, parallel sessions or workshops that attendees can choose to attend based on their interests.',
      },
      {
        name: 'Keynote Address',
        description:
          'A high-profile speaker delivers a speech that sets the tone for the event, often addressing a broad theme or vision.',
      },
      {
        name: 'Fireside Chat',
        description:
          "An informal conversation between a moderator and a guest speaker, providing insights into the speaker's experiences and perspectives.",
      },
      {
        name: 'Product Demo',
        description:
          'A session where companies or individuals showcase and demonstrate products or services.',
      },
      {
        name: 'Performance or Entertainment',
        description: 'Live music, art, or entertainment acts to engage and entertain attendees.',
      },
      {
        name: 'Hackathon',
        description:
          'A competitive event where participants work collaboratively to solve problems or create software solutions within a limited time frame.',
      },
      {
        name: 'Pitch Competition',
        description:
          'Entrepreneurs or startups pitch their ideas or products to a panel of judges and an audience.',
      },
      {
        name: 'Interactive Polls and Surveys',
        description:
          'Real-time polling or survey sessions to gather feedback and insights from attendees.',
      },
      {
        name: 'Case Study Presentation',
        description:
          'Sharing real-world examples and case studies to illustrate concepts or strategies.',
      },
      {
        name: 'Town Hall Meeting',
        description:
          'An open forum for discussion where organizers address questions, concerns, or updates from attendees.',
      },
      {
        name: 'Awards Ceremony',
        description:
          'Recognizing and celebrating achievements, whether in the industry or within the event community.',
      },
      {
        name: 'Poster Session',
        description:
          'Presenting research or projects through visual posters, often accompanied by discussions.',
      },
      {
        name: 'Cocktail Reception',
        description: 'An informal social gathering for networking and socializing.',
      },
      {
        name: 'Virtual Tour',
        description:
          'Exploring virtual spaces, whether related to a physical location, product, or concept.',
      },
    ]

    SessionType.createMany(sessionTypes)
  }
}
