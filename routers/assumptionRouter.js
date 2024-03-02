const authController = require("../controllers/authController");
const assumptionController = require("../controllers/assumptionController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").post(assumptionController.plantingLocation)
router.route("/:id").get(assumptionController.getAssumptionById);
module.exports = router;