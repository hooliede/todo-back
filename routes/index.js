const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

router.use("/tasks", taskApi);
router.use("/user", userApi);

// routes 확인용
// console.log("📁 index.js 라우터 로딩됨");

module.exports = router;
// 이 파일(index.js)과 task.api.js 둘 다 module.exports = router를 사용해도 문제 없음
// 각 파일은 독립적인 모듈이라 충돌하지 않고 require() 할 때는 경로 기준으로 가져오기 때문에 다른 파일로 인식됨
// 또한 가져온 후 변수명(indexRouter, taskApi 등)은 내가 새로 정하기 때문에 이름이 겹쳐도 상관없음
