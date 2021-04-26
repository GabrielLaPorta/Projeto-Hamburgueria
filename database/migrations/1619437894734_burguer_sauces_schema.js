'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BurguerSaucesSchema extends Schema {
  up () {
    this.create('burguer_sauces', (table) => {
      table.increments('id')
      table.integer('sauces').unsigned().notNullable()
      table.timestamps()
      table.foreign('sauces').references('id').inTable('sauces')
    })
  }

  down () {
    this.drop('burguer_sauces')
  }
}

module.exports = BurguerSaucesSchema
