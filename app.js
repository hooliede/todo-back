const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();                              // .env 파일에서 환경 변수를 불러오기 위해 사용
const app = express();
// 서버 역할을 하는 app 객체 생성
// 이 app 객체를 통해 라우팅, 미들웨어 설정, 서버 실행 등을 할 수 있다.
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongoouri", MONGODB_URI_PROD);

app.use(cors());
// 프론트와 백엔드의 주소나 포트 번호가 다를 때 브라우저가 요청을 막는 걸 허용하는 설정
app.use(bodyParser.json());
// 클라이언트(프론트)에서 보낸 HTTP 요청의 body 부분을 JSON으로 변환해서 req.body로 접근할 수 있게 해줌
app.use("/api", indexRouter);
// "/api"로 시작하는 모든 요청은 indexRouter에서 처리하도록 연결









// MongoDB와 연결
const mongoURI = MONGODB_URI_PROD; //  =>   Atlas 클라우드 DB URI
// const mongoURI = `mongodb://localhost:27017/todo-demo`;   =>  로컬 MongoDB URI

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  // Mongoose가 MongoDB 서버에 접속
  // Mongoose가 MongoDB에 접속할 때 최신 URL 파싱 방법을 쓰도록 설정하는 옵션
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    // 연결이 실패하면 -> Mongoose가 에러 객체를 생성하고, 그 객체가 err 매개변수로 전달이 된다
    console.log("DB Connection Fail", err);
  });








const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

// app.listen(5050, () => {
//   console.log("server on 5050");
// });
// 포트 번호 5050으로 오는 건 다 여기로 오게 하겠다
