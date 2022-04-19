const router = require("express").Router();
const {
  addThought,
  getAllThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  //   removeComment,
  //   addReply,
  //   removeReply,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThought).post(addThought);

//router.route("/:userId").post(addThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);
router.route("/:thoughtId/reactions/:idReaction").delete(removeReaction);
// router.route("/:pizzaId/:commentId").delete(removeComment);

// router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
