import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Team extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column()
  public externalId: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime
}
