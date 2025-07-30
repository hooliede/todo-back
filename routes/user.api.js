// express의 router를 사용할 거라서 express 가져오고, express.Router로 router 가져오기

const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// 1. 회원가입 endpoint 만들기
router.post("/", userController.createUser);                
router.post("/login", userController.loginWithEmail);       

// 토큰을 통해 유저 ID 빼내고 -> 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authController.authenticate,userController.getUser);

module.exports = router;


//   HTTP 메서드와 라우터 정리
// - 프론트엔드가 어떤 HTTP 메서드(POST, GET 등)로 요청을 보내는지에 따라
//   백엔드에서도 같은 메서드로 router.xxx()를 만들어야 한다
// - 이유: 서버는 'HTTP 메서드 + URL' 조합으로 요청을 구분하기 때문이다
//   ➜ 프론트 POST → 백엔드 router.post()
//   ➜ 프론트 GET → 백엔드 router.get()
//   ➜ 프론트 DELETE → 백엔드 router.delete()
//   ➜ 프론트 PUT/PATCH → 백엔드 router.put()/router.patch()
//
//   POST의 의미
//   단순히 '보낸다'가 아니라 '서버에 새로운 리소스를 생성하기 위해 데이터를 보낸다'는 뜻
//   프론트: 데이터를 보내는 행위 (요청)
//   백엔드: POST 요청을 처리하고 새 리소스를 생성하는 엔드포인트 역할
//
//   GET의 의미
//   서버에서 정보를 '조회'할 때 사용.
//   프론트: 데이터를 달라고 요청
//   백엔드: GET 요청을 처리하고 클라이언트에 데이터를 반환
//
//   라우터는 '요청을 처리하기 위한 엔드포인트'를 만드는 역할.
//   프론트 요청의 HTTP 메서드와 URL이 백엔드 라우터와 같아야 연결됨.
