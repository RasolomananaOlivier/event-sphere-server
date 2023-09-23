import NotFoundException from 'App/Exceptions/NotFoundException'
import Event from 'App/Models/Event'
import { CreateFeedbackPayload, UpdateFeedbackPayload } from './fedbacks.repo'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class FeedbackRepository {
  /**
   * Retrieve all feedbacks for a given event
   *
   * @param event
   * @returns Promise<Feedback[]>
   */
  public static async findAll(event: Event) {
    return await event
      .related('feedbacks')
      .query()
      .preload('attendee')
      .orderBy('created_at', 'desc')
      .exec()
  }

  /**
   * Retrieve a feedback by its id
   *
   * @param id
   * @param event
   * @returns Promise<Feedback>
   * @throws {NotFoundException}
   */
  public static async findById(id: number, event: Event) {
    const feedback = await event
      .related('feedbacks')
      .query()
      .where('id', id)
      .preload('attendee')
      .first()

    if (!feedback) {
      throw new NotFoundException('Feedback not found')
    }

    return feedback
  }

  /**
   * Create a new feedback
   *
   * @param payload
   * @param event
   * @returns Promise<Feedback>
   */
  public static async create(payload: CreateFeedbackPayload, event: Event) {
    const feedback = await event.related('feedbacks').create(payload)

    await feedback.load('attendee')

    return feedback
  }

  /**
   * Update a feedback
   *
   * @param id
   * @param attendeeId
   * @param payload
   * @param event
   * @returns Promise<Feedback>
   * @throws {NotFoundException}
   */
  public static async update(
    id: number,
    attendeeId: number,
    payload: UpdateFeedbackPayload,
    event: Event
  ) {
    const feedback = await event
      .related('feedbacks')
      .query()
      .where('id', id)
      .preload('attendee')
      .first()

    if (!feedback) {
      throw new NotFoundException('Feedback not found')
    }

    if (feedback.attendeeId !== attendeeId) {
      throw new UnauthorizedException(
        `You are not the attendee that give this feedback. Could not update the feedback`
      )
    }

    feedback.merge(payload)

    return await feedback.save()
  }

  /**
   * Delete a feedback
   *
   * @param id
   * @param attendeeId
   * @param event
   * @returns Promise<void>
   * @throws {NotFoundException}
   */
  public static async delete(id: number, attendeeId: number, event: Event) {
    const feedback = await event.related('feedbacks').query().where('id', id).first()

    if (!feedback) {
      throw new NotFoundException('Feedback not found')
    }

    if (feedback.attendeeId !== attendeeId) {
      throw new UnauthorizedException(
        `You are not the attendee that give this feedback. Could not delete the feedback`
      )
    }

    await feedback.delete()
  }
}
