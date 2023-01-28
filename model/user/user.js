const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({

    
        
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
          ]
         
          


})

const User = mongoose.model("User", userSchema);

module.exports = User;
