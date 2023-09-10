import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import UserService from 'App/Services/UserService'

export default class UsersController extends BaseController {
  public async index({ response }: HttpContextContract) {
    const users = await UserService.findAll()

    return this.success({
      response,
      message: 'Users fetched successfully',
      data: { users },
    })
  }

  public async show({ response, request }: HttpContextContract) {
    const user = await UserService.find(request)

    return this.success({
      response,
      message: 'Users fetched successfully',
      data: { user },
    })
  }

  public async delete({ auth, response, request }: HttpContextContract) {
    const user = await UserService.delete(auth, request)

    return this.success({
      response,
      message: 'User deleted successfully',
      data: { user },
    })
  }

  public async update({ auth, response, request }: HttpContextContract) {
    const user = await UserService.update(auth, request)

    return this.success({
      response,
      message: 'User updated successfully',
      data: { user },
    })
  }
}
