import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Status extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true, serializeAs: null, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime
}
