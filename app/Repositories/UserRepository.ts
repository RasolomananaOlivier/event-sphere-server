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

  public static async findOrCreate(where: any, payload: any) {
    const user = await User.firstOrCreate(where, payload)
    return user
  }

  public static async find() {}

  public static async findAll() {
    const users = await User.all()
    return users
  }

  public static async update() {}

  public static async delete() {}
}
