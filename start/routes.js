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
/* USER */
Route.get('/', 'UserController.indexLogin')
Route.post('user', 'UserController.store').middleware('auth')
Route.get('user/create', 'UserController.index').middleware('auth')
Route.post('user/login', 'UserController.login')
Route.get('user/logoff', 'UserController.logoff').middleware('auth')
Route.delete('user/:id', 'UserController.destroy').middleware('auth')
/* BREADS */
Route.get('home/bread', 'BreadController.index').middleware('auth')
Route.post('home/bread/update', 'BreadController.update').middleware('auth')
Route.post('home/bread', 'BreadController.store').middleware('auth')
Route.delete('home/bread/:id', 'BreadController.destroy').middleware('auth')
/* BEEFS */
Route.get('home/beef', 'BeefController.index').middleware('auth')
Route.post('home/beef/update', 'BeefController.update').middleware('auth')
Route.post('home/beef', 'BeefController.store').middleware('auth')
Route.delete('home/beef/:id', 'BeefController.destroy').middleware('auth')
/* SALADS */
Route.get('home/salad', 'SaladController.index').middleware('auth')
Route.post('home/salad/update', 'SaladController.update').middleware('auth')
Route.post('home/salad', 'SaladController.store').middleware('auth')
Route.delete('home/salad/:id', 'SaladController.destroy').middleware('auth')
/* SAUCES */
Route.get('home/sauce', 'SauceController.index').middleware('auth')
Route.post('home/sauce/update', 'SauceController.update').middleware('auth')
Route.post('home/sauce', 'SauceController.store').middleware('auth')
Route.delete('home/sauce/:id', 'SauceController.destroy').middleware('auth')