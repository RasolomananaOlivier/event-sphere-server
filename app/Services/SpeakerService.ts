import SpeakerRepository from 'App/Repositories/Speakers/SpeakerRepository'
import type { RequestContract } from '@ioc:Adonis/Core/Request'
import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Speaker from 'App/Models/Speaker'
import LogicalException from 'App/Exceptions/LogicalException'
import CreateSpeakerValidator from 'App/Validators/Speakers/CreateSpeakerValidator'

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
}
