import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import EventType from './EventType'
import Organizer from './Organizer'
import Speaker from './Speaker'
import Attendee from './Attendee'
import Session from './Session'

export default class Event extends BaseModel {
  /**
   * Relationships
   *
   * @see https://docs.adonisjs.com/guides/models/relationships
   */
  @belongsTo(() => EventType, {
    foreignKey: 'typeId',
  })
  public type: BelongsTo<typeof EventType>

  @belongsTo(() => Organizer)
  public organizer: BelongsTo<typeof Organizer>

  @manyToMany(() => Speaker)
  public speakers: ManyToMany<typeof Speaker>

  @hasMany(() => Attendee)
  public attendees: HasMany<typeof Attendee>

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  /**
   * Columns
   *
   * @see https://docs.adonisjs.com/guides/models/introduction#defining-columns
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeId: number

  // TODO : add unit price

  @column()
  public organizerId: number

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
