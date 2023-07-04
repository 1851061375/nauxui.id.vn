const Box = require('../models/Box')
const Pill = require('../models/Pill')
const { multipleToObject, singleToObject } = require('../../ultils/mongoose')

// prefix: /box
class BoxController {

  // [GET]
  async index(req, res, next) {
    try {
      const boxs = await Box.find({})
      res.json(boxs)
    } catch (err) {
      console.error(err)
    }
  }

  // [GET] /count
  async count(req, res, next) {
    try {
      const result = []
      const allBoxes = await Box.find()
      for (const box of allBoxes) {
        const tmp = {}
        const pills = await Pill.find({ box: box._id, used: false })
        const pillCounts = new Map()
        for (const pill of pills) {
          const count = pillCounts.get(pill.key) || 0
          pillCounts.set(pill.key, count + 1)
        }
        // Add keys with zero count
        for (const key of ['red', 'blue', 'yellow']) {
          if (!pillCounts.has(key)) {
            pillCounts.set(key, 0)
          }
        }
        console.log(`Box ${box._id}:`)
        tmp.box = box._id
        tmp.order = box.order
        for (const [key, count] of pillCounts) {
          tmp[key] = count
        }
        result.push(tmp)
      }
      res.json(result)
    } catch (err) {
      console.log(err)
    }

  }

  async indexView(req, res, next) {
    try {
      const boxs = await Box.find({})
      res.render('healing-love/box', {
        boxs: multipleToObject(boxs)
      })
      //res.json(boxs)
    } catch (err) {
      console.error(err)
    }
  }

  // [GET] /active
  async active(req, res, next) {
    try {
      const box = await Box.findOne({ active: req.params.active })
      res.json(box)
    } catch (err) {
      console.error(err);
    }
  }

  // [GET] /create
  create(req, res, next) {
    res.render('healing-love/box/create')
  }

  // [GET] /edit/:id
  async edit(req, res, next) {
    try {
      const box = await Box.findById(req.params.id)
      res.render('healing-love/box/edit', {
        box: singleToObject(box)
      })
    } catch (err) {
      console.error(err);
    }

  }
  // [PUT] /:id
  async update(req, res, next) {
    try {
      await Box.updateOne({ _id: req.params.id }, req.body)
      res.json(req.body)
    } catch (err) {
      console.error(err);
    }
  }

  // [POST] /store
  async store(req, res, next) {
    try {
      const box = new Box(req.body)
      await Box.create(box)
      res.json(req.box)
    }
    catch (err) {
      console.log(err)
    }
  }
}


module.exports = new BoxController()
