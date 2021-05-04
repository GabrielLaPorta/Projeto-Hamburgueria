'use strict'

const Breads = use("App/Models/Breads")
const {
    validate
} = use('Validator')

class BreadController {
    async index({
        view
    }) {
        const breads = await Breads.all()
        return view.render('burguer.breads', {
            breads: breads.toJSON()
        })
    }

    async store({
        request,
        response,
        session
    }) {
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

        const {
            name,
            quantity,
            value,
            id
        } = request.all()

        if (id) {
            const bread = await Breads.findOrFail(id)
            bread.name = name
            bread.quantity = quantity
            bread.value = value
            await bread.save()
        } else {
            const bread = new Breads()
            bread.name = name
            bread.quantity = quantity
            bread.value = value
            await bread.save()
        }

        session.flash({
            notification: 'Salvo!'
        })

        return response.redirect('bread')
    }

    async update({
        request,
        view
    }) {
        const params = request.all()
        const breads = await Breads.all()
        return view.render('burguer.breads', {
            breads: breads.toJSON(),
            ...params
        })
    }

    async destroy({
        params,
        session,
        response
    }) {
        const bread = await Breads.find(params.id)
        await bread.delete()

        session.flash({
            notification: 'Pão deletado!'
        })

        return response.redirect('back')
    }
}

module.exports = BreadController