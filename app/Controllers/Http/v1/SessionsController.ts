import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import SessionService from 'App/Services/SessionService'

export default class SessionsController extends BaseController {
  public async index({ request, response }: HttpContextContract) {
    const sessions = await SessionService.findAll(request)

    return this.success({
      response,
      message: 'Session type list retrieved successfully',
      data: { sessions },
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const session = await SessionService.find(request)

    return this.success({
      response,
      message: 'Session type retrieved successfully',
      data: { session },
    })
  }

  public async create({ request, response }: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {}

  public async delete({ request, response }: HttpContextContract) {}
}
