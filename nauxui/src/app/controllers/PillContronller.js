const Pill = require('../models/Pill')
const Box = require('../models/Box')
const { multipleToObject, singleToObject } = require('../../ultils/mongoose')
const CONSTAN = require('../../ultils/constan')

class PillController {
  // [GET] /Pill
  index(req, res, next) {
    Pill.find({})
      .then(pills => res.render('healing-love/pill', {
        pills: multipleToObject(pills)
      }))
      .catch(next)
  }

  // [GET] /Pill/:box/:key
  boxKey(req, res, next) {
    let filter = {
      box: req.params.slug.split('-')[0],
      key: req.params.slug.split('-')[1],
      used: false
    }
    if (filter.box && filter.key) {
      Pill.findOne(filter)
      .then(pill => res.json(pill))
      .catch(next)
    }
  }

  // [GET] /create
  async create(req, res, next) {
    const boxs = await Box.find({})
    res.render('healing-love/pill/create', {
      boxs: multipleToObject(boxs),
      keys: CONSTAN.keys
    })
  }

  // [POST] /store
  store(req, res, next) {
    const pill = new Pill(req.body)
    Pill.create(pill)
      .then(() => res.redirect('/pill'))
  }

  // [GET] /edit/:id
  async edit(req, res, next) {
    const boxs = await Box.find({})
    Pill.findById(req.params.id)
      .then(pill => res.render('healing-love/pill/edit', {
        pill: singleToObject(pill),
        boxs: multipleToObject(boxs),
        keys: CONSTAN.keys
      }))
      .catch(next)
  }
  // [PUT] /:id
  update(req, res, next) {
    Pill.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect('/pill'))
  }

  // [DELETE] /:id
  destroy(req, res, next) {
    Pill.deleteOne({ _id: req.params.id })
    .then(() => res.redirect('/pill'))
  }

}

module.exports = new PillController();
