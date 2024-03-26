const { Ticket } = require("../Models/Ticket.model");

// basePath
const baseRoutes = (req, res) => {
  try {
    res.status(200).json({ message: "welcome" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

//creating Ticket

const creatingTicket = async (req, res) => {
  try {
    let ticketExit = await Ticket.findOne({ owner: req.body.owner });
    if (ticketExit) {
      return res
        .status(400)
        .json({ message: "Ticket name or Id Already exit" });
    }
    let ticket = new Ticket(req.body);
    await ticket.save();

    return res.status(200).json({
      message: "Ticket created successfully",
      data: {
        // _id: ticket.id,
        owner: ticket.owner,
        typeofTicket: ticket.typeofTicket,
        event: ticket.event.ref,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//fetching ticket by ID

const fetchingTicketById = async (req, res) => {
  try {
    let ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId).populate("event");
    if (!ticket) {
      return res.status(404).json({ message: "ticket Id does not exit" });
    }
    return res
      .status(201)
      .json({ message: "TicketId is successfully fetched", data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//updating by Id
const updatingTicket = async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "updated successfully", data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// getting all ticket
const fetchAllTicket = async (req, res) => {
  try {
    let ticket = await Ticket.find({}).populate("event");
    res
      .status(200)
      .json({ message: "successfully getting all ticket", data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

// deletingTicket
const deletingTicket = async (req, res) => {
  try {
    let ticketId = req.params.id;
    const ticket = await Ticket.deleteOne({ _id: ticketId });
    res.status(200).json({ message: "successfully deleted", data: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  baseRoutes,
  creatingTicket,
  fetchingTicketById,
  updatingTicket,
  fetchAllTicket,
  deletingTicket,
};
