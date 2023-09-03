import type { RequestContract } from '@ioc:Adonis/Core/Request'
import EventRepository from 'App/Repositories/EventRepository'
import CreateEventValidator from 'App/Validators/Events/CreateEventValidator'
import UpdateEventValidator from 'App/Validators/Events/UpdateEventValidator'

export default class EventService {
  public static async create(request: RequestContract) {
    const payload = await request.validate(CreateEventValidator)

    const event = await EventRepository.create(payload)

    return event
  }

  public static async find(request: RequestContract) {
    const id = request.param('id')

    const event = await EventRepository.find(id)

    return event
  }

  public static async update(request: RequestContract) {
    const id = request.param('id')

    const payload = await request.validate(UpdateEventValidator)
    const event = await EventRepository.update(id, payload)

    return event
  }
}
