import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SocialMedia from 'App/Models/SocialMedia'

export default class extends BaseSeeder {
  public async run() {
    await SocialMedia.createMany([
      {
        name: 'Facebook',
      },
      {
        name: 'Twitter',
      },
      {
        name: 'Instagram',
      },
      {
        name: 'LinkedIn',
      },
      {
        name: 'YouTube',
      },
      {
        name: 'TikTok',
      },
      {
        name: 'Pinterest',
      },
      {
        name: 'Snapchat',
      },
    ])
  }
}
