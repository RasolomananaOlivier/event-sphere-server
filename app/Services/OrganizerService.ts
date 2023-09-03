import type { RequestContract } from '@ioc:Adonis/Core/Request'
import OrganizerRepository from 'App/Repositories/OrganizerRepository'
import CreateOrganizerValidator from 'App/Validators/Organizers/CreateOrganizerValidator'

export default class OrganizerService {
  public static async create(request: RequestContract) {
    const payload = await request.validate(CreateOrganizerValidator)

    const organizer = await OrganizerRepository.create(payload)

    if (payload.socialMedias.length > 0)
      await OrganizerRepository.attachSocialMedia(organizer.id, payload.socialMedias)

    return await OrganizerRepository.withSocialMedia(organizer)
  }

  public static async findAll() {
    const organizers = await OrganizerRepository.findAll()

    const organizersWithSocialMedias = []
    for (let organizer of organizers) {
      const withSocialMedia = await OrganizerRepository.withSocialMedia(organizer)
      // @ts-ignore
      organizersWithSocialMedias.push(withSocialMedia)
    }

    return organizersWithSocialMedias
  }

  public static async find() {}

  public static async update() {}

  public static async delete() {}
}
