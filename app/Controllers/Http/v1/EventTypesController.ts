import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EventType from 'App/Models/EventType'
import BaseController from './BaseController'
import CreateEventTypeValidator from 'App/Validators/EventTypes/CreateEventTypeValidator'
import UpdateEventTypeValidator from 'App/Validators/EventTypes/UpdateEventTypeValidator'

// TODO: add repository and service for event types

export default class EventTypesController extends BaseController {
  /**
   * List all event types
   */
  public async index({ response }: HttpContextContract) {
    const eventTypes = await EventType.all()

    return this.success({
      response,
      data: { eventTypes },
    })
  }

  /**
   * Create a new event type
   */
  public async create({ response, request }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateEventTypeValidator)

      const eventType = await EventType.create(payload)

      return this.success({
        response,
        data: { eventType },
        statusCode: 201,
      })
    } catch (err) {
      return this.validationFailed({
        response,
        errors: err?.messages?.errors,
      })
    }
  }

  /**
   * Update an event type
   */
  public async update({ response, request, params }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateEventTypeValidator)

      const eventType = await EventType.find(params.id)

      if (!eventType)
        return this.notFound({
          response,
          message: 'Event type not found',
        })

      eventType.merge(payload)

      const eventTypeUpdated = await eventType.save()

      return this.success({
        response,
        message: 'Event updated successfully',
        data: { eventType: eventTypeUpdated },
      })
    } catch (err) {
      return this.validationFailed({
        response,
        errors: err?.messages?.errors,
      })
    }
  }
}
