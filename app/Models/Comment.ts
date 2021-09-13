import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Comment extends BaseModel {
 
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public sourceType: string

  @column({ serializeAs: null })
  public sourceId: number

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

}
