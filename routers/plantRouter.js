const authController = require("../controllers/authController");
const plantController = require("../controllers/plantController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").get(plantController.getAll).post(plantController.createPlant);
module.exports = router;