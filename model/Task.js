
// Mongoose 라이브러리 불러오기(MongoDB와 연결하고 스키마/모델을 만들기 위해)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// 스키마 정의하기
const taskSchema = Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
  // 생성/수정 시간을 자동으로 기록하는 명령어
);


// MongoDB 컬렉션과 연결된 "모델 객체" 생성
const Task = mongoose.model("Task", taskSchema);

// 모듈 내보내기
module.exports = Task;
