import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contact extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public primary_number: string;

  @column()
  public secondary_number: string;

  @column({ serializeAs: null })
  public client_id: string

  @column({ serializeAs: null })
  public is_primary: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime
}
