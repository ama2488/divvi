
exports.up = function (knex, Promise) {
  return knex.schema.createTable('charities', (table) => {
    table.increments('id')
    table.string('address')
    table.string('name')
    table.string('location')
    table.string('EIN')
    table.string('website')
    table.text('bio')
    table.string('image')
    table.timestamps(true, true)
  }).raw('ALTER SEQUENCE charities_id_seq RESTART WITH 1')
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('charities')
}
