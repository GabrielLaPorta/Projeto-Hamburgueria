'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BreadsSchema extends Schema {
  up () {
    this.create('breads', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.float('value').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('breads')
  }
}

module.exports = BreadsSchema
