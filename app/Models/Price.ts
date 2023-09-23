import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'

export default class Price extends BaseModel {
  @belongsTo(() => Plan)
  public plan: BelongsTo<typeof Plan>

  @column({ isPrimary: true })
  public id: number

  @column()
  public planId: number

  @column()
  public amount: number

  @column()
  public currency: string

  @column()
  public interval: string

  @column()
  public features: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
