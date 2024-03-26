const { User } = require("../Models/user.model");

// baseRoot

const baseRoot = async (req, res) => {
  try {
    res.status(200).json({ message: "User controller" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

//creat user

const createUser = async (req, res) => {
  try {
    let userExit = await User.findOne({ fullname: req.body.fullname });
    if (userExit) {
      return res
        .status(201)
        .json({ message: "User profile  or Id already created" });
    }
    let user = new User(req.body);
    await user.save();
    return res.status(200).json({ message: "User Created Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get all user by id
const getAllUserById = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(404).json({ message: "User Id doesn not exit" });
    }
    return res
      .status(201)
      .json({ message: "User Id successfully fetched", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//updating the user by id
const updateUserById = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await User.findByIdAndDelete(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "user sucessfully updated", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//get all user

const getAllUser = async (req, res) => {
  try {
    let user = await User.find({});
    res
      .status(200)
      .json({ message: " All User fetched successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//deleting user by id
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    userExit = await User.findById(userId);
    if (!userExit) {
      return res.status(404).json({ message: "couldnt find userID" });
    }
    let user = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "User sucessfully deleted ", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  baseRoot,
  createUser,
  getAllUserById,
  getAllUser,
  deleteUser,
  updateUserById,
};
