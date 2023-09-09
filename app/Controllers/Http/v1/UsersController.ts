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

  public async show({}: HttpContextContract) {
    return { hello: 'world' }
  }
}
