import NotFoundException from 'App/Exceptions/NotFoundException'
import Event from 'App/Models/Event'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { CreateEventPayload, UpdateEventPayload } from './event.repository'
import EventType from 'App/Models/EventType'
import Drive from '@ioc:Adonis/Core/Drive'

export default class EventRepository {
  public static async create(payload: CreateEventPayload) {
    const eventType = await EventType.find(payload.typeId)
    if (!eventType) {
      throw new NotFoundException(`Event with id ${payload.typeId} not found`)
    }

    let bannerPath: string | undefined
    if (payload.banner) {
      bannerPath = await EventRepository.saveBanner(payload.banner)
    }

    const event = await Event.create({
      ...payload,
      banner: bannerPath,
    })

    return event
  }

  public static async saveBanner(banner: MultipartFileContract) {
    await banner.moveToDisk('banners')

    return await Drive.getUrl(`banners/${banner.fileName!}`)
  }

  public static async removeBanner(eventId: number) {
    const event = await Event.find(eventId)

    if (!event) throw new NotFoundException(`Event with ID ${eventId} not found`)

    if (event.banner) {
      await Drive.delete(event.banner)
    }
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

    if (payload.typeId) {
      const eventType = await EventType.find(payload.typeId)
      if (!eventType)
        throw new NotFoundException(`Event type with id ${payload.typeId} could not be found`)
    }

    /**
     * Update the banner if it exists
     */
    let bannerPath: string | undefined
    if (payload.banner) {
      await EventRepository.removeBanner(id)
      bannerPath = await EventRepository.saveBanner(payload.banner)
    }

    event.merge({
      ...payload,
      banner: bannerPath,
    })
    await event.save()

    return event
  }

  public static async delete(id: number) {
    const event = await Event.find(id)

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`)

    await event.delete()
  }
}
