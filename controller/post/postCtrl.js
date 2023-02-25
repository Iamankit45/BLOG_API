const Post = require("../../model/post/post");
const User = require("../../model/user/user");
const Category = require("../../model/category/category");
const appErr = require("../../utils/appErr");
const createPostCtrl = async (req, res,next) => {
  const { title, description,category } = req.body;

  try {
    const author = await User.findById(req.userAuth);
//check kr leta hun kahin user blocked to nhi hai n ...admin se

if (author.isBlocked) {
  return next(appErr("access denied ,account blocked",403));
}



    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category
    });

    //associate user to a post created .....abe ye post user k posts field m push kr dete hain

    author.posts.push(postCreated);

    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message))
   }
};


const fetchPostCtrl = async (req, res) => {
  try {
    const posts= await Post.find({}).populate("user").populate("category","title");



    // jo user hume block kr chuka hai ..uska post hu nhi dekh payenge ....
const filteredPost = posts.filter(post=>{
  
  
  const blockedUsers=post.user.blocked;
  const isBlocked = blockedUsers.includes(req.userAuth);
console.log(isBlocked);
return isBlocked ? null : post;

});
  
  



    res.json({
      status: "success",
      data: filteredPost
    });
  } catch (error) {
    res.json(error.message);
  }
};


//toogle likes
const toggleLikesPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: " like controller ",
    });
  } catch (error) {
    res.json(error.message);
  }
};


//GET/api/v1/post/:id
const getPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//GET/api/v1/posts/
const getAllPostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete/api/v1/posts/:id
const deletePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete posts route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};
//put/api/v1/posts/:id
const updatePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update posts route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};




module.exports = {
  createPostCtrl,
  getAllPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  getPostCtrl,
  fetchPostCtrl,
  toggleLikesPostCtrl
};
