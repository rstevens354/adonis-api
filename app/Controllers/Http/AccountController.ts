import User from "App/Models/User";

export default class AccountController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const account = await User
            .query()
            .select()

        return response.status(200).json({ account })
    }

    async self ({ response, auth }) {

        await auth.use('api').authenticate()

        const self = await User.query()
            .where('id', auth.use('api').user.id)
            .preload('teams')
            .preload('subscription', (query) => {
                query
                    .groupLimit(1)
                    .groupOrderBy('subscriptions.id', 'desc')
                })
            .select()

        return response.status(200).json(self)
    }

}
