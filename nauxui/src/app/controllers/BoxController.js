const Box = require('../models/Box')
const { multipleToObject, singleToObject } = require('../../ultils/mongoose')

// prefix: /box
class BoxController {

  // [GET]
  async index(req, res, next) {
    // Box.find({})
    //   .then(boxs => res.render('healing-love/box', {
    //     boxs: multipleToObject(boxs)
    //   }))
    //   .catch(next)

    try {
      const boxs = await Box.find({})
      res.json(boxs)
    } catch (err) {
      console.error(err);
    }
    // Box.find({})
    //   .then(boxs => res.json(boxs))
    //   .catch(next)
  }

  // [GET] /active
  active(req, res, next) {
    Box.findOne({active: req.params.active})
      .then(boxs => res.json(boxs))
      .catch(next)
  }

  // [GET] /create
  create(req, res, next) {
    res.render('healing-love/box/create')
  }

  // [GET] /edit/:id
  edit(req, res, next) {
    Box.findById(req.params.id)
      .then(boxs => res.render('healing-love/box/edit', {
        box: singleToObject(boxs)
      }))
      .catch(next)
  }
  // [PUT] /:id
  update(req, res, next) {
    Box.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.json(req.body))
  }

  // [POST] /store
  store(req, res, next) {
    const box = new Box(req.body)
    Box.create(box)
      .then(() => res.redirect('/box'))
  }
}

module.exports = new BoxController()
