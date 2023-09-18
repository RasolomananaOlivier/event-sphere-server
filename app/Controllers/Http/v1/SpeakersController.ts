import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import SpeakerService from 'App/Services/SpeakerService'

export default class SpeakersController extends BaseController {
  public async index({ response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Speaker list retrieved successfully',
      data: {
        speakers: await SpeakerService.findAll(),
      },
    })
  }

  public async show({ request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Speaker retrieved successfully',
      data: {
        speaker: await SpeakerService.find(request),
      },
    })
  }

  public async create({ auth, request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Speaker list retrieved successfully',
      data: {
        speaker: await SpeakerService.create(auth, request),
      },
    })
  }

  public async update() {}

  public async delete() {}
}
