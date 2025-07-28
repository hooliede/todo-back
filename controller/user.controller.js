const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const userController = {};

// 회원가입 기능
userController.createUser = async (req, res) => {
  try {
    // 1. front에서 보낸 데이터 받기
    const { email, name, password } = req.body;
    // 2. req.body에 있는 email이 DB에 있는지 확인(중복 회원가입 방지)
    const user = await User.findOne({ email: email });
    // DB에 있으면
    if (user) {
      throw new Error("이미 가입이 된 유저입니다.");
    }

    // 3. 패스워드 암호화하기
    const salt = await bcryptjs.genSalt(saltRounds); // saltRounds는 암호화 하는 횟수
    const hash = await bcryptjs.hash(password, salt);
    console.log("암호화된 패스워드", hash);

    // 4. 새 유저를 DB에 저장
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    // console.error("에러 발생:", error);
    res.status(400).json({ status: "fail", error: error });
  }
};

// 로그인 기능
userController.loginWithEmail = async (req, res) => {
  try {
    // 1. front에서 보낸 데이터 받기
    const { email, password } = req.body;

    // 2. Email을 기준으로 DB에서 유저 정보 가져오기
    const user = await User.findOne(
      { email: email },
      "-createdAt -updatedAt -__v"
    ); // "-createdAt -updatedAt -__v" : 이 필드들은 응답에서 제외하겠다는 뜻, 다만 다른 로직에서 가져오면 가져와짐

    // DB에서 유저 정보를 가져 왔다면 즉 가입한 회원이라면
    if (user) {
      //3. 사용자가 입력한 password와 DB 속 암호화 된 password와 비교
      const isMatch = await bcryptjs.compare(password, user.password); // 맞다면 isMatch가 true, 다르면 false

      // password가 같으면
      if (isMatch) {
        // 4. 토큰 만들기
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token }); // return을 통해서 함수를 종료
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
