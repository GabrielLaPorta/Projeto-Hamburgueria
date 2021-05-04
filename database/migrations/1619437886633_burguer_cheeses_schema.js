'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BurguerCheesesSchema extends Schema {
  up () {
    this.create('burguer_cheeses', (table) => {
      table.increments('id')
      table.integer('cheese').unsigned().notNullable()
      table.timestamps()
      table.foreign('cheese').references('id').inTable('cheeses')
    })
  }

  down () {
    this.drop('burguer_cheeses')
  }
}

module.exports = BurguerCheesesSchema
