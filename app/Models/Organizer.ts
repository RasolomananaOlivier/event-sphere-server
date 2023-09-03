import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  hasOne,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import SocialMedia from './SocialMedia'

export default class Organizer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @hasMany(() => Event)
  public events: HasMany<typeof Event>

  @manyToMany(() => SocialMedia, {
    pivotColumns: ['url'],
    pivotTimestamps: false,
  })
  public socialMedias: ManyToMany<typeof SocialMedia>

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public logo: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public website: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
