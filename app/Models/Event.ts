import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EventType from './EventType'
import Organizer from './Organizer'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeId: number

  @belongsTo(() => EventType, {
    foreignKey: 'typeId',
  })
  public type: BelongsTo<typeof EventType>

  @belongsTo(() => Organizer)
  public organizer: BelongsTo<typeof Organizer>

  // TODO : add unit price

  @column()
  public organizerId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime()
  public date: DateTime

  @column()
  public location: string

  @column()
  public duration: number

  @column.dateTime()
  public deadline: DateTime

  @column()
  public maxAttendees: number

  @column()
  public price: number

  @column()
  public banner: string
}
