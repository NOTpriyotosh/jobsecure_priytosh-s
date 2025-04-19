const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 2000 // safeguard for character count, word count checked in route
  },
  tags: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    enum: ['INR', 'USD', 'AUD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'SGD', 'CHF', 'ZAR']
  },
  acceptedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // freelancers who accepted
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
