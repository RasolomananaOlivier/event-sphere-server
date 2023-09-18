import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import Session from './Session'

export default class Speaker extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Event)
  public events: ManyToMany<typeof Event>

  @manyToMany(() => Session)
  public sessions: ManyToMany<typeof Session>

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

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
