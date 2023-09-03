import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import OrganizerRepository from 'App/Repositories/OrganizerRepository'
import CreateOrganizerValidator from 'App/Validators/Organizers/CreateOrganizerValidator'
import Organizer from 'App/Models/Organizer'
import LogicalException from 'App/Exceptions/LogicalException'

export default class OrganizerService {
  public static async create(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(CreateOrganizerValidator)
    const userId = auth.user!.id

    const existingOrganizer = await Organizer.findBy('userId', userId)

    if (existingOrganizer) throw new LogicalException('User already have an organizer account', 400)

    const organizer = await OrganizerRepository.create({
      ...payload,
      userId,
    })

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
