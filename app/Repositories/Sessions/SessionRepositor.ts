import NotFoundException from 'App/Exceptions/NotFoundException'
import { CreateSessionPayload, UpdateSessionPayload } from './session.repo'
import Event from 'App/Models/Event'
import SessionType from 'App/Models/SessionType'
import Session from 'App/Models/Session'
import Speaker from 'App/Models/Speaker'

export default class SessionRepository {
  public static async findAll() {}

  public static async find(id: number) {
    const session = await Session.find(id)
    if (!session) {
      throw new NotFoundException(`Session with id ${id} could not be found`)
    }

    return session
  }

  public static async create(event: Event, payload: CreateSessionPayload) {
    const session = await event.related('sessions').create(payload)

    return session
  }

  public static async update(event: Event, sessionId: number, payload: UpdateSessionPayload) {
    const session = await event.related('sessions').query().where('id', sessionId).first()

    if (!session) {
      throw new NotFoundException(`Session with id ${sessionId} could not be found`)
    }

    const sessionTypeId = payload.sessionTypeId
    if (sessionTypeId) {
      const sessionType = await SessionType.find(sessionTypeId)
      if (!sessionType) {
        throw new NotFoundException(`Session type with id ${sessionTypeId} could not be found`)
      }
    }

    session.merge(payload)
    await session.save()

    return session
  }

  public static async delete(id: number) {
    const session = await SessionRepository.find(id)

    await session.delete()
  }

  public static async addSpeakers(session: Session, speakers: number[]) {
    await SessionRepository.validateSpeakers(speakers)

    await session.related('speakers').attach(speakers)
  }

  public static async syncSpeakers(session: Session, speakers: number[]) {
    await SessionRepository.validateSpeakers(speakers)

    await session.related('speakers').sync(speakers)
  }

  private static async validateSpeakers(speakers: number[]) {
    for (const id of speakers) {
      if (!(await Speaker.find(id))) {
        throw new NotFoundException(`Speaker with id ${id} could not be found`)
      }
    }
  }
}
