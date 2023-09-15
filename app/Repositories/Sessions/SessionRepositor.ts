import { CreateSessionPayload, UpdateSessionPayload } from './session.repo'
import Event from 'App/Models/Event'

export default class SessionRepository {
  public static async findAll() {}

  public static async find(id: number) {}

  public static async create(event: Event, payload: CreateSessionPayload) {
    const session = await event.related('sessions').create(payload)

    return session
  }

  public static async update(payload: UpdateSessionPayload) {}

  public static async delete(id: number) {}
}
