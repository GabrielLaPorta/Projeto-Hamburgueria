'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BurguerSchema extends Schema {
  up () {
    this.create('burguers', (table) => {
      table.increments('id')
      table.integer('bread').unsigned().notNullable()
      table.integer('salads').unsigned().notNullable()
      table.integer('beefs').unsigned().notNullable()
      table.integer('cheeses').unsigned().notNullable()
      table.integer('sauces').unsigned().notNullable()
      table.integer('users').unsigned().notNullable()
      table.float('total').notNullable()
      table.timestamps()
      table.foreign('bread').references('id').inTable('breads')
      table.foreign('salads').references('id').inTable('burguer_salads')
      table.foreign('beefs').references('id').inTable('burguer_beefs')
      table.foreign('cheeses').references('id').inTable('burguer_cheeses')
      table.foreign('sauces').references('id').inTable('burguer_sauces')
      table.foreign('users').references('id').inTable('users')
    })
  }

  down () {
    this.drop('burguers')
  }
}

module.exports = BurguerSchema
