const { Event } = require("../Models/Event.model");
// creating a base route

const basePath = (req, res) => {
  try {
    res.status(201).json({ message: "welcome to our platform" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
// creating Event Endpoint
const CreateEvent = async (req, res) => {
  try {
    let eventExit = await Event.findOne({ name: req.body.name });
    if (eventExit) {
      return res.status(404).json({ message: "Event already exit" });
    }
    let event = new Event(req.body);
    await Event.save();
    res.status(201).json({ message: "Event successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchById = async (req, res) => {
  try {
    let eventId = req.params.id;
    const event = await Event.findById(eventId).populate("Ticket");
    if (!event) {
      return res.status(404).json({ message: "Event Id is not available" });
    }
    return res
      .status(200)
      .json({ message: "successfully fetched", data: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// updating event

const updatingEvent = async (req, res) => {
  try {
    let eventId = req.params.eventId;
    let eventExit = await Ticket.findById(eventId);
    if (!eventExit) {
      return res.status(404).json({ message: "Event does not  exit" });
    }
    let event = await Event.findByIdAndUpdate(
      eventId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "updated successfully", data: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// fetch all the event

const fetchAllEvent = async (req, res) => {
  try {
    let events = await Event.find({});
    res
      .status(200)
      .json({ message: "successfully fetch all event", data: events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// deleting event done
const deleteEvent = async (req, res) => {
  try {
    let eventId = req.params.eventId;

    const eventExit = await Event.findById(eventId);
    if (!eventExit) {
      return res.status(400).json({ message: "Event name does not exit" });
    }
    let event = await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "succesfully deleted", data: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateEvent,
  basePath,
  fetchById,
  updatingEvent,
  fetchAllEvent,
  deleteEvent,
};
