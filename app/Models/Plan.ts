import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Price from './Price'
import Subscription from './Subscription'

export default class Plan extends BaseModel {
  /**
   * RELATIONSHIPS
   */
  @hasMany(() => Price)
  public prices: HasMany<typeof Price>

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  /**
   * ATTRIBUTES
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
