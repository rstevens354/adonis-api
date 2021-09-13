import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Plan extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public external_id: string;

  @column()
  public name: string;
 
  @column()
  public slug: string;
  
  @column({serializeAs: null})
  public gateway_id: string;

  @column()
  public price: string;
  
  @column()
  public active: number;

  @column({serializeAs: null})
  public teamsEnabled: number;
  
  @column()
  public clientsLimit: number;

  @column()
  public leadsLimit: number;

  @column()
  public tasksLimit: number;

  @column()
  public projectsLimit: number;

  @column()
  public callsLimit: number;

  @column()
  public smsLimit: number;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
