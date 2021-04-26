'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/BaseModel')} */
const BaseModel = use('BaseModel')

class Breads extends BaseModel {
    static get primaryKey () {
        return 'id'
    }

    static get table () {
        return 'breads'
    }
}

module.exports = Breads
