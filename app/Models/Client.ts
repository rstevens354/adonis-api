import User from 'App/Models/User'
import Lead from 'App/Models/Lead'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import Contact from 'App/Models/Contact'
import Industry from 'App/Models/Industry'
import Appointment from 'App/Models/Appointment'

import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string

  @column()
  public company_name: string;

  @column()
  public vat: string;

  @column()
  public address: string;

  @column()
  public city: string;

  @column()
  public zipcode: string;

  @column({ serializeAs: null })
  public industry_id: number;

  @column({ serializeAs: null })
  public user_id: number;

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @hasMany(() => Contact, {
    foreignKey: 'client_id',
  })
  public contacts: HasMany<typeof Contact>

  @hasMany(() => Lead, {
    foreignKey: 'client_id',
  })
  public leads: HasMany<typeof Lead>

  @hasMany(() => Project, {
    foreignKey: 'client_id',
  })
  public projects: HasMany<typeof Project>

  @hasMany(() => Task, {
    foreignKey: 'client_id',
  })
  public tasks: HasMany<typeof Task>

  @hasMany(() => Appointment, {
    foreignKey: 'clientId',
  })
  public appointments: HasMany<typeof Appointment>

  @hasOne(() => Industry, {
    localKey: 'industry_id',
    foreignKey: 'id',
  })
  public industry: HasOne<typeof Industry>

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>

}
