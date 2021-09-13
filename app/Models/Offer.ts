import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import InvoiceLine from 'App/Models/InvoiceLine'

export default class Offer extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public externalId: string

  @column()
  public status: string

  @column({ serializeAs: null })
  public sourceId: number

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @hasMany(() => InvoiceLine, {
    foreignKey: 'offerId'
  })
  public invoiceLines: HasMany<typeof InvoiceLine>
  
}
