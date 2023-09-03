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
    try {
      const organizer = await OrganizerService.create(auth, request)

      return this.success({
        response,
        message: 'Organizer created successfully',
        data: { organizer },
      })
    } catch (error) {
      return this.validationFailed({ response, errors: error.messages || error.message })
    }
  }
}
