/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    /**
     * Self handle the validation exception
     */
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.unprocessableEntity({
        status: 'failed',
        code: error.code,
        message: 'Validation failure',
        errors: error.messages.errors,
        data: null,
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.unauthorized({
        status: 'failed',
        code: error.code,
        message: 'Unauthorized access',
        data: null,
      })
    }

    return super.handle(error, ctx)
  }
}
