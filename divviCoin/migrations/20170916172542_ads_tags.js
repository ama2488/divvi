exports.up = function (knex, Promise) {
  return knex.schema.createTable('ads_tags', (table) => {
    table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE')
    table.integer('ad_id').references('id').inTable('ads').onDelete('CASCADE')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('ads_tags')
}
