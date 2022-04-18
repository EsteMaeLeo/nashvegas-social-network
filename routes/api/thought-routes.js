const router = require("express").Router();
const {
  addThought,
  getAllThought,
  getThoughtById,
  updateThought,
  //   removeComment,
  //   addReply,
  //   removeReply,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought);

router.route("/:userId").post(addThought);

router.route("/:id").get(getThoughtById).put(updateThought);

// router.route("/:pizzaId/:commentId").delete(removeComment);

// router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
