const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Box = new Schema({
  order: { type: Number, require: true },
  active: { type: Boolean, default: false },
  empty: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Box', Box);