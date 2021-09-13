import Plan from "App/Models/Plan";

export default class PlansController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const plans = await Plan.query()
            .select()

       return response.status(200).json({ plans })

    }

}
