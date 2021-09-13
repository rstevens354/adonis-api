import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasMany, HasMany, BaseModel } from '@ioc:Adonis/Lucid/Orm'

import Subscription from './Subscription'
import Team from './Team'

export default class User extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public activated: boolean

  @column({ serializeAs: null })
  public rememberToken?: string
  
  @column()
  public culture?: string

  @column()
  public cultureFormat?: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @hasMany(() => Subscription, {
    localKey: 'id',
    foreignKey: 'userId',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query.preload('plan')
      }
    }
  })
  public subscription: HasMany<typeof Subscription>

  @hasMany(() => Team, {
    localKey: 'id',
    foreignKey: 'userId'
  })
  public teams: HasMany<typeof Team>

}
