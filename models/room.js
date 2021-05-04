const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;