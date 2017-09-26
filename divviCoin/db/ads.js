const knex = require('./db')

function Ads () {
  return knex('ads')
}

Ads.getAll = (callback) => {
  Ads().orderBy('id').then((ads) => {
    if (!ads) {
      const error = new Error('No ads found.')
      error.status = 400
      return callback(error)
    }
    callback(undefined, ads)
  }).catch((err) => {
    console.log(err)
    callback(err)
  })
}

Ads.addNew = (data, callback) => {
  knex('ads').insert(data).returning('*').then((result) => {
    callback(undefined, result)
  }).catch((err) => {
    callback(err)
  })
}

Ads.getOne = (id, callback) => {
  Ads().where('id', id).first().returning('*').then((charity) => {
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

Ads.updateAd = (id, data, callback) => {
  knex('ads').update(data).where({ id: id }).then((charity) => {
    callback(undefined, charity)
  }).catch((err) => {
    callback(err)
  })
}

Ads.deleteAd = (id, callback) => {
  knex('ads').del().where({ id: id }).then(() => {
    callback(undefined, 'Item successfully deleted.')
  }).catch((err) => {
    callback(err)
  })
}
module.exports = Ads
