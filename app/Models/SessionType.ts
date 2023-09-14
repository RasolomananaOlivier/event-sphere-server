import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Session from './Session'

export default class SessionType extends BaseModel {
  /**
   * RELATIONSHIPS
   *
   * @see https://docs.adonisjs.com/guides/database/relationships
   */
  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  /**
   * COLUMNS
   *
   * @see https://docs.adonisjs.com/guides/database/model#_columns
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
