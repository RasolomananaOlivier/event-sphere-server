import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import FeedbackService from 'App/Services/FeedbackService'

export default class FeedbacksController extends BaseController {
  public async index({ request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Feedbacks retrieved successfully',
      data: {
        feedbacks: await FeedbackService.findAll(request),
      },
    })
  }

  public async show({ request, response }: HttpContextContract) {
    return this.success({
      response,
      message: 'Feedback retrieved successfully',
      data: {
        feedback: await FeedbackService.find(request),
      },
    })
  }

  public async create({ request, response, auth }: HttpContextContract) {
    return this.success({
      response,
      message: 'Feedback created successfully',
      data: {
        feedback: await FeedbackService.create(request, auth),
      },
      statusCode: 201,
    })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    return this.success({
      response,
      message: 'Feedback updated successfully',
      data: {
        feedback: await FeedbackService.update(request, auth),
      },
      statusCode: 201,
    })
  }

  public async delete({ request, response, auth }: HttpContextContract) {
    await FeedbackService.delete(request, auth)

    return this.success({
      response,
      message: 'Feedback deleted successfully',
      statusCode: 201,
    })
  }
}
