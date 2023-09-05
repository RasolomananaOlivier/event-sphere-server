import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import EventRepository from 'App/Repositories/Events/EventRepository'
import CreateEventValidator from 'App/Validators/Events/CreateEventValidator'
import UpdateEventValidator from 'App/Validators/Events/UpdateEventValidator'
import Organizer from 'App/Models/Organizer'
import LogicalException from 'App/Exceptions/LogicalException'
import OrganizerRepository from 'App/Repositories/OrganizerRepository'
import EventType from 'App/Models/EventType'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class EventService {
  public static async create(auth: AuthContract, request: RequestContract) {
    const payload = await request.validate(CreateEventValidator)

    const userId = auth.user!.id

    const organizerAccount = await Organizer.findBy('userId', userId)
    if (!organizerAccount)
      throw new LogicalException(
        `You don't have an organizer account. Please create one before creating an event`
      )

    const event = await EventRepository.create({
      ...payload,
      organiserId: organizerAccount.id,
    })

    return event
  }

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

    const event = await EventRepository.update(id, payload)

    return event
  }

  public static async delete(request: RequestContract) {
    const id = request.param('id')

    await EventRepository.delete(id)
  }
}
