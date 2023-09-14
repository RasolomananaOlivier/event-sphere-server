import { CreateSessionPayload, UpdateSessionPayload } from './session.repo'

export default class SessionRepository {
  public static async findAll() {}

  public static async find(id: number) {}

  public static async create(payload: CreateSessionPayload) {}

  public static async update(payload: UpdateSessionPayload) {}

  public static async delete(id: number) {}
}
