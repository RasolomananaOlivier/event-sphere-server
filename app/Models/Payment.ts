import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Attendee from './Attendee'

export default class Payment extends BaseModel {
  /**
   * Relationships
   *
   * @see https://docs.adonisjs.com/guides/models/relationships
   */
  @belongsTo(() => Attendee)
  public attendee: BelongsTo<typeof Attendee>

  /**
   * Columns
   *
   * @see https://docs.adonisjs.com/guides/models/introduction#defining-columns
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public attendeeId: number

  @column()
  public paymentDate: DateTime

  @column()
  public amount: number

  @column()
  public method: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
