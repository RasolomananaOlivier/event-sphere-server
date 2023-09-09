import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class Speaker extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Event)
  public events: HasMany<typeof Event>

  @column()
  public name: string

  @column()
  public bio: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public photo: string

  @column()
  public expertise: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
