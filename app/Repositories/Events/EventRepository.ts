import NotFoundException from 'App/Exceptions/NotFoundException'
import Event from 'App/Models/Event'
import { CreateEventPayload, UpdateEventPayload } from './event.repository'

export default class EventRepository {
  public static async create(payload: CreateEventPayload) {
    const event = await Event.create(payload)

    return event
  }

  public static async find(id: number) {
    const event = await Event.find(id)

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)

    await event.load('type')
    await event.load('organizer')
    await event.load('speakers')

    return event
  }

  public static async update(id: number, payload: UpdateEventPayload) {
    const event = await Event.find(id)

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)

    event.merge(payload)
    await event.save()

    return event
  }

  public static async delete(id: number) {
    const event = await Event.find(id)

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)

    await event.delete()
  }
}
