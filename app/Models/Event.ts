import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Event extends BaseModel {

    @column({ isPrimary: true })
    public id: number;

    @column()
    public title: string;

    @column()
    public location: string;

    @column()
    public price: number;

    @column.dateTime({ serialize: (value) => value.toMillis() })
    public start_date: DateTime;

    @column.dateTime({ serialize: (value) => value.toMillis() })
    public end_date: DateTime;

}
