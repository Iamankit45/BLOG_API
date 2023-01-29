const express = require("express");
const storage = require("../../config/cloudinary")
const multer=require("multer");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl, 
} = require("../../controller/user/userCtrl");
const isLogin=require("../../middlewares/isLogin");
const userRouter = express.Router();

const upload=multer({storage});

userRouter.post("/register", userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//GET/api/v1/users/:id
userRouter.get("/profile/",isLogin,userProfileCtrl);

//GET/api/v1/users/
userRouter.get("/", usersCtrl);

//Delete/api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);
//put/api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);


userRouter.post("/profile-photo-upload",isLogin,upload.single('profile'),profilePhotoUploadCtrl);

module.exports = userRouter;
