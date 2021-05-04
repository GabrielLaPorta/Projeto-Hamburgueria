'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BurguerSaladsSchema extends Schema {
  up () {
    this.create('burguer_salads', (table) => {
      table.increments('id')
      table.integer('salad').unsigned().notNullable()
      table.timestamps()
      table.foreign('salad').references('id').inTable('salads')
    })
  }

  down () {
    this.drop('burguer_salads')
  }
}

module.exports = BurguerSaladsSchema
