const express = require("express");
const {
  postCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  getCommentCtrl,
} = require("../../controller/comment/commentCtrl");
const commentRouter = express.Router();

//POST/api/v1/comments/
commentRouter.post("/", postCommentCtrl);

//GET/api/v1/comments/:id
commentRouter.get("/:id", getCommentCtrl);

//Delete/api/v1/comments/:id
commentRouter.delete("/:id", deleteCommentCtrl);
//put/api/v1/comments/:id
commentRouter.put("/:id", updateCommentCtrl);

module.exports = commentRouter;
