import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import UserService from 'App/Services/UserService'

export default class AuthController extends BaseController {
  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const user = await UserService.create(request)
      const token = await UserService.generateToken(auth, user)

      return this.success({
        response,
        data: { user, token },
        message: 'User created successfully',
      })
    } catch (error) {
      this.validationFailed({
        response,
        errors: error?.message,
      })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const user = await UserService.find(request)
    const token = await UserService.generateToken(auth, user)

    return this.success({
      response,
      data: { user, token },
      message: 'User logged successfully',
    })
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').logout()

    return this.success({
      response,
      message: 'User logged out successfully',
    })
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = auth.use('api').user

    return this.success({
      response,
      message: 'User profile fetched successfully',
      data: { user },
    })
  }
}
