import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Attendee from './Attendee'
import Subscription from './Subscription'
import Payment from './Payment'

export default class Invoice extends BaseModel {
  /**
   * RELATIONSHIPS
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Attendee)
  public attendee: BelongsTo<typeof Attendee>

  @belongsTo(() => Subscription)
  public subscription: BelongsTo<typeof Subscription>

  @hasMany(() => Payment)
  public payments: HasMany<typeof Payment>

  /**
   * ATTRIBUTES
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public status: string

  @column()
  public method: string

  @column()
  public chargeDescription: number

  @column()
  public userId: number

  @column()
  public attendeeId: number

  @column()
  public subscriptionId: number

  /**
   * Billing frequency refers to how often a user is charged for a subscription.
   * It specifies the time interval between each billing cycle, such as monthly or annually.
   *
   * This information helps users understand how frequently they are charged for their subscriptions.
   */
  @column()
  public billingFrequency: string

  /**
   * Billing cycle refers to the duration of a subscription period.
   * It represents the time frame for which a user has access to a
   * subscription-based service before the next payment is due.
   *
   * This information helps determine the end date of the subscription and when the next payment is expected.
   */
  @column()
  public billingCycle: number // Number of months

  @column.dateTime()
  public paymentDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
