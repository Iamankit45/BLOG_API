const express=require('express');

const postRouter=express.Router();

const storage=require('../../config/cloudinary');
const multer=require('multer');


const {createPostCtrl,getAllPostCtrl,deletePostCtrl,updatePostCtrl,getPostCtrl,fetchPostCtrl,toggleLikesPostCtrl, toggleDisLikesPostCtrl,postDetailsCtrl}=require('../../controller/post/postCtrl');

const isLogin = require('../../middlewares/isLogin');

//file upload middleware
const upload =multer({storage});


postRouter.post("/",isLogin,upload.single("image"),createPostCtrl);
  
  
   

postRouter.get("/",isLogin,fetchPostCtrl);

  //GET/api/v1/post/:id
// postRouter.get("/:id",getPostCtrl);
  
  //GET/api/v1/posts/
postRouter.get("/",getAllPostCtrl);
  

postRouter.get("/likes/:id",isLogin,toggleLikesPostCtrl);

postRouter.get("/disLikes/:id",isLogin,toggleDisLikesPostCtrl);

  //Delete/api/v1/posts/:id
postRouter.delete("/:id",deletePostCtrl);
  //put/api/v1/posts/:id

postRouter.put("/:id",updatePostCtrl);

postRouter.get("/:id",isLogin,postDetailsCtrl);

  module.exports = postRouter;