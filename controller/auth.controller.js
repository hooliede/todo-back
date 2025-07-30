// 권한 관리 Controller
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

// 토큰이 유용한 토큰인지 아닌지 확인하는 함수
authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization; // front에서 로직으로 headers에 {키: 값} -> {authorization: token값} 이렇게 저장을 했다.
    if (!tokenString) {
      throw new Error("invalid token"); // 토큰이 없거나 뭔가 이상할 때
    }
    const token = tokenString.replace("Bearer ", ""); // token을 저장할 때 "Bearer " + token 이렇게 저장한 거 기억나? 그래서 Bearer을 없애줘서 token 값만 남김
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      // 토큰의 유효성 검사(토큰을 만들 때 사용하던 비밀번호가 필요)
      if (error) {
        throw new Error("invalid token");
      }
      // console.log("payload란 무엇인가", payload); // token을 만들 때 _id를 사용했고 이걸 디코드한 게 payload인가봐 payload에 user의 _id 값이 있다
      req.userId = payload._id;
      // console.log("token에 있는 _id의 값",req.userId);
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = authController;
