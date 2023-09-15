import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import NotFoundException from 'App/Exceptions/NotFoundException'
import SessionRepository from 'App/Repositories/Sessions/SessionRepositor'
import CreateSessionValidator from 'App/Validators/Sessions/CreateSessionValidator'
import SessionType from 'App/Models/SessionType'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { CreateEventPayload } from 'App/Repositories/Events/event.repository'
import { CreateSessionPayload } from 'App/Repositories/Sessions/session.repo'
import LogicalException from 'App/Exceptions/LogicalException'

export default class SessionService {
  public static async findAll(request: RequestContract) {
    const eventId = +request.param('eventId')

    const event = await EventRepository.find(eventId)

    return await event.related('sessions').query().preload('type')
  }

  public static async find(request: RequestContract) {
    const eventId = +request.param('eventId')
    const sessionId = +request.param('sessionId')

    const event = await EventRepository.find(eventId)

    const session = await event
      .related('sessions')
      .query()
      .preload('type')
      .where('id', sessionId)
      .first()

    if (!session) {
      throw new NotFoundException(`Session with id ${sessionId} not found`)
    }

    return session
  }

  public static async create(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(CreateSessionValidator)

    const sessionType = await SessionType.find(payload.sessionTypeId)
    if (!sessionType)
      throw new NotFoundException(
        `Session type with id ${payload.sessionTypeId} could not be found`
      )

    const eventId = +request.param('eventId')

    const organizer = await auth.user!.related('organizer').query().first()

    if (!organizer) {
      throw new LogicalException('You must be an organizer to create a session')
    }

    const event = await EventRepository.find(eventId)

    console.log(event.organizerId, organizer.id)

    if (event.organizerId !== organizer.id) {
      throw new UnauthorizedException(`You don't have access to create session for this event`)
    }

    const session = await SessionRepository.create(event, payload as CreateSessionPayload)

    return await session.load('type')
  }

  public static async update(request: RequestContract) {}

  public static async delete(request: RequestContract) {}
}
