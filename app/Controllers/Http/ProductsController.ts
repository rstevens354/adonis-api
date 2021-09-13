// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";

export default class ProductsController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()
  
        //return response.status(200).json(auth.use('api').user.id)

        const products = await Product
            .query()
            .select('*')

        return response.status(200).json({ products })
    }

}
