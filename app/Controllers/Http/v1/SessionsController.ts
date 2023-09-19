import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import SessionService from 'App/Services/SessionService'

export default class SessionsController extends BaseController {
  public async index({ request, response }: HttpContextContract) {
    const sessions = await SessionService.findAll(request)

    return this.success({
      response,
      message: 'Session list retrieved successfully',
      data: { sessions },
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const session = await SessionService.find(request)

    return this.success({
      response,
      message: 'Session retrieved successfully',
      data: { session },
    })
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const session = await SessionService.create(auth, request)

    return this.success({
      response,
      message: 'Session created successfully',
      data: { session },
    })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const session = await SessionService.update(auth, request)

    return this.success({
      response,
      message: 'Session updated successfully',
      data: { session },
    })
  }

  public async delete({ auth, request, response }: HttpContextContract) {
    await SessionService.delete(auth, request)

    return this.success({
      response,
      message: 'Session deleted successfully',
      data: null,
    })
  }

  public async addSpeakers({ auth, request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Speakers added to session successfully',
      data: {
        speaker: await SessionService.addSpeakers(auth, request),
      },
    })
  }

  public async syncSpeakers({ auth, request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Speakers synced to session successfully',
      data: {
        speaker: await SessionService.syncSpeakers(auth, request),
      },
    })
  }
}
