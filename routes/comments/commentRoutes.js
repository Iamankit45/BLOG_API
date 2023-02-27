const express = require("express");
const {
  postCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  getCommentCtrl,
} = require("../../controller/comment/commentCtrl");
const commentRouter = express.Router();
const isLogin=require("../../middlewares/isLogin")
//POST/api/v1/comments/
commentRouter.post("/:id",isLogin, postCommentCtrl);

//GET/api/v1/comments/:id
commentRouter.get("/:id", getCommentCtrl);

//Delete/api/v1/comments/:id
commentRouter.delete("/:id",isLogin, deleteCommentCtrl);
//put/api/v1/comments/:id
commentRouter.put("/:id",isLogin, updateCommentCtrl);

module.exports = commentRouter;
