const { User, Thought } = require("../models");

const userController = {
  //create new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(400).json(err));
  },

  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res
            .status(404)
            .json({ message: "❌ No User found with this id!!! ❌" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUser) => {
        if (!dbUser) {
          res
            .status(404)
            .json({ message: "❌ No User found with this id!!! ❌" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUser) => {
        if (!dbUser) {
          return res
            .status(404)
            .json({ message: "❌ No User found with this id!!! ❌" });
        }
        console.log(dbUser.username);
        res.json(dbUser);
        return Thought.deleteMany({ username: dbUser.username });
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    console.log(params.userId);
    console.log(params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res
            .status(404)
            .json({ message: "❌ No User found with this id!!! ❌" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  removeFried({ params }, res) {
    console.log(params.userId);
    console.log(params.friendId);
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res
            .status(404)
            .json({ message: "❌ No User found with this id!!! ❌" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
