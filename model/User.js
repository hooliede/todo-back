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





// 토큰 생성이든 비밀번호 제거든 유저 데이터 자체에 대한 조치를 취하는 로직이라 User 모델(User.js)에 있어야 한다





// password 제거 로직
// 유저 데이터를 클라이언트에게 보내기 위해서는 객체 형태의 user 데이터를 json 형태로 바꿔야 하고 그때 호출이 되는 메서드이다
// Controller에서 따로 호출할 필요 없음 res.json(user) 할 때 항상 실행되고 -> password 필드는 제거된 상태로 응답
userSchema.methods.toJSON = function() { 
  const obj = this._doc;
  // json으로 바꿨을 때 객체의 _doc에 user의 정보가 들어있다
  delete obj.password;
  return obj;
}


// token 만들기 메서드
// 토큰은 유저의 고유 정보(여기선 _id)를 기반으로 만들기 때문에 User 모델에 두는 게 좋다
// 로그인, 이메일 인증, 비밀번호 변경 등 여러 기능에서 토큰이 사용되기 때문에 재사용성을 높이기 위해서 User 모델에서 만든다
// Controller에 토큰을 두면 각 기능마다 토큰을 만드는 로직이 반복된다 -> 그래서 User 모델에서 한 번만 정의해서 사용한다
userSchema.methods.generateToken = function () {            
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {expiresIn:'1d'}); 
  return token;                                              // expiresIn은 토큰의 유통기한
};
// JWT_SECRET_KEY: 토큰을 암호화할 때 사용할 비밀키이며 .env에 저장하여 사용


// this 정리
// userSchema.methods는 모든 유저 인스턴스가 공통으로 갖는 메서드를 정의한다
// 하지만 실제 호출은 Controller 등에서 User 모델로부터 가져온 특정 인스턴스(특정 유저의 데이터)가 담당한다.
// 즉 this는 본인을 호출한 인스턴스인 현재 작업중인 유저 데이터이다


const User = mongoose.model("User", userSchema);
module.exports = User;
