const Task = require("../model/Task");
// 실제 로직을 처리하는 곳이라서 router 라이브러리를 가져오지 않음
// DB와 연결, 데이터 처리를 하기에 Task 모델을 불러옴



const taskController = {};
// 빈 객체 생성
// taskcontroller.함수이름 = ....  이런 구조로 함수를 taskController 객체에 추가하여 관리


// 함수 형식
// 함수 이름 = async (req, res) => {
//      함수 내용                
//  }
// async: 비동기처리, (req, res): 매개변수 (req = 요청 객체, res = 응답 객체)





// controller는 서버의 "행동 담당자"이다 즉 컨트롤러는 서버의 입장에서 요청을 처리하는 로직 작성


// 할일 만드는 controller
taskController.createTask = async (req, res) => {
  try {
    const { userId } = req
    const { task, isComplete } = req.body;                                    // 클라이언트가 POST로 보낸 요청 데이터(req.body) 가져오기
    const newTask = new Task({ task, isComplete, author: userId });                           // 받아온 데이터를 Task(스키마 기반)를 사용하여 newTask에 데이터를 넣어 새로운 객체 생성
    await newTask.save();                                                     // MongoDB에 newTask 저장(비동기)
    res.status(200).json({ status: "success", data: newTask });               // json 형식으로 성공 응답 보내기 / .status(200): HTTP 상태  코드(성공) 설정
  } catch (err) {                                                                 
    res.status(400).json({ status: "fail", error: err });                     // json 형식으로 실패 응답 보내기(HTTP 상태 코드 400)
  }
};


// 할일 가져오는 controller
taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).populate("author"); // author(FK)를 가지고 컬렉션 join같은 함수(실제 DB의 조인은 아닌 비슷한)  /  비동기 처리로 데이터를 배열 형식으로 가져오기, 모든 데이터를 다 가져옴(find 뒤에 조건x)
    res.status(200).json({ status: "success", data: taskList });              // json 형태로 배열 데이터 전달
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};


// 할일 끝남/안끝남 수정하는 controller
taskController.updateTask = async (req, res) => {
  try {
   const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,                                    // URL에서 받은 ID를 기준으로 해당하는 값을 찾아 업데이트 대상으로 지정
      req.body,                                         // 클라이언트가 보낸 값(req.body)으로 데이터 수정
      { new: true,runValidators: true }                 // new: true => 업데이트된 데이터를 반환(기본값은 수정 전 값)
    );                                                  // runValidators: true => 업데이트 시에도 스키마 유효성 검사 적용(조건 불만족시 catch로 이동)
    if (!updatedTask) {                                 // 해당 ID에 데이터를 찾지 못하면 null을 반환 -> 404응답
     return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ status: "success", data: updatedTask });   // 업데이트를 성공할 경우 200과 json 형식으로 수정된 데이터 응답
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });                  // 스키마 구조에 맞지 않는 경우 => runValidators: false인 경우
  }
};


// 할일 삭제하는 controller
taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);   // URL에서 받은 ID로 해당 데이터를 찾아 삭제하고 삭제된 데이터를 deleteItem에 반환
    res.status(200).json({ status: "success", data: deleteItem });    // HTTP 상태 코드 200(성공)과 함께 JSON 형식으로 삭제된 데이터 응답
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};



module.exports = taskController;
