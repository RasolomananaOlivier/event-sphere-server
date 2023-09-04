import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizerService from 'App/Services/OrganizerService'
import BaseController from './BaseController'

export default class OrganizersController extends BaseController {
  /**
   * List all organizers
   */
  public async index({ response }: HttpContextContract) {
    const organizers = await OrganizerService.findAll()

    return this.success({
      response,
      message: 'List of all organizers',
      data: { organizers },
    })
  }

  /**
   * Create a new organizer
   */
  public async create({ request, response, auth }: HttpContextContract) {
    const organizer = await OrganizerService.create(auth, request)

    return this.success({
      response,
      message: 'Organizer created successfully',
      data: { organizer },
    })
  }

  /**
   * Update an organizer
   */
  public async update({ request, response, auth }: HttpContextContract) {
    const organizer = await OrganizerService.update(auth, request)

    return this.success({
      response,
      message: 'Organizer updated successfully',
      data: { organizer },
    })
  }

  /**
   * Update an organizer social media
   */
  public async updateSocialMedias({ request, response, auth }: HttpContextContract) {
    const organizer = await OrganizerService.updateSocialMedias(auth, request)

    return this.success({
      response,
      message: 'Organizer social medias updated successfully',
      data: { organizer },
    })
  }

  /**
   * Delete an organizer
   */
  public async delete({ request, response, auth }: HttpContextContract) {}
}
