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
| new NotImplementedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotImplementedException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    return ctx.response.notImplemented({
      status: 'failed',
      code: 'E_NOT_IMPLEMENTED',
      message: error.message,
      data: null,
    })
  }
}