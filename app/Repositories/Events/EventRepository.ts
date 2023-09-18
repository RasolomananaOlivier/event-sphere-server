import NotFoundException from 'App/Exceptions/NotFoundException'
import Event from 'App/Models/Event'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { CreateEventPayload, UpdateEventPayload } from './event.repository'
import EventType from 'App/Models/EventType'
import Drive from '@ioc:Adonis/Core/Drive'
import SessionRepository from '../Sessions/SessionRepository'

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

  public static async addSpeakers(event: Event, speakers: number[]) {
    await SessionRepository.validateSpeakers(speakers)

    event.related('speakers').attach(speakers)
  }

  public static async syncSpeakers(event: Event, speakers: number[]) {
    await SessionRepository.validateSpeakers(speakers)

    event.related('speakers').sync(speakers)
  }

  public static async saveBanner(banner: MultipartFileContract) {
    await banner.moveToDisk('banners')

    return await Drive.getUrl(`banners/${banner.fileName!}`)
  }

  public static async removeBanner(eventId: number) {
    const event = await Event.find(eventId)

    if (!event) throw new NotFoundException(`Event with ID ${eventId} not found`)

    if (event.banner) {
      await Drive.delete(event.banner.split('/').slice(2).join('/'))
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

  public static async findByType(typeId: number) {
    const events = await Event.query()
      .where('type_id', typeId)
      .preload('type')
      .preload('organizer')
      .preload('speakers')

    return events
  }

  public static async findByOrganizer(organizerId: number) {
    const events = await Event.query()
      .where('organizer_id', organizerId)
      .preload('type')
      .preload('organizer')
      .preload('speakers')

    return events
  }
}
