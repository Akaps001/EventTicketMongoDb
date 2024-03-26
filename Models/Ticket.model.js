const mongoose = require("mongoose");

const ticketSchema = {
  owner: { type: String, required: true },
  typeofTicket: { type: String },
  event: { type: mongoose.Types.ObjectId, ref: "Event" },
};

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = { Ticket };
