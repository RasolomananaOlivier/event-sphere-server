import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import FeedbackRepository from 'App/Repositories/Feedbacks/FeedbackRepository'

export default class FeedbackService {
  public static async findAll(request: RequestContract) {
    const event = await EventRepository.find(+request.param('eventId'))

    return await FeedbackRepository.findAll(event)
  }

  public static async find(request: RequestContract) {
    const event = await EventRepository.find(+request.param('eventId'))

    return await FeedbackRepository.findById(+request.param('feedbackId'), event)
  }

  public static async create(auth: AuthContract, request: RequestContract) {}

  public static async update(auth: AuthContract, request: RequestContract) {}

  public static async delete(auth: AuthContract, request: RequestContract) {}
}
