import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import OrganizerRepository from 'App/Repositories/OrganizerRepository'
import CreateOrganizerValidator from 'App/Validators/Organizers/CreateOrganizerValidator'
import Organizer from 'App/Models/Organizer'
import LogicalException from 'App/Exceptions/LogicalException'
import UpdateOrganizerValidator from 'App/Validators/Organizers/UpdateOrganizerValidator'
import UpdateOrganizerSocialValidator from 'App/Validators/Organizers/UpdateOrganizerSocialValidator'

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

  public static async update(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(UpdateOrganizerValidator)
    const organizerId: number = +request.param('id')

    const updatedOrganizer = await OrganizerRepository.update(auth, organizerId, payload)

    return await OrganizerRepository.withSocialMedia(updatedOrganizer)
  }

  /**
   * Update social media associated with the specified organizer
   */
  public static async updateSocialMedias(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(UpdateOrganizerSocialValidator)
    const organizerId: number = +request.param('id')

    const updatedOrganizer = await OrganizerRepository.updateSocialMedias(
      auth,
      organizerId,
      payload.socialMedias
    )

    return await OrganizerRepository.withSocialMedia(updatedOrganizer)
  }

  /**
   * Retrieve all events associated with the organizer
   */
  public static async events(request: RequestContract) {
    const organizerId: number = +request.param('id')

    const organizer = await OrganizerRepository.find(organizerId)

    return await organizer.related('events').query()
  }

  public static async delete(auth: AuthContract, request: RequestContract) {
    const userId = auth.user!.id
    const organizerAccount = await OrganizerRepository.find(+request.param('id'))
    if (userId !== organizerAccount.userId)
      throw new LogicalException(`You don't have permission to delete this organizer account`)

    await OrganizerRepository.delete(organizerAccount.id)
  }
}
