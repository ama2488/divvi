const knex = require('./db')

function Charities () {
  return knex('charities')
}

Charities.getAll = (callback) => {
  Charities().orderBy('id').then((charities) => {
    if (!charities) {
      const error = new Error('No charities found.')
      error.status = 400
      return callback(error)
    }
    callback(undefined, charities)
  }).catch((err) => {
    console.log(err)
    callback(err)
  })
}

Charities.addNew = (data, callback) => {
  knex('charities').insert(data).returning('*').then((result) => {
    callback(undefined, result)
  }).catch((err) => {
    callback(err)
  })
}

Charities.getOne = (id, callback) => {
  Charities().where('id', id).first().returning('*').then((charity) => {
    if (!charity) {
      const error = new Error('Item does not exist.')
      error.status = 400
      return callback(error)
    }
    callback(undefined, charity)
  }).catch((err) => {
    callback(err)
  })
}

Charities.updateCharity = (id, data, callback) => {
  knex('charities').update(data).where({ id: id }).then((charity) => {
    callback(undefined, charity)
  }).catch((err) => {
    callback(err)
  })
}

Charities.deleteCharity = (id, callback) => {
  knex('charities').del().where({ id: id }).then(() => {
    callback(undefined, 'Item successfully deleted.')
  }).catch((err) => {
    callback(err)
  })
}
module.exports = Charities
