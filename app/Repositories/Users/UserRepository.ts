import User from 'App/Models/User'
import { UserEmailPayload, UserInformationPayload, UserSecurityPayload } from './user.repository'
import NotFoundException from 'App/Exceptions/NotFoundException'

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

  public static async find(userId: number) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  public static async findAll() {
    const users = await User.all()
    return users
  }

  public static async update(userId: number, payload: UserInformationPayload) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User not found')

    user.merge(payload)
    await user.save()

    return user
  }

  public static async updateEmail(userId: number, payload: UserEmailPayload) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User not found')

    user.email = payload.email
    await user.save()

    return user
  }

  public static async verifyEmail(token: string) {}

  public static async updatePassword(userId: number, payload: UserSecurityPayload) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User not found')

    user.password = payload.password
    await user.save()

    return user
  }

  public static async delete(userId: number) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User not found')

    await user.delete()
  }
}
