'use strict'

const Sauces = use("App/Models/Sauces")
const {
    validate
} = use('Validator')

class SauceController {
    async index({
        view
    }) {
        const sauces = await Sauces.all()
        return view.render('burguer.sauces', {
            sauces: sauces.toJSON()
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
            const sauce = await Sauces.findOrFail(id)
            sauce.name = name
            sauce.quantity = quantity
            sauce.value = value
            await sauce.save()
        } else {
            const sauce = new Sauces()
            sauce.name = name
            sauce.quantity = quantity
            sauce.value = value
            await sauce.save()
        }

        session.flash({
            notification: 'Salvo!'
        })

        return response.redirect('sauce')
    }

    async update({
        request,
        view
    }) {
        const params = request.all()
        const sauces = await Sauces.all()
        return view.render('burguer.sauces', {
            sauces: sauces.toJSON(),
            ...params
        })
    }

    async destroy({
        params,
        session,
        response
    }) {
        const sauce = await Sauces.find(params.id)
        await sauce.delete()

        session.flash({
            notification: 'Saucea deletada!'
        })

        return response.redirect('back')
    }
}

module.exports = SauceController