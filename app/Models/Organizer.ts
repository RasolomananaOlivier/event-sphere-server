import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import SocialMedia from './SocialMedia'
import User from './User'

export default class Organizer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

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
