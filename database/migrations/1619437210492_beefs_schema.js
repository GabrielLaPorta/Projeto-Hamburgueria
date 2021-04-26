'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeefsSchema extends Schema {
  up () {
    this.create('beefs', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.float('value').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('beefs')
  }
}

module.exports = BeefsSchema
