import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public external_id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public number: number

  @column()
  public default_type: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

}
