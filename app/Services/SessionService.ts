import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import NotFoundException from 'App/Exceptions/NotFoundException'
import SessionRepository from 'App/Repositories/Sessions/SessionRepository'
import CreateSessionValidator from 'App/Validators/Sessions/CreateSessionValidator'
import SessionType from 'App/Models/SessionType'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { CreateSessionPayload, UpdateSessionPayload } from 'App/Repositories/Sessions/session.repo'
import LogicalException from 'App/Exceptions/LogicalException'
import UpdateSessionValidator from 'App/Validators/Sessions/UpdateSessionValidator'

export default class SessionService {
  public static async findAll(request: RequestContract) {
    const eventId = +request.param('eventId')

    const event = await EventRepository.find(eventId)

    return await event.related('sessions').query().preload('type').preload('speakers')
  }

  public static async find(request: RequestContract) {
    const eventId = +request.param('eventId')
    const sessionId = +request.param('sessionId')

    const event = await EventRepository.find(eventId)

    const session = await event
      .related('sessions')
      .query()
      .preload('type')
      .preload('speakers')
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

    if (event.organizerId !== organizer.id) {
      throw new UnauthorizedException(`You don't have access to create session for this event`)
    }

    const session = await SessionRepository.create(event, payload as CreateSessionPayload)

    await SessionRepository.addSpeakers(session, payload.speakers)

    await session.load('type')
    await session.load('speakers')

    return session
  }

  public static async update(auth: AuthContract, request: RequestContract) {
    const organizer = await auth.user!.related('organizer').query().first()

    if (!organizer) {
      throw new LogicalException('You must be an organizer to update a session')
    }

    const payload = await request.validate(UpdateSessionValidator)

    const event = await EventRepository.find(+request.param('eventId'))
    if (event.organizerId !== organizer.id) {
      throw new UnauthorizedException(`You don't have access to update session for this event`)
    }

    const session = await SessionRepository.update(
      event,
      +request.param('sessionId'),
      payload as UpdateSessionPayload
    )

    if (payload.speakers) {
      await SessionRepository.syncSpeakers(session, payload.speakers)
    }

    await session.load('type')
    await session.load('speakers')

    return session
  }

  public static async delete(auth: AuthContract, request: RequestContract) {
    const organizer = await auth.user!.related('organizer').query().first()

    if (!organizer) {
      throw new LogicalException('You must be an organizer to delete a session')
    }

    const event = await EventRepository.find(+request.param('eventId'))
    if (event.organizerId !== organizer.id) {
      throw new UnauthorizedException(`You don't have access to delete session for this event`)
    }

    await SessionRepository.delete(+request.param('sessionId'))
  }
}
