'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'UserController.indexLogin')
Route.post('user', 'UserController.store')
Route.get('/user/create', 'UserController.index')
Route.post('user/login', 'UserController.login')
Route.delete('user/:id', 'UserController.destroy')