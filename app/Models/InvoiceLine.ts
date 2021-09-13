import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class InvoiceLine extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string
  
  @column()
  public title: string
  
  @column()
  public comment: string
  
  @column()
  public price: number
  
  @column()
  public type: string
  
  @column()
  public quantity: number
  
  @column({ serializeAs: null })
  public product_id: number

  @column({ serializeAs: null })
  public invoiceId: number

  @column({ serializeAs: null })
  public offerId: number

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime
}
