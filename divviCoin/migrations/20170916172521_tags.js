
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id')
    table.string('label')
    table.timestamps(true, true)
  }).raw('ALTER SEQUENCE tags_id_seq RESTART WITH 1')
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tags')
}
