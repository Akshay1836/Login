const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  allDetails,
} = require("../controllers/authController");

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/register", allDetails);

module.exports = router;
