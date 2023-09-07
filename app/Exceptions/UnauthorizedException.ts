import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnauthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnauthorizedException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    return ctx.response.unauthorized({
      status: 'failed',
      code: 'E_UNAUTHORIZED',
      message: error.message,
      data: null,
    })
  }
}