import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Activity extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column({ serializeAs: null })
  public logName: string

  @column({ serializeAs: null })
  public causerId: string
  
  @column({ serializeAs: null })
  public causerType: string
  
  @column()
  public text: string

  @column({ serializeAs: null })
  public sourceId: string
  
  @column({ serializeAs: null })
  public sourceType: string

  @column({ serializeAs: null })
  public ipAddress: string

  @column()
  public properties: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

}
