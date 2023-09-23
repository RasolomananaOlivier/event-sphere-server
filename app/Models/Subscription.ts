import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Plan from './Plan'
import Invoice from './Invoice'

export default class Subscription extends BaseModel {
  /**
   * RELATIONSHIPS
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Plan)
  public plan: BelongsTo<typeof Plan>

  @hasMany(() => Invoice)
  public invoices: HasMany<typeof Invoice>

  /**
   * ATTRIBUTES
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public planId: number

  @column()
  public stripeId: string

  @column()
  public status: string

  @column()
  public currentPeriodStart: DateTime

  @column()
  public currentPeriodEnd: DateTime

  @column()
  public cancelledAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
