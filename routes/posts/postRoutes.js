const express=require('express');

const postRouter=express.Router();


const {createPostCtrl,getAllPostCtrl,deletePostCtrl,updatePostCtrl,getPostCtrl}=require('../../controller/post/postCtrl');

const isLogin = require('../../middlewares/isLogin');
postRouter.post("/",isLogin,createPostCtrl);
  
  
  
  //GET/api/v1/post/:id
postRouter.get("/:id",getPostCtrl);
  
  //GET/api/v1/posts/
postRouter.get("/",getAllPostCtrl);
  
  //Delete/api/v1/posts/:id
postRouter.delete("/:id",deletePostCtrl);
  //put/api/v1/posts/:id

postRouter.put("/:id",updatePostCtrl);



  module.exports = postRouter;