const Post = require("../../model/post/post");
const User = require("../../model/user/user");
const Category = require("../../model/category/category");
const appErr = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;

  try {
    const author = await User.findById(req.userAuth);
    //check kr leta hun kahin user blocked to nhi hai n ...admin se

    if (author.isBlocked) {
      return next(appErr("access denied ,account blocked", 403));
    }

    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req && req.file && req.file.path,
    });

    //associate user to a post created .....abe ye post user k posts field m push kr dete hain

    author.posts.push(postCreated);

    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//for all post
const fetchPostCtrl = async (req, res,next) => {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    // jo user hume block kr chuka hai ..uska post hu nhi dekh payenge ....
    const filteredPost = posts.filter((post) => {
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);
      console.log(isBlocked);
      return isBlocked ? null : post;
    });

    res.json({
      status: "success",
      data: filteredPost,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//toogle likes
const toggleLikesPostCtrl = async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.id);

    //check kr rhe hai ki kahin agar user pehle se ye post like kr chuka hoga to...
    const isLiked = post.likes.includes(req.userAuth);

    if (isLiked) {
      post.likes = post.likes.filter(
        (likes) => likes.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //agar user like nhi kiya hai ye vala post pehle tb.......
      post.likes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//toggle dislikes

const toggleDisLikesPostCtrl = async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.id);

    //check kr rhe hai ki kahin agar user pehle se ye post like kr chuka hoga to...
    const isUnLiked = post.disLikes.includes(req.userAuth);

    if (isUnLiked) {
      post.disLikes = post.disLikes.filter(
        (disLikes) => disLikes.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //agar user like nhi kiya hai ye vala post pehle tb.......
      post.disLikes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};


// for viewing single post
const postDetailsCtrl = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const isViewed = post.numViews.includes(req.userAuth);

    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      post.numViews.push(req.userAuth);
      await post.save();
    }
  } catch (error) {
    next(appErr(error.message));
  }
};






//Delete/api/v1/posts/:id
const deletePostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to delte this post ", 403));
    }

    await Post.findByIdAndDelete(req.paramsid);
    res.json({
      status: "success",
      data: "post successfully delted",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
//put/api/v1/posts/:id
const updatePostCtrl = async (req, res, next) => {
  const { title, description, category,photo } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    //check kr rhe hain ki yee post iss user se belong krta hai ki nhi
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to update this post ", 403));
    }

    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req && req.file && req.file.path,
      },
      { new: true }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  createPostCtrl,
  
  deletePostCtrl,
  updatePostCtrl,

  fetchPostCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
  postDetailsCtrl,
};
