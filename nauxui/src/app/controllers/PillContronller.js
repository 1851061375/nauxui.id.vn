const Pill = require('../models/Pill')
const Box = require('../models/Box')
const { multipleToObject, singleToObject } = require('../../ultils/mongoose')
const CONSTAN = require('../../ultils/constan')

class PillController {
  // [GET] /Pill
  async index(req, res, next) {
    try {
      const pills = await Pill.find({})
      res.json(pills)
    } catch (err) {
      console.log(err)
    }
  }

  // [GET] /Pill/view
  async indexView(req, res, next) {
    try {
      const pills = await Pill.find({})
      res.render('healing-love/pill', {
        pills: multipleToObject(pills)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // [GET] /Pill/:box/:key
  async boxKey(req, res, next) {
    let filter = {
      box: req.params.slug.split('-')[0],
      key: req.params.slug.split('-')[1],
      used: false
    }
    if (filter.box && filter.key) {
      try {
        const pill = await Pill.findOne(filter)
        res.json(pill)
      } catch (err) {
        console.log(err)
      }
    }
  }

  // [GET] /create
  async create(req, res, next) {
    try {
      const boxs = await Box.find({})
      res.render('healing-love/pill/create', {
        boxs: multipleToObject(boxs),
        keys: CONSTAN.keys
      })
    } catch (err) {
      console.log(err)
    }

  }

  // [POST] /store
  async store(req, res, next) {
    const pill = new Pill(req.body)
    try {
      await Pill.create(pill)
      // const pills = await pillByBox(pill.box)
      // if (pills.length == 0) {
      //   await Box.updateOne({ _id: pill.box }, {empty: false})
      // }
      res.json(pill)
    } catch (err) {
      console.log(err)
    }
  }

  // [GET] /edit/:id
  async edit(req, res, next) {
    try {
      const boxs = await Box.find({})
      const pill = await Pill.findById(req.params.id)
      res.render('healing-love/pill/edit', {
        pill: singleToObject(pill),
        boxs: multipleToObject(boxs),
        keys: CONSTAN.keys
      })
    } catch (err) {
      console.log(err)
    }

  }
  // [PUT] /:id
  async update(req, res, next) {
    try {
      const pill = await Pill.updateOne({ _id: req.params.id }, req.body)
      res.json(pill)
    } catch (err) {
      console.log(err)
    }
  }

  // [DELETE] /:id
  async destroy(req, res, next) {
    try {
      const pill = Pill.deleteOne({ _id: req.params.id })
      res.json(pill)
    } catch (err) {
      console.log(err)
    }
  }

  async pillByBox(box) {
    let pills = []
    try {
      pills = await Pill.find({box: box})
    } catch (err) {
      
    }
    return pills
  }

}

module.exports = new PillController();
