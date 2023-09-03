import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EventType from 'App/Models/EventType'
import BaseController from './BaseController'
import CreateEventTypeValidator from 'App/Validators/EventTypes/CreateEventTypeValidator'
import UpdateEventTypeValidator from 'App/Validators/EventTypes/UpdateEventTypeValidator'

export default class EventTypesController extends BaseController {
  /**
   * List all event types
   */
  public async index(ctx: HttpContextContract) {
    const eventTypes = await EventType.all()

    return this.success({
      ctx,
      data: { eventTypes },
    })
  }

  /**
   * Create a new event type
   */
  public async create(ctx: HttpContextContract) {
    try {
      const payload = await ctx.request.validate(CreateEventTypeValidator)

      const eventType = await EventType.create(payload)

      return this.success({
        ctx,
        data: { eventType },
        statusCode: 201,
      })
    } catch (err) {
      return this.validationFailed({
        ctx,
        errors: err?.messages?.errors,
      })
    }
  }

  /**
   * Update an event type
   */
  public async update(ctx: HttpContextContract) {
    const { request, params } = ctx

    try {
      const payload = await request.validate(UpdateEventTypeValidator)

      const eventType = await EventType.find(params.id)

      if (!eventType)
        return this.notFound({
          ctx,
          message: 'Event type not found',
        })

      eventType.merge(payload)

      const eventTypeUpdated = await eventType.save()

      return this.success({
        ctx,
        message: 'Event updated successfully',
        data: { eventType: eventTypeUpdated },
      })
    } catch (err) {
      return this.validationFailed({
        ctx,
        errors: err?.messages?.errors,
      })
    }
  }

  /**
   * Delete an event type
   */
  public async delete(ctx: HttpContextContract) {
    const { params } = ctx

    const eventType = await EventType.find(params.id)

    if (!eventType)
      return this.notFound({
        ctx,
        message: 'Event type not found',
      })

    await eventType.delete()

    return this.success({
      ctx,
      message: 'Event type deleted',
    })
  }
}
