import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Appointment extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column()
  public title: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public userId: string

  @column({ serializeAs: null })
  public clientId: string

  @column()
  public startAt: DateTime

  @column()
  public endAt: DateTime

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

}
