const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// 어떤 로직이든 무조건 특정 정보를 빼고 가져오게 하는 방법
userSchema.methods.toJSON = function() { // 위에 스키마 모델은 객체인데 스키마를 json 형태로 가져오게 하는 코드
  // return this  return this 즉 스키마를 return하라고 했으니 스키마가 json 구조로 오게 된다
  const obj = this._doc;
  delete obj.password;
  return obj;
  // back -> front로 갈 때 항상 실행이 되고 그래서 무조건 password가 제거가 됨
}

// token이 유저와 관련이 있으니 User.js에 그리고 다른 곳에서도 쓰일 수 있으면 여기에서 만들자라 흐음...
userSchema.methods.generateToken = function () {            // 이거는 토큰의 유통기한
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {expiresIn:'1d'}); // token을 만들건데 뭘 기준으로 만들거냐고 하면 이제 각각 정보에 "_id"라는 게 있잖아 이 값을 기준으로 만들거고 
  return token;                                              // this는 이제 이 유저의 id 값이라는 뜻 그런데 왜 return을 사용할까
};

const User = mongoose.model("User", userSchema);
module.exports = User;
