import Speaker from 'App/Models/Speaker'
import User from 'App/Models/User'
import { CreateSpeakerPayload, UpdateSpeakerPayload } from './speaker.repo'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Drive from '@ioc:Adonis/Core/Drive'

export default class SpeakerRepository {
  public static async findAll() {
    return await Speaker.query()
      .preload('events')
      .preload('sessions')
      .preload('user', (query) => {
        query.select('email')
      })
  }

  public static async find(id: number) {
    return await Speaker.query()
      .where('id', id)
      .preload('user', (query) => {
        query.select('email')
      })
      .first()
  }

  public static async create(user: User, payload: CreateSpeakerPayload) {
    return await user.related('speaker').create(payload)
  }

  public static async update(speaker: Speaker, payload: UpdateSpeakerPayload) {
    speaker.merge(payload)

    return await speaker.save()
  }

  public static async addImage(file: MultipartFileContract) {
    await file.moveToDisk('speakers')

    return await Drive.getUrl(`speakers/${file.fileName!}`)
  }

  public static async removeImage(path: string) {
    await Drive.delete(path.split('/').slice(2).join('/'))
  }

  public static async delete(speaker: Speaker) {
    await speaker.delete()
  }
}
