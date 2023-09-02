// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EventType from 'App/Models/EventType'
import BaseController from './BaseController'

export default class EventTypesController extends BaseController {
  /**
   * List all event types
   */
  public async index() {
    const eventTypes = await EventType.all()

    return this.success(eventTypes)
  }

  /**
   * Create a new event type
   */
  public async create() {
    return {}
  }
}
