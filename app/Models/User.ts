import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Organizer from './Organizer'
import Attendee from './Attendee'
import Speaker from './Speaker'
import Invoice from './Invoice'
import Subscription from './Subscription'

export default class User extends BaseModel {
  /**
   * Relationships
   *
   * @see https://docs.adonisjs.com/guides/models/relationships
   */
  @hasOne(() => Organizer)
  public organizer: HasOne<typeof Organizer>

  @hasOne(() => Speaker)
  public speaker: HasOne<typeof Speaker>

  @hasMany(() => Attendee)
  public attendees: HasMany<typeof Attendee>

  @hasMany(() => Invoice)
  public invoices: HasMany<typeof Invoice>

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  /**
   * Columns
   *
   * @see https://docs.adonisjs.com/guides/models/introduction#defining-columns
   */
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public emailVerified: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public loginType: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
