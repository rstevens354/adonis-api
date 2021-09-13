/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.post('/register', 'AuthController.register')
  Route.get('/activate/:token', 'ActivationController.activate')
  Route.post('/resend', 'ActivationController.resend')
  Route.post('/login', 'AuthController.login')

  Route.group(() => {

    Route.get('/self', 'AccountController.self')
    Route.get('/account', 'AccountController.index')

    Route.post('/clients', 'ClientsController.store')
    Route.get('/clients', 'ClientsController.index')
    Route.get('/clients/:id', 'ClientsController.show')
    Route.delete('/clients/:id', 'ClientsController.delete')

    Route.post('/leads', 'LeadsController.store')
    Route.get('/leads', 'LeadsController.index')
    Route.get('/leads/:id', 'LeadsController.show')
    Route.delete('/leads/:id', 'LeadsController.delete')

    Route.post('/tasks', 'TasksController.store')
    Route.get('/tasks', 'TasksController.index')
    Route.get('/tasks/:id', 'TasksController.show')
    Route.delete('/tasks/:id', 'TasksController.delete')

    Route.post('/projects', 'ProjectsController.store')
    Route.get('/projects', 'ProjectsController.index')
    Route.get('/projects/:id', 'ProjectsController.show')
    Route.delete('/projects/:id', 'ProjectsController.delete')

    Route.post('/products', 'ProductsController.store')
    Route.get('/products', 'ProductsController.index')
    Route.get('/products/:id', 'ProductsController.show')
    Route.delete('/products/:id', 'ProductsController.delete')

    Route.post('/activity', 'ActivitiesController.store')
    Route.get('/activity', 'ActivitiesController.index')
    Route.get('/activity/:id', 'ActivitiesController.show')

    Route.get('/integrations', 'IntegrationsController.index')
    Route.get('/integrations/:id', 'IntegrationsController.show')
    Route.post('/integrations', 'IntegrationsController.store')

    Route.get('/triggers/:action', 'TriggersController.index')

    Route.get('/plans', 'PlansController.index')
  
  }).middleware('auth')

}).prefix('api')