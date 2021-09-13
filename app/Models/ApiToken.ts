import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ApiToken extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime
}
