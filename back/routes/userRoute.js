const router = require('express').Router();
const userController = require("../controllers/userController");

const adminCheck = require("../middleware/adminCheck");
const authJWT = require('../middleware/authJWT');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.put("/:id/update", authJWT, userController.updateUser);

router.get("/", authJWT , userController.getAllUsers);

router.get("/:id", authJWT , userController.getUser);

router.delete("/:id/delete", authJWT, userController.deleteUser); 

module.exports = router