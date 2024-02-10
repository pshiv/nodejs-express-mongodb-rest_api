const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserById, getUsers, deleteUserById} = require("../controllers/auth.controller")

const verifyToken = require("../middleware/auth.middleware") 


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/user/:id", verifyToken, getUserById);
router.delete("/delete/user/:id", verifyToken, deleteUserById);
router.get("/users", verifyToken, getUsers);

module.exports = router;