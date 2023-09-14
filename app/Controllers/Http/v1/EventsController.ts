import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import EventService from 'App/Services/EventService'

export default class EventsController extends BaseController {
  /**
   * List all events
   */
  public async index({ response, request }: HttpContextContract) {
    const events = await EventService.filter(request)

    return this.success({
      response,
      data: { events },
    })
  }

  /**
   * List all events with filter
   */
  public async filter({ request, response }: HttpContextContract) {
    const events = await EventService.filter(request)

    return this.success({
      response,
      data: { events },
    })
  }

  /**
   * List of the related events
   */
  public async related({ request, response }: HttpContextContract) {
    const events = await EventService.related(request)

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

  /**
   * Retrieve event attendees
   */
  public async retrieveAttendees({ request, response }: HttpContextContract) {
    const attendees = await EventService.retrieveAttendees(request)

    return this.success({
      response,
      data: { attendees },
      message: 'Event attendees retrieve successfully',
    })
  }

  /**
   * Register to an event
   */
  public async register({ auth, request, response }: HttpContextContract) {
    const attendee = await EventService.register(auth, request)

    return this.success({
      response,
      data: { attendee },
      message: 'Register to the event successfully',
    })
  }

  /**
   * Unregister to an event
   */
  public async unregister({ auth, request, response }: HttpContextContract) {
    const attendee = await EventService.unregister(auth, request)

    return this.success({
      response,
      data: { attendee },
      message: 'Unregister to the event successfully',
    })
  }
}
