const Ads = require('../db/ads')
const express = require('express')
const cors = require('cors')

const router = express.Router()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

router.get('/ads', cors(corsOptions), (req, res, next) => {
  Ads.getAll((err, ads) => {
    if (err) {
      next(err)
    } else {
      res.json(ads)
    }
  })
})

router.post('/ads', cors(corsOptions), (req, res, next) => {
  req.body.address = req.session
  Ads.addNew(req.body, (err, ad) => {
    if (err) {
      next(err)
    } else {
      res.json(ad)
    }
  })
})

router.get('/ads/:id', cors(corsOptions), (req, res, next) => {
  Ads.getOne(req.params.id, (err, ad) => {
    if (err) {
      next(err)
    } else {
      res.json(ad)
    }
  })
})

router.patch('/ads/:id', cors(corsOptions), (req, res, next) => {
  Ads.updateAd(req.params.id, req.body, (err, ad) => {
    if (err) {
      next(err)
    } else {
      res.json(ad)
    }
  })
})

router.delete('/ads/:id', cors(corsOptions), (req, res, next) => {
  Ads.deleteAd(req.params.id, (err, ad) => {
    if (err) {
      next(err)
    } else {
      res.send(ad)
    }
  })
})

module.exports = router
