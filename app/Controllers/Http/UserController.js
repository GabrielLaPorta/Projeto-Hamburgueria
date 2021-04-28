'use strict'

const User = use('App/Models/User');
const {
  validate
} = use('Validator')

class UserController {
  async index({
    view
  }) {
    return view.render('user.create', {
      isUpdate: false
    })
  }

  async details({
    view,
    auth
  }) {
    const userDetails = await User.findOrFail(auth.user.id)
    return view.render('user.details', {
      ...userDetails.$attributes
    })
  }

  async indexLogin({
    view,
    response,
    auth
  }) {
    try {
      await auth.check()
      return response.redirect('/home/bread')
    } catch (error) {
      console.error(error)
      return view.render('user.authenticate')
    }
  }

  async store({
    request,
    response,
    session
  }) {
    const {
      username,
      email,
      password,
      id
    } = request.all()
    let validations = {
      username: 'required|unique:users',
      email: 'required|email|unique:users,email',
      password: 'required'
    }

    if (id) {
      validations = {
        username: 'required',
        password: 'required'
      }
    }

    const validation = await validate(request.all(), validations)

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }


    if (id) {
      const user = await User.findOrFail(id)
      user.username = username
      user.password = password
      await user.save()
      session.flash({
        notification: 'Usuário salvo!'
      })

      return response.redirect('/user/details')
    } else {
      const user = new User()
      user.username = username
      user.email = email
      user.password = password
      await user.save()
      session.flash({
        notification: 'Usuário salvo!'
      })
      return response.redirect('/home')
    }
  }

  async update({
    request,
    view
  }) {
    const params = request.all()
    return view.render('user.create', {
      isUpdate: true,
      ...params
    })
  }

  async login({
    request,
    response,
    auth,
    session
  }) {
    try {
      await auth.check()
      return response.redirect('/home/bread')
    } catch (error) {
      response.redirect('/')
    }
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

    const {
      email,
      password
    } = request.all()

    await auth.remember(true).attempt(email, password)

    return response.redirect('/home')
  }

  async logoff({
    request,
    response,
    auth,
    session
  }) {
    try {
      await auth.check()
      await auth.logout()
      return response.redirect('/')
    } catch (error) {
      return response.redirect('back')
    }
  }

  async destroy({
    params,
    session,
    response
  }) {
    const user = await User.find({
      id: params.id
    })
    await user.delete()

    session.flash({
      notification: 'User deleted!'
    })

    return response.redirect('back')
  }
}

module.exports = UserController