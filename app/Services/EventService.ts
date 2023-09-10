import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { DateTime } from 'luxon'
import EventRepository from 'App/Repositories/Events/EventRepository'
import CreateEventValidator from 'App/Validators/Events/CreateEventValidator'
import UpdateEventValidator from 'App/Validators/Events/UpdateEventValidator'
import Organizer from 'App/Models/Organizer'
import LogicalException from 'App/Exceptions/LogicalException'
import OrganizerRepository from 'App/Repositories/OrganizerRepository'
import EventType from 'App/Models/EventType'
import NotFoundException from 'App/Exceptions/NotFoundException'
import NotImplementedException from 'App/Exceptions/NotImplementedException'
import { AttendanceStatus } from 'App/Models/Attendee'

export default class EventService {
  /**
   * Create a new event
   * @param auth AuthContract
   * @param request RequestContract
   * @returns Promise<Event>
   */
  public static async create(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(CreateEventValidator)

    const userId = auth.user!.id

    const organizerAccount = await Organizer.findBy('userId', userId)
    if (!organizerAccount)
      throw new LogicalException(
        `You don't have an organizer account. Please create one before creating an event`
      )

    // @ts-ignore
    const event = await EventRepository.create({
      ...payload,
      organizerId: organizerAccount.id,
    })

    return event
  }

  /**
   * Show a single event
   * @param request RequestContract
   * @returns Promise<Event>
   */
  public static async find(request: RequestContract) {
    const id = request.param('id')

    const event = await EventRepository.find(id)

    return event
  }

  public static async update(auth: AuthContract, request: RequestContract) {
    const id: number = request.param('id')

    const payload = await request.validate(UpdateEventValidator)

    const userId = auth.user!.id

    const organizerAccount = await OrganizerRepository.findBy('userId', userId)

    const existedEvent = await EventRepository.find(id)

    if (existedEvent.organizerId !== organizerAccount.id)
      throw new LogicalException(`You don't have permission to access this event`)

    const eventType = await EventType.find(payload.typeId)
    if (!eventType)
      throw new NotFoundException(`Event type with id ${payload.typeId} could not be found`)

    // @ts-ignore
    const event = await EventRepository.update(id, payload)

    return event
  }

  public static async delete(request: RequestContract) {
    const id = request.param('id')

    await EventRepository.delete(id)
  }

  public static async retrieveAttendees(request: RequestContract) {
    const id: number = request.param('id')

    const event = await EventRepository.find(id)

    await event.load('attendees', (attendee) => attendee.preload('user'))

    return event.attendees
  }

  /**
   * Register to an event
   * @param auth AuthContract
   * @param request RequestContract
   * @returns Promise<Attendee>
   */
  public static async register(auth: AuthContract, request: RequestContract) {
    const event = await EventRepository.find(+request.param('id'))
    await event.load('attendees')

    if (event.maxAttendees <= event.attendees.length - 1) {
      throw new LogicalException(`Event is already full`)
    }

    const userId = auth.user!.id

    /**
     * Check if the user is already an attendee for the event
     */
    const existedAttendee = await event.related('attendees').query().where('userId', userId).first()
    if (existedAttendee) {
      throw new LogicalException('You are already registered to this event')
    }

    if (event.price === 0) {
      const attendee = await event.related('attendees').create({
        userId,
        registrationDate: DateTime.now(),
        attendanceStatus: AttendanceStatus.REGISTERED,
      })

      return attendee
    } else {
      throw new NotImplementedException("Payment for an event hasn't been implemented yet")
    }
  }

  /**
   * Unregister from an event
   * @param auth AuthContract
   * @param request RequestContract
   * @returns Promise<void>
   */
  public static async unregister(auth: AuthContract, request: RequestContract) {
    const event = await EventRepository.find(+request.param('id'))

    const userId = auth.user!.id

    /**
     * Check if the user is already unregistered to the event
     */
    const existedAttendee = await event.related('attendees').query().where('userId', userId).first()
    if (!existedAttendee) {
      throw new LogicalException('You are not registered to this event')
    }

    if (event.price === 0) {
      await event.related('attendees').query().where('userId', userId).delete()
    } else {
      throw new NotImplementedException("Payment for an event hasn't been implemented yet")
    }
  }
}
