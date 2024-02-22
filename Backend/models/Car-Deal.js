const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  deal_id: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return Math.random().toString(36).substring(2, 15);
    },
  },
  car_id: {
    type: String,
    required: true,
  },
  deal_info: {
    type: Object,
  },
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;

