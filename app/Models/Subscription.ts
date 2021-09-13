import { DateTime } from 'luxon'
import { hasOne, HasOne, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import Plan from './Plan'

export default class Subscription extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @column({ serializeAs: null })
  public stripe_plan: string

  @column({ serializeAs: null })
  public name: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @hasOne(() => Plan, {
    localKey: 'stripe_plan',
    foreignKey: 'gateway_id',
  })
  public plan: HasOne<typeof Plan>

}
