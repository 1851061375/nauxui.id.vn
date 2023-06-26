const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pill = new Schema({
  key: { type: String, require: true },
  content: { type: String },
  order: { type: Number },
  used: { type: Boolean, default: false },
  // foreign key
  box: { type: Schema.Types.ObjectId, ref: 'Box', require: true }
}, { timestamps: true })

module.exports = mongoose.model('Pill', Pill);