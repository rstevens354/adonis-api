// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid';

import Project from "App/Models/Project";
import Status from "App/Models/Status";
import Client from "App/Models/Client";
import User from "App/Models/User";

export default class ProjectsController {

    /**
    * Handle the request to show all the projects
    */
    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const projects = await Project.query()
            .preload('client')
            .preload('status')
            .select()

        return response.status(200).json({ projects })
    }

    /**
    * Handle the request to create a project
    */
    async store ({ request, auth, response }) {

        await auth.use('api').authenticate()

        const projectData = request.only(['title', 'description', 'status_id', 'user_assigned_id', 'client_id', 'deadline'])

        const status = await Status.findBy('external_id', request.input('status_id'))
        const user_assigned = await User.findBy('external_id', request.input('user_assigned_id'))
        const client = await Client.findBy('external_id', request.input('client_id'))

        if (client!==null && user_assigned!==null && status!==null) {

            projectData.status_id = status.id
            projectData.user_assigned_id = user_assigned.id
            projectData.client_id = client.id
            projectData.external_id = uuidv4()
            projectData.user_created_id = auth.use('api').user.id
        
            const project = await Project.create(projectData)

            return response.status(201).json({ project })

        }
        
    }
    
    /**
    * Handle the request to show a project
    */
    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const project = await Project.query()
            .where('external_id', params.id)
            .preload('tasks')
            .preload('status')
            .select()
            .first()

        return response.status(200).json({ project })
    }

    /**
    * Handle the request to delete an project
    */
    async delete ({ params, response }) {

        await Project.query().where('external_id', params.id).delete()

        return response.status(200).json({
            message: 'Project deleted successfully.'
        })
    }

}
