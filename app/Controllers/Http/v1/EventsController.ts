import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import Event from 'App/Models/Event'
import EventService from 'App/Services/EventService'
import type { ValidationException } from '@ioc:Adonis/Core/Validator'

export default class EventsController extends BaseController {
  /**
   * List all events
   */
  public async index({ response }: HttpContextContract) {
    const events = await Event.query().preload('type')

    return this.success({
      response,
      data: { events },
    })
  }

  /**
   * Create a new event
   */
  public async create({ request, response }: HttpContextContract) {
    try {
      const event = await EventService.create(request)

      return this.success({
        response,
        data: { event },
        message: 'Event created successfully',
      })
    } catch (error) {
      return this.validationFailed({
        response,
        errors: error?.messages?.errors,
      })
    }
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
  public async update({ request, response }: HttpContextContract) {
    try {
      const event = await EventService.update(request)

      return this.success({
        response,
        data: { event },
        message: 'Event updated successfully',
      })
    } catch (error) {
      return this.validationFailed({
        response,
        errors: error?.messages?.errors,
      })
    }
  }

  /**
   * Delete an event
   */
  public async destroy({ request, response }: HttpContextContract) {}
}
