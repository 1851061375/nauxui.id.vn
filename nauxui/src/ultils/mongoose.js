module.exports = {
  multipleToObject: function(mongooses) {
    return mongooses.map(mgs => mgs.toObject())
  },
  singleToObject: function(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
  }
}