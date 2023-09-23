import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import FeedbackRepository from 'App/Repositories/Feedbacks/FeedbackRepository'
import CreateFeedbackValidator from 'App/Validators/Feedbacks/CreateFeedbackValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import UpdateFeedbackValidator from 'App/Validators/Feedbacks/UpdateFeedbackValidator'

export default class FeedbackService {
  public static async findAll(request: RequestContract) {
    const event = await EventRepository.find(+request.param('eventId'))

    return await FeedbackRepository.findAll(event)
  }

  public static async find(request: RequestContract) {
    const event = await EventRepository.find(+request.param('eventId'))

    return await FeedbackRepository.findById(+request.param('feedbackId'), event)
  }

  public static async create(request: RequestContract, auth: AuthContract) {
    const payload = await request.validate(CreateFeedbackValidator)

    const userId = auth.user?.id!

    const event = await EventRepository.find(+request.param('eventId'))

    const attendee = await event.related('attendees').query().where('userId', userId).first()
    if (!attendee) {
      throw new UnauthorizedException(
        `You are not an attendee for this event.Could not give a feedback`
      )
    }

    return await FeedbackRepository.create(
      {
        ...payload,
        attendeeId: attendee.id,
      },
      event
    )
  }

  public static async update(request: RequestContract, auth: AuthContract) {
    const payload = await request.validate(UpdateFeedbackValidator)

    const userId = auth.user?.id!

    const event = await EventRepository.find(+request.param('eventId'))

    const attendee = await event.related('attendees').query().where('userId', userId).first()
    if (!attendee) {
      throw new UnauthorizedException(
        `You are not an attendee for this event.Could not update a feedback`
      )
    }

    return await FeedbackRepository.update(
      +request.param('feedbackId'),
      attendee.id,
      payload,
      event
    )
  }

  public static async delete(request: RequestContract, auth: AuthContract) {
    const userId = auth.user?.id!

    const event = await EventRepository.find(+request.param('eventId'))

    const attendee = await event.related('attendees').query().where('userId', userId).first()
    if (!attendee) {
      throw new UnauthorizedException(
        `You are not an attendee for this event.Could not delete a feedback`
      )
    }

    await FeedbackRepository.delete(+request.param('feedbackId'), attendee.id, event)
  }
}
