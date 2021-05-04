'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaucesSchema extends Schema {
  up () {
    this.create('sauces', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.float('value').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sauces')
  }
}

module.exports = SaucesSchema
