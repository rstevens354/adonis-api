// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid';

import Lead from "App/Models/Lead";
import Client from "App/Models/Client";
import User from "App/Models/User";
import Status from "App/Models/Status";
export default class LeadsController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const leads = await Lead.query()
            .where('user_assigned_id', auth.use('api').user.id)
            .preload('assigned')
            .preload('created_by')
            .select()

        return response.status(200).json({ leads })
    }

    async store ({ request, auth, response }) {

        await auth.use('api').authenticate()

        const leadData = request.only(['title', 'description', 'status_id', 'user_assigned_id', 'client_id', 'deadline'])

        const client = await Client.findBy('external_id', request.input('client_id'))
        const user_assigned = await User.findBy('external_id', request.input('user_assigned_id'))
        const status = await Status.findBy('external_id', request.input('status_id'))

        if (client!==null && user_assigned!==null && status!==null) {

            leadData.client_id = client.id
            leadData.user_assigned_id = user_assigned.id
            leadData.status_id = status.id
            leadData.user_created_id = auth.use('api').user.id
            leadData.external_id = uuidv4()
        
            const lead = await Lead.create(leadData)
        
            return response.status(201).json({ lead })

        }

    }

    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const lead = await Lead.query()
            
            .where('external_id', params.id)
            .preload('comments')
            .preload('offers')
            .preload('activities')
            .withCount('activities')
            .select()
            .first()

        return response.status(200).json({ lead })
    }

    /**
    * Handle the request to delete an lead
    */
    async delete ({ params, response }) {

        await Lead.query().where('external_id', params.id).delete()

        return response.status(200).json({
            message: 'Lead deleted successfully.'
        })
    }

}
