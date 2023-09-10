import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import UserRepository from 'App/Repositories/Users/UserRepository'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Hash from '@ioc:Adonis/Core/Hash'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { AllyContract } from '@ioc:Adonis/Addons/Ally'

export default class UserService {
  public static async create(request: RequestContract) {
    const payload = await request.validate(RegisterValidator)

    const existingUser = await UserRepository.findByEmail(payload.email)

    if (existingUser) throw new Error('Email already exists')

    const user = await UserRepository.create(payload)

    return user
  }

  public static async findAll() {
    const users = await UserRepository.findAll()
    return users
  }

  /**
   * Find or create a user
   */
  public static async findOrCreateByProvider(
    ally: AllyContract,
    providerName: 'google' | 'facebook' | 'linkedin'
  ) {
    const provider = ally.use(providerName)

    /**
     * User has explicitly denied the login request
     */
    if (provider.accessDenied()) {
      throw new Error('Access was denied')
    }

    /**
     * Unable to verify the CSRF state
     */
    if (provider.stateMisMatch()) {
      throw new Error('Request expired. Retry again')
    }

    /**
     * There was an unknown error during the redirect
     */
    if (provider.hasError()) {
      throw new Error('Unable to process request ' + provider.getError())
    }

    const providerUser = await provider.user()

    const user = await UserRepository.findOrCreate(
      {
        email: providerUser.email,
      },
      {
        email: providerUser.email,
        firstName: providerUser.name?.split(' ')[0],
        lastName: providerUser.name?.split(' ').slice(1).join(' '),
        loginType: providerName,
      }
    )

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

  public static async update(request: RequestContract) {}

  public static async delete(request: RequestContract) {}
}
