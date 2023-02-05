const User = require("../../model/user/user");

const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { findById } = require("../../model/post/post");

const userRegisterCtrl = async (req, res, next) => {
  const { firstName, lastName, profilePhoto, email, password } = req.body;

  try {
    //checking if email is already exist
    const userfound = await User.findOne({ email });
    if (userfound) {
      return next(appErr("user already exist", 500));
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({ success: false, message: "invalid login credentials" });
    }

    //checking the password

    const ispasswordmatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!ispasswordmatched) {
      return res.json({
        success: false,
        message: "invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

const userProfileCtrl = async (req, res, next) => {
  // console.log(req.userAuth);

  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const userWhoViewed = await User.findById(req.userAuth);

    //check if user and userwhoviewed are found

    if (user && userWhoViewed) {
      //check if user and userwhoviewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );

      if (isUserAlreadyViewed) {
        return next(appErr("you already viewed this profile"));
      } else {
        user.viewers.push(userWhoViewed._id);

        await user.save();
        res.json({
          status: "success",
          data: "you have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

const followingCtrl = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const userWhoFollowed = await User.findById(req.userAuth);

    if (userWhoFollowed && userToFollow) {
      const isUserAlreadyFollowed = userToFollow.followers.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("you already follow this user"));
      } else {
        userToFollow.followers.push(userWhoFollowed._id);
        userWhoFollowed.following.push(userToFollow._id);

        await userWhoFollowed.save();
        await userToFollow.save();

        res.json({
          status: "success",
          data: "you have succesfully followed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

const unFollowCtrl = async (req, res, next) => {
  try {
    const userToBeUnFollowed = await User.findById(req.params.id);
    const userWhoUnFollowed = await User.findById(req.userAuth);

    if (userToBeUnFollowed && userWhoUnFollowed) {
      const isUserAlreadyFollowed = userToBeUnFollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );

      if (!isUserAlreadyFollowed) {
        return next(appErr("you have not followed this user"));
      } else {
        userToBeUnFollowed.followers = userToBeUnFollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollowed._id.toString()
        );

        await userToBeUnFollowed.save();

        userWhoUnFollowed.following = userWhoUnFollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnFollowed._id.toString()
        );
        await userWhoUnFollowed.save();
        res.json({
          status: "success",
          data: "you have successfully unfollow this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//block
const blockUsersCtrl = async (req, res, next) => {
  try {
    //1. Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    //2. Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);
    //3. Check if userToBeBlocked and userWhoBlocked are found
    if (userWhoBlocked && userToBeBlocked) {
      //4. Check if userWhoUnfollowed is already in the user's blocked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      }
      //7.Push userToBleBlocked to the userWhoBlocked's blocked arr
      userWhoBlocked.blocked.push(userToBeBlocked._id);
      //8. save
      await userWhoBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully blocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//unblock
const unblockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);
    //2. find the user who is unblocking
    const userWhoUnBlocked = await User.findById(req.userAuth);
    //3. check if userToBeUnBlocked and userWhoUnblocked are found
    if (userToBeUnBlocked && userWhoUnBlocked) {
      //4. Check if userToBeUnBlocked is already in the arrays's of userWhoUnBlocked
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("You have not blocked this user"));
      }
      //Remove the userToBeUnblocked from the main user
      userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
        (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
      );
      //Save
      await userWhoUnBlocked.save();
      res.json({
        status: "success",
        data: "You have successfully unblocked this user",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);

    if (!userToBeBlocked) {
      return next(appErr("user not found"));
    }

    userToBeBlocked.isBlocked = true;

    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully blocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const adminUnBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeUnBlocked = await User.findById(req.params.id);

    if (!userToBeUnBlocked) {
      return next(appErr("user not found"));
    }

    userToBeUnBlocked.isBlocked = false;

    await userToBeUnBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully unblocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const usersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route ",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateUserCtrl = async (req, res, next) => {
  const { email, lastName, firstName } = req.body;

  try {
    // checking if email is not taken

    if (email) {
      const emailTaken = await User.findOne({ email });

      if (emailTaken) {
        return next(
          appErr("email already taken ..so u cant update the email", 400)
        );
      }
    }

    //update the user

    const user = await User.findByIdAndUpdate(
      req.userAuth,
      {
        lastName,
        firstName,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updatePasswordCtrl = async (req, res,next) => {
  const { password } = req.body;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //update user

      const user = await User.findByIdAndUpdate(
        req.userAuth,
        {
          password:hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({
        status: "success",
        data: "password changed succcesfully",
      });
    }
    else{
      return next(appErr("please provide password field"))
    }
  } catch (error) {
    res.json(error.message);
  }
};

const profilePhotoUploadCtrl = async (req, res) => {
  // console.log(req.file)
  try {
    const userToUpdate = await User.findById(req.userAuth);

    if (!userToUpdate) {
      return next(appErr("user not found", 403));
    }
    if (userToUpdate.isBlocked) {
      return next(appErr("action not allowed", 403));
    }

    if (req.file) {
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );

      res.json({
        status: "success",
        data: "you have successfully uploaded profile photo ",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userProfileCtrl,
  usersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockUsersCtrl,
  unblockUserCtrl,
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updatePasswordCtrl,
};
