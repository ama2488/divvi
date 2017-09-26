exports.up = function (knex, Promise) {
  return knex.schema.createTable('charities_tags', (table) => {
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE')
    table.integer('charity_id').references('id').inTable('charities').onDelete('CASCADE')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('charities_tags')
}
