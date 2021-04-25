'use strict'
const User = use('App/Models/User');
const { validate } = use('Validator')

class UserController {
  async index ({ view }) {
    return view.render('user.create')
  }

  async indexLogin ({ view }) {
    return view.render('user.authenticate')
  }

  async store ({ request, response, session }) {
    // validate form input
    const validation = await validate(request.all(), {
      username: 'required|unique:users',
      email: 'required|email|unique:users,email',
      password: 'required'
    })

    // show error messages upon validation fail
    if (validation.fails()) {
      console.log(validation.messages())
      session.withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()

    session.flash({ notification: 'User added!' })

    return response.redirect('back')
  }

  async login ({ request, response, session }) {
    const validation = await validate(request.all(), {
      email: 'required|email',
      password: 'required'
    })

    if (validation.fails()) {
      console.log(validation.messages())
      session.withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }
    const user = await User.query().where({email: request.input('email'), password: request.input('password')})

    if (user){
      session.put('email', request.input('email'))
      return response.redirect('/home')
    }

    return response.redirect('back')
  }

  async destroy ({ params, session, response }) {
    const user = await User.find({email: params.email})
    await user.delete()

    // Fash success message to session
    session.flash({ notification: 'User deleted!' })

    return response.redirect('back')
  }
}

module.exports = UserController
