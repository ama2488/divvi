const Charities = require('../db/charities')
const express = require('express')
const cors = require('cors')

const router = express.Router()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

router.post('/all', cors(corsOptions), (req, res, next) => {
  Charities.getAll((err, charities) => {
    if (err) {
      next(err)
    } else {
      res.json(charities)
    }
  })
})

router.post('/', cors(corsOptions), (req, res, next) => {
  req.body.address = req.session.user
  Charities.addNew(req.body, (err, newCharity) => {
    if (err) {
      next(err)
    } else {
      res.json(newCharity)
    }
  })
})

router.get('/charities/:id', cors(corsOptions), (req, res, next) => {
  Charities.getOne(req.params.id, (err, charity) => {
    if (err) {
      next(err)
    } else {
      res.json(charity)
    }
  })
})

router.patch('/charities/:id', cors(corsOptions), (req, res, next) => {
  Charities.updateCharity(req.params.id, req.body, (err, charity) => {
    if (err) {
      next(err)
    } else {
      res.json(charity)
    }
  })
})

router.delete('/charities/:id', cors(corsOptions), (req, res, next) => {
  Charities.deleteCharity(req.params.id, (err, result) => {
    if (err) {
      next(err)
    } else {
      res.send(result)
    }
  })
})

module.exports = router
