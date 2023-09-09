import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import Event from 'App/Models/Event'
import EventService from 'App/Services/EventService'

export default class EventsController extends BaseController {
  /**
   * List all events
   */
  public async index({ response }: HttpContextContract) {
    const events = await Event.query().preload('type').preload('organizer').preload('speakers')

    return this.success({
      response,
      data: { events },
    })
  }

  /**
   * Create a new event
   */
  public async create({ auth, request, response }: HttpContextContract) {
    const event = await EventService.create(auth, request)

    return this.success({
      response,
      data: { event },
      message: 'Event created successfully',
    })
  }

  /**
   * Show a single event
   */
  public async show({ request, response }: HttpContextContract) {
    const event = await EventService.find(request)

    return this.success({
      response,
      data: { event },
    })
  }

  /**
   * Update an event
   */
  public async update({ auth, request, response }: HttpContextContract) {
    const event = await EventService.update(auth, request)

    return this.success({
      response,
      data: { event },
      message: 'Event updated successfully',
    })
  }

  /**
   * Delete an event
   */
  public async delete({ request, response }: HttpContextContract) {
    await EventService.delete(request)

    return this.success({
      response,
      message: 'Event deleted successfully',
    })
  }
}
