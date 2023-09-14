import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import SessionType from './SessionType'
import Event from './Event'
import Speaker from './Speaker'

export enum SessionStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  COMPLETED = 'completed',
}

export default class Session extends BaseModel {
  /**
   * RELATIONSHIPS
   *
   * @see https://docs.adonisjs.com/guides/database/relationships
   */
  @belongsTo(() => SessionType)
  public type: BelongsTo<typeof SessionType>

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

  @manyToMany(() => Speaker)
  public speakers: ManyToMany<typeof Speaker>

  @column({ isPrimary: true })
  public id: number

  @column()
  public sessionTypeId: number

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime()
  public startAt: DateTime

  @column()
  public duration: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
