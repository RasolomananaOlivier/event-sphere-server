import SpeakerRepository from 'App/Repositories/Speakers/SpeakerRepository'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Speaker from 'App/Models/Speaker'
import LogicalException from 'App/Exceptions/LogicalException'
import CreateSpeakerValidator from 'App/Validators/Speakers/CreateSpeakerValidator'
import UpdateSpeakerValidator from 'App/Validators/Speakers/UpdateSpeakerValidator'

export default class SpeakerService {
  public static async findAll() {
    return await SpeakerRepository.findAll()
  }

  public static async find(request: RequestContract) {
    // TODO: VALIDATE ID
    const speakerId = +request.param('speakerId')

    const speaker = await SpeakerRepository.find(speakerId)

    if (!speaker) {
      throw new NotFoundException(`Speaker with id ${speakerId} could not be found`)
    }

    return speaker
  }

  public static async create(auth: AuthContract, request: RequestContract) {
    const userId = auth.user!.id
    if (await Speaker.query().where('userId', userId).first()) {
      throw new LogicalException(`You have already a speaker account`)
    }

    const payload = await request.validate(CreateSpeakerValidator)

    let pathName: string | undefined
    if (payload.photo) {
      pathName = await SpeakerRepository.addImage(payload.photo)
    }

    return await SpeakerRepository.create(auth.user!, { ...payload, photo: pathName })
  }

  public static async update(auth: AuthContract, request: RequestContract) {
    const userId = auth.user!.id
    const payload = await request.validate(UpdateSpeakerValidator)

    const existingSpeaker = await Speaker.query().where('userId', userId).first()
    if (!existingSpeaker) {
      throw new LogicalException(`You don't have a speaker account`)
    }

    const speakerId = +request.param('speakerId')
    if (existingSpeaker.id !== speakerId) {
      throw new LogicalException(`You don't have permission to update this speaker`)
    }

    const speaker = await SpeakerRepository.find(speakerId)

    if (!speaker) {
      throw new NotFoundException(`Speaker with id ${speakerId} could not be found`)
    }

    let pathName: string | undefined
    if (payload.photo) {
      if (speaker.photo) await SpeakerRepository.removeImage(speaker.photo)

      pathName = await SpeakerRepository.addImage(payload.photo)
    }

    return await SpeakerRepository.update(speaker, { ...payload, photo: pathName })
  }

  public static async delete(auth: AuthContract, request: RequestContract) {
    const userId = auth.user!.id

    const existingSpeaker = await Speaker.query().where('userId', userId).first()
    if (!existingSpeaker) {
      throw new LogicalException(`You don't have a speaker account`)
    }

    const speakerId = +request.param('speakerId')
    if (existingSpeaker.id !== speakerId) {
      throw new LogicalException(`You don't have permission to delete this speaker`)
    }

    const speaker = await SpeakerRepository.find(speakerId)

    if (!speaker) {
      throw new NotFoundException(`Speaker with id ${speakerId} could not be found`)
    }

    await SpeakerRepository.delete(speaker)
  }
}
