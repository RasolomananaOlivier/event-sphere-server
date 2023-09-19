import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Attendee from './Attendee'

export default class Feedback extends BaseModel {
  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>

  @belongsTo(() => Attendee)
  public attendee: BelongsTo<typeof Attendee>

  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public attendeeId: number

  @column()
  public rating: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
