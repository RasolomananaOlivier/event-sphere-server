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
| new LogicalException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class LogicalException extends Exception {
  public async handle(error: this, { response }: HttpContextContract) {
    return response.badRequest({
      status: 'failed',
      code: 'E_LOGICAL_EXCEPTION',
      message: error.message,
      data: null,
    })
  }
}
