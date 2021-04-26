'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BurguerBeefsSchema extends Schema {
  up () {
    this.create('burguer_beefs', (table) => {
      table.increments('id')
      table.integer('beef').unsigned().notNullable()
      table.timestamps()
      table.foreign('beef').references('id').inTable('beefs')
    })
  }

  down () {
    this.drop('burguer_beefs')
  }
}

module.exports = BurguerBeefsSchema
