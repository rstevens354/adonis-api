import UserInteraction from 'App/Models/UserInteraction';

export default class TriggersController {

    async index ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const triggers = await UserInteraction.query()
            .preload('recipe')
            .where('user_id', auth.use('api').user.id)
            .select()

        triggers.forEach(function (triggerItem) {
            triggerItem.grant = JSON.parse(triggerItem.grant);
        });

       return response.status(200).json({ triggers })

    }

}
