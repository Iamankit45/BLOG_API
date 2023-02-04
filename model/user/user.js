const mongoose = require("mongoose");
const Post = require("../post/post");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // plan: [
    //   {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    //   },
    // ],

    userAward:
      {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//hooks

//pre -before record is saved

userSchema.pre("findOne", async function (next) {

//populate this post
this.populate('posts');

  const userId = this._conditions._id;
  const posts = await Post.find({ user: userId });

  const lastPost = posts[posts.length - 1];

  const lastPostDate = new Date(lastPost.createdAt);

  const lastPostDateStr = lastPostDate.toDateString();
  console.log(lastPostDateStr);

  //add virtuals to the schema

  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });

  //------------////////////////////////////////
  //-------------------chwck if user is inactive for more than 30 days----------------//

  const currentDate = new Date();
  const diff = currentDate - lastPostDate;
  const diffInDays = diff / (1000 * 3600 * 24);

  if (diffInDays >30) {
    userSchema.virtual("isInactive").get(function () {
      return true;
    });

    await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });

    await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
  }


//-----last active date------

const daysAgo=Math.floor(diffInDays)
console.log(daysAgo);

userSchema.virtual("lastActive").get(function () {
  //check if daysAgo is less than 0
  if (daysAgo <= 0) {
    return "Today";
  }
  //check if daysAgo is equal to 1
  if (daysAgo === 1) {
    return "Yesterday";
  }
  //check if daysAgo is greater than 1
  if (daysAgo > 1) {
    return `${daysAgo} days ago`;
  }
});

//----------------------------------------------
  //Update userAward based on the number of posts
  //--------------------------------------------
  //get the number of posts
  const numberOfPosts = posts.length;
  //check if the number of posts is less than 10
  if (numberOfPosts >= 0) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      {
        new: true,
      }
    );
  }
  //check if the number of posts is greater than 10
  if (numberOfPosts > 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      {
        new: true,
      }
    );
  }

  //check if the number of posts is greater than 20
  if (numberOfPosts > 20) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      {
        new: true,
      }
    );
  }
  next();
});



//get fullname

userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//get initial
userSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

//get post count
userSchema.virtual("post-count").get(function () {
  return this.posts.length;
});

//get followers count
userSchema.virtual("followers-count").get(function () {
  return this.followers.length;
});

//get following count
userSchema.virtual("following-count").get(function () {
  return this.following.length;
});

//get viewers count
userSchema.virtual("viewers-count").get(function () {
  return this.viewers.length;
});

//get blocked count
userSchema.virtual("blocked-count").get(function () {
  return this.blocked.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
