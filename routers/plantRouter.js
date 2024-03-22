const authController = require("../controllers/authController");
const plantController = require("../controllers/plantController");
const uploadController = require("../controllers/uploadController");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()});
router.use(authController.isLoggedIn);
router.route("/").get(plantController.getAll).post(upload.single("image"),uploadController.seedImage,plantController.createPlant);
module.exports = router;