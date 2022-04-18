const router = require("express").Router();
const {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFried,
} = require("../../controllers/user-controller");

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFried);

//set up GET all and post at /api/user
router.route("/").get(getAllUser).post(createUser);

//set up GET one, PUT, and DELETE at /api/user/:id

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
