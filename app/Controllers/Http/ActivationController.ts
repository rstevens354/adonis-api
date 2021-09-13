// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'

import User from "App/Models/User"
import ConfirmationToken from "App/Models/ConfirmationToken"

export default class ActivationController {

    async activate({ params, response }) {

        try {


            const token = await ConfirmationToken.findBy('token', params.token)

            // update the user model
            if (token!==null) {
                const user =  await User.findBy('id', token.user_id)

                if (user!==null) {
                    user.activated = true
                    await user.save()

                    await ConfirmationToken.query().where('token', params.token).delete()

                    //Send welcome email
                    await Mail.sendLater((message) => {
                        message
                            .from('info@example.com')
                            .to(user.email)
                            .subject('Get Started With Chonkee')
                            .htmlView('emails/welcome', {
                                user: {
                                    first_name: user.first_name,
                                    last_name: user.last_name
                                }
                            })
                    })
                    
                    return response.status(200).json({'activated': true})
                }
            }

        } catch (error) {

            return response.status(400).json({
                status: 'error',
                message: 'There was a problem activating the token, please try again later.',
                detail: error.sqlMessage
            })

        }
        
    }

    async resend({ request, response }) {

        const resendData = request.only(['email'])

        try {

            const user = await User
                .query()
                .where('email', resendData.email)
                .andWhere('activated', 0)
                .firstOrFail()

            const confirm = await ConfirmationToken
                .query()
                .where('user_id', user.id)
                .firstOrFail()

            await Mail.sendLater((message) => {
                message
                    .from('info@example.com')
                    .to(resendData.email)
                    .subject('Activate your Account')
                    .htmlView('emails/activate', {
                        user: {
                            first_name: user.first_name,
                            last_name: user.last_name
                        },
                        url: 'http://localhost:8080/activate/' + confirm.token,
                    })
            })

            return response.json({
                'success': true,
            })

        } catch (error) {

            return response.status(400).json({
                status: 'error',
                message: 'There was a problem.'
            })

        }

    }

}
