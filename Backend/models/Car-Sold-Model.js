const mongoose = require('mongoose');

const soldVehicleSchema = new mongoose.Schema({
  vehicle_id: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return Math.random().toString(36).substring(2, 15);
    },
  },
  car_id: {
    type: String, // Since in your table structure, car_id is defined as varchar
    required: true,
  },
  vehicle_info: {
    type: Object,
  },
});

const SoldVehicle = mongoose.model('SoldVehicle', soldVehicleSchema);

module.exports = SoldVehicle;
