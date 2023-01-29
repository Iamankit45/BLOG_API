const User = require("../../model/user/user");

const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");

const userRegisterCtrl = async (req, res, next) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;

  try {
    //checking if email is already exist
    const userfound = await User.findOne({ email });
    if (userfound) {
      return next(appErr("user already exist", 500));
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
    next(appErr(error.message));
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
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userProfileCtrl = async (req, res) => {
  // console.log(req.headers);

  console.log(req.userAuth);
  // const { id } = req.params;
  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.userAuth);
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

const profilePhotoUploadCtrl = async (req, res) => {
  // console.log(req.file)
  try {
  
const userToUpdate = await User.findById(req.userAuth);

if (!userToUpdate) {
  return next(appErr("user not found",403));
  
}
if (userToUpdate.isBlocked) {
  return next(appErr("action not allowed",403));
}


if (req.file) {
  
  await User.findByIdAndUpdate(req.userAuth,{

    $set:{
      profilePhoto:req.file.path,
    }
  }
  ,{
    new:true,
  })

  res.json({
    status: "success",
    data: "you have successfully uploaded profile photo ",
    
  });
}


  } catch (error) {
    next(appErr(error.message,500 ))
  }
};


module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl 
};
