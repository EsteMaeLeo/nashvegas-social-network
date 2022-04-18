const { Thought, User } = require("../models");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "❌ No Thought found with this id!!! ❌" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //create thought
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "❌ No Thought found with this id!!! ❌" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "❌ No Thought found with this id!!! ❌" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteThoughta({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "❌ No Thought found with this id!!! ❌" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   addReply({ params, body }, res) {
  //     Comment.findOneAndUpdate(
  //       { _id: params.commentId },
  //       { $push: { replies: body } },
  //       { new: true, runValidators: true }
  //     )
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No pizza found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },

  //   removeReply({ params }, res) {
  //     Comment.findOneAndUpdate(
  //       { _id: params.commentId },
  //       { $pull: { replies: body } },
  //       { new: true }
  //     )
  //       .then((dbPizzaData) => res.json(dbPizzaData))
  //       .catch((err) => res.json(err));
  //   },

  //   removeComment({ params }, res) {
  //     Comment.findOneAndDelete({ _id: params.commentId })
  //       .then((deletedComment) => {
  //         if (!deletedComment) {
  //           return res.status(404).json({ message: "No comment with this id!" });
  //         }
  //         return Pizza.findOneAndUpdate(
  //           { _id: params.pizzaId },
  //           { $pull: { comments: params.commentId } },
  //           { new: true }
  //         );
  //       })
  //       .then((dbPizzaData) => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: "No pizza found with this id!" });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch((err) => res.json(err));
  //   },
};
module.exports = thoughtController;
