// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from "crypto";

import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'

import { v4 as uuidv4 } from 'uuid';

import User from "App/Models/User";
import ConfirmationToken from 'App/Models/ConfirmationToken';

export default class AuthController {

    async register({request, response}) {

        const userData = request.only(['first_name', 'last_name', 'email', 'password'])

        userData.external_id = uuidv4()

        try {

            const user = await User.create(userData)

            // create confirmation token
            const confirm = await ConfirmationToken.create({
                user_id: user.id,
                token: crypto.randomBytes(100).toString('hex'),
            })

            await Mail.sendLater((message) => {
                message
                    .from('info@example.com')
                    .to(request.input('email'))
                    .subject('Activate your Account')
                    .htmlView('emails/activate', {
                        user: {
                            first_name: request.input('first_name'),
                            last_name: request.input('last_name')
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
                message: 'There was a problem creating the user, please try again later.',
                detail: error.sqlMessage
            })

        }
        
    }

    async login({ request, auth, response }) {
        
        const { email, password } = request.all()

        try {

            const user = await User
                .query()
                .where('email', email)
                .andWhere('activated', 1)
                .firstOrFail()

            if (!(await Hash.verify(user.password, password))) {
                return response.badRequest({'message': 'Invalid credentials'})
            }

            const token = await auth.use('api').generate(user)

            return response.json(
                token
            )

        } catch (error) {

            return response.status(400).json({
                status: 'error',
                message: 'There was a problem logging in.'
            })

        }

    }

}
