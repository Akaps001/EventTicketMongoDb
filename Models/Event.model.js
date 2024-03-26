const mongoose = require("mongoose");

const eventSChema = {
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
};

const Event = mongoose.model("Event", eventSChema);
module.exports = { Event };
