const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// 1. 회원가입 endpoint
// 새로운 유저 정보를 만드는 거고 front에서 먼저 데이터가 온다
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);

module.exports = router;
