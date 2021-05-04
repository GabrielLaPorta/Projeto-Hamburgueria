'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CheesesSchema extends Schema {
  up () {
    this.create('cheeses', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.float('value').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cheeses')
  }
}

module.exports = CheesesSchema
