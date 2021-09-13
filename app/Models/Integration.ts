import { DateTime } from 'luxon'
import { hasMany, HasMany, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import Recipe from './Recipe'

export default class Integration extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column()
  public name: string

  @column()
  public slug: string

  @column({serializeAs: null})
  public clientId: string

  @column({serializeAs: null})
  public clientSecret: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Recipe, {
    localKey: 'id',
    foreignKey: 'integrationId',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query.preload('addedRecipes')
      }
    }
  })
  public recipes: HasMany<typeof Recipe>

}
