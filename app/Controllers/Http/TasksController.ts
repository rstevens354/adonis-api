// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid';

import Task from "App/Models/Task";
import User from "App/Models/User";
import Client from "App/Models/Client";
import Status from "App/Models/Status";
import Project from "App/Models/Project";

export default class TasksController {

    async index ({ response, auth }) {

        await auth.use('api').authenticate()

        const tasks = await Task.query()
            .preload('client')
            .preload('assigned')
            .select()

        return response.status(200).json({ tasks })
    }

    async store ({ request, auth, response }) {

        await auth.use('api').authenticate()

        const taskData = request.only(['title', 'description', 'status_id', 'user_assigned_id', 'client_id', 'project_id', 'deadline'])

        const status        = await Status.findBy('external_id', request.input('status_id'))
        const user_assigned = await User.findBy('external_id', request.input('user_assigned_id'))
        const client        = await Client.findBy('external_id', request.input('client_id'))
        const project       = await Project.findBy('external_id', request.input('project_id'))

        taskData.client_id          = client.id
        taskData.user_assigned_id   = user_assigned.id
        taskData.status_id          = status.id
        taskData.project_id         = project.id

        taskData.user_created_id = auth.use('api').user.id
        taskData.external_id = uuidv4()
    
        const task = await Task.create(taskData)
       
        return response.status(201).json({ task })
    }

    async show ({ params, response, auth }) {

        await auth.use('api').authenticate()

        const task = await Task.query()
            .where('external_id', params.id)
            .preload('comments')
            .select()
            .first()

        return response.status(200).json({ task })
    }

    /**
    * Handle the request to delete an task
    */
    async delete ({ params, response }) {

        await Task.query().where('external_id', params.id).delete()

        return response.status(200).json({
            message: 'Task deleted successfully.'
        })
    }

}
