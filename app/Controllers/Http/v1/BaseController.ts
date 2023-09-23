import type { ResponseContract } from '@ioc:Adonis/Core/Response'

interface ResponseParms {
  response: ResponseContract
  data?: any
  statusCode?: number
  message?: string
  errors?: any
}

export default class BaseController {
  protected success(args: ResponseParms) {
    const { response, data = null, message = 'Operation successful', statusCode = 200 } = args

    response.status(statusCode).send({
      status: 'success',
      message,
      data,
    })
  }

  protected error(args: ResponseParms) {
    const { response, data, message, statusCode = 500, errors } = args

    response.status(statusCode).send({
      status: 'error',
      message,
      data,
      errors,
    })
  }

  protected notFound(args: ResponseParms) {
    const { response, message } = args

    response.status(404).send({
      status: 'not_found',
      message,
      data: null,
    })
  }

  protected unauthorized(args: ResponseParms) {
    const { response, message } = args

    response.status(401).send({
      status: 'unauthorized',
      message,
      data: null,
    })
  }

  protected validationFailed(args: ResponseParms) {
    const { response, message, errors } = args

    response.status(422).send({
      status: 'validation_failed',
      message,
      errors,
      data: null,
    })
  }
}
