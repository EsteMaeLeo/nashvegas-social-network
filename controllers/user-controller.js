const { User } = require("../models");

const userController = {
  //create new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(400).json(err));
  },

  getAllUser(req, res) {
    User.find({})
      // .populate({
      //   path: "comments",
      //   select: "-__v",
      // })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {},

  updateUser({ params, body }, res) {},

  deleteUser({ params }, res) {},
};

module.exports = userController;
