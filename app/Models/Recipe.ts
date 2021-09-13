import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import UserInteraction from './UserInteraction'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column()
  public description: string
  
  @column()
  public scopes: string

  @column()
  public notifier: string

  @column()
  public actioner: string

  @column({serializeAs: null})
  public integrationId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => UserInteraction, {
    foreignKey: 'recipe_id',
    serializeAs: 'added'
  })
  public addedRecipes: HasOne<typeof UserInteraction>

}
