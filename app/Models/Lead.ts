import User from 'App/Models/User'
import Comment from 'App/Models/Comment'
import Offer from 'App/Models/Offer'
import Activity from 'App/Models/Activity'

import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Lead extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string

  @column()
  public title: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public status_id: number

  @column({ serializeAs: null })
  public client_id: number

  @column({ serializeAs: null })
  public user_created_id: number

  @column({ serializeAs: null })
  public user_assigned_id: number

  @column()
  public deadline: DateTime

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'user_assigned_id',
    foreignKey: 'id',
  })
  public assigned: HasOne<typeof User>

  @hasOne(() => User, {
    localKey: 'user_created_id',
    foreignKey: 'id',
  })
  public created_by: HasOne<typeof User>

  @hasMany(() => Comment, {
    foreignKey: 'sourceId',
    onQuery(query) {
      query.where('sourceType', 'lead')
    }
  })
  public comments: HasMany<typeof Comment>

  @hasMany(() => Offer, {
    foreignKey: 'sourceId',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query.preload('invoiceLines')
      }
    }
  })
  public offers: HasMany<typeof Offer>

  @hasMany(() => Activity, {
    foreignKey: 'sourceId'
  })
  public activities: HasMany<typeof Activity>

}
