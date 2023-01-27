const express=require('express');

const postRouter=express.Router();


const {postRegisterCtrl,getAllPostCtrl,deletePostCtrl,updatePostCtrl,getPostCtrl}=require('../../controller/post/postCtrl');

postRouter.post("/",postRegisterCtrl);
  
  
  
  //GET/api/v1/post/:id
postRouter.get("/:id",getPostCtrl);
  
  //GET/api/v1/posts/
postRouter.get("/",getAllPostCtrl);
  
  //Delete/api/v1/posts/:id
postRouter.delete("/:id",deletePostCtrl);
  //put/api/v1/posts/:id

postRouter.put("/:id",updatePostCtrl);



  module.exports = postRouter;