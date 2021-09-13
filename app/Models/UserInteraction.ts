import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Recipe from 'App/Models/Recipe'

export default class UserInteraction extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public user_id: number

  @column()
  public external_id: string

  @column()
  public grant: string

  @column({ serializeAs: null })
  public recipe_id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => Recipe, {
    localKey: 'recipe_id',
    foreignKey: 'id',
  })
  public recipe: HasOne<typeof Recipe>
  
}