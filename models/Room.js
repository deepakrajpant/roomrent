// models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Room", roomSchema);
