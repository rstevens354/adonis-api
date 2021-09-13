
import { v4 as uuidv4 } from 'uuid';

import Client from "App/Models/Client";
import Contact from "App/Models/Contact";
import Industry from "App/Models/Industry";

import UserInteraction from 'App/Models/UserInteraction';

export default class ClientsController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const clients = await Client.query()
            .where('user_id', auth.use('api').user.id)
            .preload('industry')
            .select()

        const triggers = await UserInteraction.query()
            .where('user_id', auth.use('api').user.id)
            .preload('recipe')
            .select()

        // Convert the stored JSON.stringified data back to gool 'ol JSON 
        triggers.forEach(function (triggerItem) {
            triggerItem.grant = JSON.parse(triggerItem.grant);
        });

        return response.status(200).json({ clients, triggers })
    }

    async store ({ request, auth, response }) {

        await auth.use('api').authenticate()

        const clientData = request.only(['company_name', 'vat', 'address', 'zipcode', 'city', 'industry_id'])

        const industry = await Industry.findBy('external_id', request.input('industry_id'))

        if (industry!==null) {

            clientData.industry_id = industry.id
            clientData.user_id = auth.use('api').user.id
            clientData.external_id = uuidv4()
        
            const client = await Client.create(clientData)

            const contactData = request.only(['name', 'email', 'primary_number', 'secondary_number'])

            contactData.client_id = client.id
            contactData.external_id = uuidv4()
        
            const contact = await Contact.create(contactData)
        
            return response.status(201).json({ client, contact })

        }
        
    }

    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const client = await Client.query()
            .where('external_id', params.id)
            .where('user_id', auth.use('api').user.id)
            .preload('appointments')
            .preload('contacts')
            .preload('projects')
            .preload('leads')
            .preload('tasks')
            .preload('industry')
            .preload('user')
            .select()
            .first()

        return response.status(200).json({ client })
    }

    /**
    * Handle the request to delete an event
    */
    async delete ({ params, response }) {

        await Client.query().where('external_id', params.id).delete()

        return response.status(200).json({
            message: 'Client deleted successfully.'
        })
    }

}
