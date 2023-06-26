const mongoose = require('mongoose');


const password = encodeURIComponent("4f8l0WT5uhpfJiPI")
const uri = `mongodb+srv://lapphung:${password}@healinglove.3zsltva.mongodb.net/?retryWrites=true&w=majority`

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully!')
  } catch (error) {
    console.log(error)
  }

}

module.exports = { connect }