const User = require("../../model/user/user");

const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const userRegisterCtrl = async (req, res) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;

  try {
    //checking if email is already exist
    const userfound = await User.findOne({ email });
    if (userfound) {
      return res.json({ success: false, message: "user already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({ success: false, message: "invalid login credentials" });
    }

    //checking the password

    const ispasswordmatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!ispasswordmatched) {
      return res.json({
        success: false,
        message: "invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token:generateToken(userFound._id)

      }
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userProfileCtrl = async (req, res) => {
  
// console.log(req.headers);


  const { id } = req.params;
  try {
    const token = getTokenFromHeader(req);
    console.log(token);
    const user = await User.findById(id);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all users route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
