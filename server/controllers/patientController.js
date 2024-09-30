const { register } = require("../service/Patient");

const Register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    address,
    gender,
    password,
    role,
    email,
    birthdate,
  } = req.body;

  const response = await register(
    first_name,
    last_name,
    phone,
    address,
    gender,
    password,
    role,
    email,
    birthdate
  );

  if (response.success) {
    return res.status(200).json({ message: "Đăng ký thành công" });
  } else {
    return res.status(400).json({ message: response.message });
  }
};

module.exports = { Register };
