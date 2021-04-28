'use strict'

const Salads = use("App/Models/Salads")
const { validate } = use('Validator')

class SaladController {
    async index ({ view }) {
        const salads = await Salads.all()
        return view.render('burguer.salads', {salads: salads.toJSON()})
    }
    
    async store ({ request, response, session }) {
        const validation = await validate(request.all(), {
            name: 'required',
            quantity: 'required',
            value: 'required'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
            .flashAll()

            return response.redirect('back')
        }

        const { name, quantity, value, id } = request.all()

        if(id) {
            const salad = await Salads.findOrFail(id)
            salad.name = name
            salad.quantity = quantity
            salad.value = value
            await salad.save()
        } else {
            const salad = new Salads()
            salad.name = name
            salad.quantity = quantity
            salad.value = value
            await salad.save()
        }

        session.flash({notification: 'Salvo!'})

        return response.redirect('salad')
    }

    async update ({ request, view }) {
        const params = request.all()
        const salads = await Salads.all()
        return view.render('burguer.salads', {salads: salads.toJSON(),...params})
    }

    async destroy ({ params, session, response }) {
        const salad = await Salads.find(params.id)
        await salad.delete()

        session.flash({ notification: 'Salada deletada!' })

        return response.redirect('back')
    }
}

module.exports = SaladController
