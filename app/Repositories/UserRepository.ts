import User from 'App/Models/User'

interface UserPayload {
  email: string
  password: string
}

export default class UserRepository {
  public static async create(payload: UserPayload) {
    const user = await User.create(payload)
    return user
  }

  public static async findByEmail(email: string) {
    const user = await User.findBy('email', email)
    return user
  }

  public static async find() {}

  public static async findAll() {}

  public static async update() {}

  public static async delete() {}
}
