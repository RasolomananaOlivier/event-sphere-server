import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import User from './User'
import Payment from './Payment'
import Feedback from './Feedback'

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  REGISTERED = 'registered',
}

export default class Attendee extends BaseModel {
  /**
   * Relationships
   *
   * @see https://docs.adonisjs.com/guides/models/relationships
   */
  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => Payment)
  public payment: HasOne<typeof Payment>

  @hasMany(() => Feedback)
  public feedbacks: HasMany<typeof Feedback>

  /**
   * Columns
   *
   * @see https://docs.adonisjs.com/guides/models/introduction#defining-columns
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public userId: number

  @column.dateTime()
  public registrationDate: DateTime

  @column()
  public attendanceStatus: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
