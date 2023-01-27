const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db");
const app = express();

const port = process.env.PORT || 3000;

const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");

//routing of users,posts,category,comments
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
