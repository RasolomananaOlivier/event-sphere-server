import NotFoundException from 'App/Exceptions/NotFoundException'
import Event from 'App/Models/Event'
import { DateTime } from 'luxon'

interface EventPayload {
  // organiserId: number
  typeId?: number
  title?: string
  description?: string
  date?: DateTime
  location?: string
  duration?: number
  deadline?: DateTime
  maxAttendees?: number
  price?: number
  banner?: string
}

export default class EventRepository {
  public static async create(payload: EventPayload) {
    const event = await Event.create(payload)

    return event
  }

  public static async find(id: number) {
    const event = await Event.find(id)

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)

    return event
  }

  public static async update(id: number, payload: EventPayload) {
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
