const router = require('express').Router();
const userController = require("../controllers/userController");

const adminCheck = require("../middleware/adminCheck");
const authJWT = require('../middleware/authJWT');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.put("/:id/update", authJWT, userController.updateUser);
router.put("/:id/update", adminCheck, userController.updateAdmin);

// router.get("/:id", checkJWT , userController.getUser);
router.get("/:id/users", adminCheck, userController.getUsersAdmin);

router.delete("/:id/delete", adminCheck, userController.deleteUser); 


module.exports = router