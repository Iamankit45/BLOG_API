const Comment=require('../../model/comment/comment');
const User=require('../../model/user/user');
const Post = require('../../model/post/post');
const {appErr}=require('../../utils/appErr');
 
//POST/api/v1/comments/
const postCommentCtrl= async (req, res,next) => {
  const {description}=req.body;
    try {

      const post = await Post.findById(req.params.id);
      

//creating comment

const comment=await Comment.create({

  post:post._id,
  description,
  user:req.userAuth,
});

post.comments.push(comment._id);


//ab comment user me bhi daal dete hain
const user = await User.findById(req.userAuth);
user.comments.push(comment._id);

//save


//validation disable krna prega save krne ke pehle .. nhi to sirf comment nho krne dega ...
await user.save({validateBeforeSave:false});
await post.save({validateBeforeSave:false});

      res.json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  
  
  //GET/api/v1/comments/:id
  const getCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "comments route ",
      });
    } catch (error) {
      next(appErr(error.message))
    }
  }
  
  
  
  //Delete/api/v1/comments/:id
 const deleteCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "deleted comments route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  //put/api/v1/comments/:id
  const updateCommentCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update comments route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }


  module.exports={postCommentCtrl,getCommentCtrl,deleteCommentCtrl,updateCommentCtrl}




