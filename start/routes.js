'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.on('/home').render('home.index')
/* USER */
Route.get('/', 'UserController.indexLogin')
Route.on('user/forgot-password').render('user.forgot-password-send-email')
Route.get('user/reset-password-form','UserController.resetPasswordFromEmail')
Route.post('user/reset-password','UserController.resetPassword')
Route.get('user/create', 'UserController.index').middleware('auth')
Route.post('user', 'UserController.store').middleware('auth')
Route.get('user/update', 'UserController.update').middleware('auth')
Route.get('user/create', 'UserController.index').middleware('auth')
Route.get('user/details', 'UserController.details').middleware('auth')
Route.post('user/login', 'UserController.login')
Route.post('user/forgot-password-send-email', 'UserController.forgotPasswordSendEmail')
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