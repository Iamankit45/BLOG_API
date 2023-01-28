const express = require("express");

const {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controller/user/userCtrl");
const isLogin=require("../../middlewares/isLogin");
const userRouter = express.Router();

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

module.exports = userRouter;
