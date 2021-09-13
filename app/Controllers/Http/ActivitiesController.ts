// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid';

import Activity from "App/Models/Activity";

export default class ActivitiesController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const activities = await Activity.query()
            .where('causer_id', auth.use('api').user.id)
            .select()

        return response.status(200).json({ activities })
    }

    async store ({ request, auth, response }) {

        await auth.use('api').authenticate()

        const activityData = request.only(['text', 'causer_type', 'source_type', 'source_id'])

        activityData.external_id = uuidv4()
        activityData.causer_id = auth.use('api').user.id
        activityData.logName = request.input('source_type')
        activityData.properties = '{"action":"' + request.input('action') + '"}'
    
        const activity = await Activity.create(activityData)

        return response.status(201).json({ activity })
    }

    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const activities = await Activity.query()
            .where('source_id', params.id)
            .where('causer_id', auth.use('api').user.id)
            .select()

        return response.status(200).json({ activities })
    }

}
