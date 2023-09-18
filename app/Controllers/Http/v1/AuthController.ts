import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import UserService from 'App/Services/UserService'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class AuthController extends BaseController {
  public async register({ request, response, auth }: HttpContextContract) {
    const user = await UserService.create(request)
    const token = await UserService.generateToken(auth, user)

    const verificationToken = Encryption.encrypt({
      userId: user.id,
      type: 'email_verification',
    })

    await new VerifyEmail(user, verificationToken).sendLater()

    return this.success({
      response,
      data: { user, token },
      message: 'User created successfully',
    })
  }

  public async verifyEmail({ view, request }: HttpContextContract) {
    await UserService.verifyEmail(view, request)

    return await view.render('auth/email-verified')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const user = await UserService.login(request)
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

    await user?.load('organizer')
    await user?.load('speaker')

    return this.success({
      response,
      message: 'User profile fetched successfully',
      data: { user },
    })
  }

  /**
   * Redirect to Google OAuth page
   */
  public async redirectToGoogle({ ally }: HttpContextContract) {
    await ally.use('google').redirect()
  }

  /**
   * Handle Google OAuth callback
   */
  public async handleGoogleCallback({ ally, auth, response }: HttpContextContract) {
    const user = await UserService.findOrCreateByProvider(ally, 'google')

    const token = await UserService.generateToken(auth, user)

    return this.success({
      response,
      data: { user, token },
      message: 'User logged in successfully',
    })
  }
}
