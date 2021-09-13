
import { v4 as uuidv4 } from 'uuid';

import Integration from 'App/Models/Integration';
import UserInteraction from 'App/Models/UserInteraction';
import Recipe from 'App/Models/Recipe';

export default class IntegrationsController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const integrations = await Integration.query()
            .select()

        return response.status(200).json({ integrations })
    }

    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const integration = await Integration.query()
            .where('external_id', params.id)
            .preload('recipes')
            .select()
            .first()

        return response.status(200).json({ integration })
    
    }

    async store ({ request, response, auth }) {

        await auth.use('api').authenticate()

        const userIntegrationData = request.only(['grant'])

        const recipe = await Recipe.findBy('external_id', request.input('recipe'))

        userIntegrationData.user_id = auth.use('api').user.id
        userIntegrationData.external_id = uuidv4()
        userIntegrationData.recipe_id = recipe.id
    
        const integration = await UserInteraction.create(userIntegrationData)
       
        return response.status(201).json({integration})
    
    }

}
