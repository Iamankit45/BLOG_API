const Post = require("../../model/post/post");
const User = require("../../model/user/user");
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
};
