const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");

// routes 확인용
console.log("📁 task.js 라우터 로딩됨");

router.post("/", authController.authenticate,taskController.createTask);
// URL과 HTTP 메서드를 매칭해주는 게 router
// 즉 어떤 URL이 오면 어떤 함수를 실행할지를 정하는 길 안내자 역할

router.get("/", taskController.getTask);

// routes 확인용
// router.get("/", (req, res) => {
//   console.log("✅ GET /api/tasks 도달함");
//   res.send("get tasks");
// });


router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);


module.exports = router;


