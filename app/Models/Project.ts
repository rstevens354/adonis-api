import Client from 'App/Models/Client'
import Status from 'App/Models/Status'
import Task from 'App/Models/Task'

import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Project extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string

  @column()
  public title: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public status_id: number

  @column({ serializeAs: null })
  public user_assigned_id: number

  @column({ serializeAs: null })
  public client_id: number

  @column({ serializeAs: null })
  public user_created_id: number

  @column()
  public deadline: DateTime

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toMillis() })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value) => value.toMillis() })
  public updatedAt: DateTime

  @hasOne(() => Client, {
    localKey: 'client_id',
    foreignKey: 'id',
  })
  public client: HasOne<typeof Client>

  @hasOne(() => Status, {
    localKey: 'status_id',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>

  @hasMany(() => Task, {
    foreignKey: 'project_id',
    onQuery(query) {
      if (!query.isRelatedSubQuery) {
        query.preload('status')
      }
    }
  })
  public tasks: HasMany<typeof Task>

}
