const router = require("express").Router();

const { route } = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

router.use("/thoughts", thoughtRoutes);

router.use("/users", userRoutes);

module.exports = router;
