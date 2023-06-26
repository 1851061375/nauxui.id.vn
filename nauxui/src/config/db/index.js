const mongoose = require('mongoose');

async function connect() {

  try {
    await mongoose.connect('mongodb://localhost/healing_love_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully!')
  } catch (error) {
    console.log(error)
  }

}

module.exports = { connect }