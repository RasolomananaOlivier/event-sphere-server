import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import NotFoundException from 'App/Exceptions/NotFoundException'
import SessionRepository from 'App/Repositories/Sessions/SessionRepositor'

export default class SessionService {
  public static async findAll(request: RequestContract) {
    const eventId = +request.param('eventId')

    const event = await EventRepository.find(eventId)

    return await event.related('sessions').query()
  }

  public static async find(request: RequestContract) {
    const eventId = +request.param('eventId')
    const sessionId = +request.param('sessionId')

    const event = await EventRepository.find(eventId)

    const session = await event.related('sessions').query().where('id', sessionId).first()

    if (!session) {
      throw new NotFoundException(`Session with id ${sessionId} not found`)
    }

    return session
  }

  public static async create(auth: AuthContract, request: RequestContract) {}

  public static async update(request: RequestContract) {}

  public static async delete(request: RequestContract) {}
}
