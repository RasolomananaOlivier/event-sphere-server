import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import UserRepository from 'App/Repositories/UserRepository'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Hash from '@ioc:Adonis/Core/Hash'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class UserService {
  public static async create(request: RequestContract) {
    const payload = await request.validate(RegisterValidator)

    const existingUser = await UserRepository.findByEmail(payload.email)

    if (existingUser) throw new Error('Email already exists')

    const user = await UserRepository.create(payload)

    return user
  }

  public static async generateToken(auth: AuthContract, user: User) {
    return await auth.use('api').generate(user, {
      expiresIn: '1days',
    })
  }

  public static async find(request: RequestContract) {
    const payload = await request.validate(LoginValidator)

    const user = await UserRepository.findByEmail(payload.email)
    if (!user) throw new NotFoundException('Email does not exist')

    if (!(await Hash.verify(user.password, payload.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }
}
