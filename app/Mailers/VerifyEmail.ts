import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class VerifyEmail extends BaseMailer {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('Email verification')
      .from('herimanitraolivierr@gmail.com')
      .to(this.user.email)
      .htmlView('emails/verification', {
        fullName: `${this.user.firstName} ${this.user.lastName}`,
        verificationUrl: `http://localhost:3333/api/v1/auth/verify-email?token=${this.token}`,
      })
  }
}
