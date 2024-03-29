const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Post Title is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Post description is required"],
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Post category is required"],
      },
      numViews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      disLikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Author is required"],
      },
      photo: {
        type: String,
        // required: [true, "Post Image is required"],
      },
      url_title:{
        type:String,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
    



})

//hook
postSchema.pre(/^find/, function(next) {

//adding views count as virtual field

postSchema.virtual("viewscount").get(function() {

  const post = this;
  return post.numViews.length;
})

postSchema.virtual("likescount").get(function() {

  const post = this;
  return post.likes.length;
})

postSchema.virtual("Dislikecount").get(function() {

  const post = this;
  return post.disLikes.length;
})

postSchema.virtual("likesPercentage").get(function(){
const post =this;
const total = (post.likes.length+ post.disLikes.length);
const percentage= (post.likes.length/total)*100;
return `${percentage}%`


})

postSchema.virtual("DislikePercentage").get(function(){
  const post =this;
  const total = (post.likes.length+ post.disLikes.length);
  const percentage= (post.disLikes.length/total)*100;
  return `${percentage}%`
  
  
  })

postSchema.virtual("daysAgo").get(function(){
const post=this;
const date=new Date(post.createdAt);
const daysAgo=Math.floor((Date.now()-date)/86400000);
return daysAgo===0?"Today":daysAgo===1?"Yesterday":`${daysAgo} days Ago`;




})




next();
})


const Post = mongoose.model("Post", postSchema);

module.exports = Post;