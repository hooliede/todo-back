const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email: email }); // 우리가 만든 모델에서 email 값이 이미 있는지 없는지 확인
    if (user) {
      throw new Error("이미 가입이 된 유저입니다.");
    }
    const salt = await bcryptjs.genSalt(saltRounds);
    const hash = await bcryptjs.hash(password, salt);
    console.log("암호화된 패스워드", hash);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    // console.error("에러 발생:", error);
    res.status(400).json({ status: "fail", error: error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email },"-createdAt -updatedAt -__v"); // return에서 뺄 값 정하는 방법 다만 이렇게 빼면 다른 코드에서 정보를 가져오면 다시 가져와짐
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password); // 맞다면 isMatch가 true, 다르면 false
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token }); // 왜 return을 사용할까
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = userController;
