const express = require("express");
const mongoose = require("mongoose");
const server = express();
const port = 5555;
//event endpoint imported
const {
  CreateEvent,
  basePath,
  fetchById,
  updatingEvent,
  fetchAllEvent,
  deleteEvent,
} = require("./controllers/Event.controller");

//user routes imported
const {
  baseRoot,
  createUser,
  getAllUserById,
  getAllUser,
  updateUserById,
  deleteUser,
} = require("./controllers/user.controller");
//ticket endpoit imported
const {
  baseRoutes,
  creatingTicket,
  fetchingTicketById,
  updatingTicket,
  fetchAllTicket,
  deletingTicket,
} = require("./controllers/Ticket.controller");
//middlesw(are to be able to read raw json file
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/event", CreateEvent);
server.get("/", basePath);
server.get("/event/:id", fetchById);
server.get("/event", fetchAllEvent);
server.put("/event/:eventId", updatingEvent);
server.delete("/event/:eventId", deleteEvent);
//Ticket Routes

server.get("/", baseRoutes);
server.post("/ticket", creatingTicket);
server.get("/ticket/:id", fetchingTicketById);
server.put("/ticket/:ticketId", updatingTicket);
server.get("/ticket", fetchAllTicket);
server.delete("/ticket/:ticketId", deletingTicket);

//user endpoint
server.get("/", baseRoot);
server.get("/user/:userId", getAllUserById);
server.get("/", getAllUser);
server.post("/user", createUser);
server.put("/user/:userId", updateUserById);
server.delete("/user/:userId", deleteUser);
//connectiing to database
server.listen(port, async () => {
  try {
    console.log(`server connected to port ${port}`);
    await mongoose.connect("mongodb://127.0.0.1:27017/practice-app");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
});
