const authController = require("../controllers/authController");
const assumptionController = require("../controllers/assumptionController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").post(assumptionController.plantingLocation).get(assumptionController.getAssumptions);
router.route("/:id").get(assumptionController.getAssumptionById);
module.exports = router;