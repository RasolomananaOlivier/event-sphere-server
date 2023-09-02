export default class BaseController {
  protected success(data: any, message = 'Operation successful') {
    return {
      status: 'success',
      message,
      data,
    }
  }

  protected error(data: any, message = 'Operation failed') {
    return {
      status: 'error',
      message,
      data,
    }
  }

  protected notFound(data: any = null, message = 'Resource not found') {
    return {
      status: 'not_found',
      message,
      data,
    }
  }

  protected unauthorized(data: any = null, message = 'Unauthorized') {
    return {
      status: 'unauthorized',
      message,
      data,
    }
  }

  protected validationFailed(data: any, message = 'Validation failed') {
    return {
      status: 'validation_failed',
      message,
      data,
    }
  }
}
