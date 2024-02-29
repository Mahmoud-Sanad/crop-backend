const authController = require("../controllers/authController");
const farmerController = require("../controllers/farmerController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").post(farmerController.createFarmer).get(farmerController.getFarmers);
router.route("warnings/:id").post(farmerController.sendWarning);
router.route("/:id").get(farmerController.getFarmer).patch(farmerController.updateFarmer);
module.exports = router;