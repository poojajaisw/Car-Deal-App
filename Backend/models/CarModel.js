const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  car_id: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness in the database
    default: function () {
      return Math.random().toString(36).substring(2, 15); // Generates a random string
    },
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  model: {
    type: String,
  },
  car_info: {
    type: Object,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
