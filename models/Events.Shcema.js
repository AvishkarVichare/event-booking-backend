const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventHost: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventBranch: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventPrice: {
    type: Number,
    required: true
  },
  eventVenue: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  eventMode: {
    type: String,
    required: true
  },
  bookedUsers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    filename: String,
    data: Buffer
  }
},{
  timestamps:true
});

module.exports = mongoose.model('Event', eventSchema);
