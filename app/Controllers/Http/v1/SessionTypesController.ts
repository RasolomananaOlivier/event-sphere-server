import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController'
import SessionType from 'App/Models/SessionType'
import CreateSessionTypeValidator from 'App/Validators/SessionTypes/CreateSessionTypeValidator'
import UpdateSessionTypeValidator from 'App/Validators/SessionTypes/UpdateSessionTypeValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class SessionTypesController extends BaseController {
  public async index({ response }: HttpContextContract) {
    const sessionTypes = await SessionType.all()

    return this.success({
      response,
      message: 'Session type list retrieved successfully',
      data: { sessionTypes },
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const sessionTypeId = +request.param('id')

    const sessionType = await SessionType.find(sessionTypeId)
    if (!sessionType) {
      throw new NotFoundException(`Session type with id ${sessionTypeId} not found`)
    }

    return this.success({
      response,
      message: 'Session type retrieved successfully',
      data: { sessionType },
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateSessionTypeValidator)

    const sessionType = await SessionType.create(payload)

    return this.success({
      response,
      message: 'Session type created successfully',
      data: { sessionType },
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateSessionTypeValidator)

    const sessionTypeId = +request.param('id')

    const sessionType = await SessionType.find(sessionTypeId)
    if (!sessionType) {
      throw new NotFoundException(`Session type with id ${sessionTypeId} not found`)
    }

    sessionType.merge(payload)
    await sessionType.save()

    return this.success({
      response,
      message: 'Session type updated successfully',
      data: { sessionType },
    })
  }

  public async delete({ request, response }: HttpContextContract) {
    const sessionTypeId = +request.param('id')

    const sessionType = await SessionType.find(sessionTypeId)
    if (!sessionType) {
      throw new NotFoundException(`Session type with id ${sessionTypeId} not found`)
    }

    await sessionType.delete()

    return this.success({
      response,
      message: 'Session type deleted successfully',
      data: { sessionType },
    })
  }
}
