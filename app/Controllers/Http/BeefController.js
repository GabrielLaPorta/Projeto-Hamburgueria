'use strict'

const Beefs = use("App/Models/Beefs")
const { validate } = use('Validator')

class BeefController {
    async index ({ view }) {
        const beefs = await Beefs.all()
        return view.render('burguer.beefs', {beefs: beefs.toJSON()})
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
            const beef = await Beefs.findOrFail(id)
            beef.name = name
            beef.quantity = quantity
            beef.value = value
            await beef.save()
        } else {
            const beef = new Beefs()
            beef.name = name
            beef.quantity = quantity
            beef.value = value
            await beef.save()
        }

        session.flash({notification: 'Salvo!'})

        return response.redirect('beef')
    }

    async update ({ request, view }) {
        const params = request.all()
        const beefs = await Beefs.all()
        return view.render('burguer.beefs', {beefs: beefs.toJSON(),...params})
    }

    async destroy ({ params, session, response }) {
        const beef = await Beefs.find(params.id)
        await beef.delete()

        session.flash({ notification: 'Bife deletado!' })

        return response.redirect('back')
    }
}

module.exports = BeefController
