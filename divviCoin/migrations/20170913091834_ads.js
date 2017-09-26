
exports.up = function (knex, Promise) {
  return knex.schema.createTable('ads', (table) => {
    table.increments('id')
    table.string('address')
    table.string('company')
    table.string('website')
    table.string('video')
    table.string('image')
    table.integer('coins')
    table.timestamps(true, true)
  }).raw('ALTER SEQUENCE ads_id_seq RESTART WITH 1')
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('ads')
}
