'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaladsSchema extends Schema {
  up () {
    this.create('salads', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.float('value').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('salads')
  }
}

module.exports = SaladsSchema
