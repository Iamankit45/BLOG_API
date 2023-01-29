const path =require('path');
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const dbConnect = require("./config/db");
const app = express();
const globalErrHandler = require("./middlewares/globalErrHandler");
const port = process.env.PORT || 3000;

//middleware

app.use(express.json()); //pass incoming payload

const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");

//routing of users,posts,category,comments
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/comments", commentRouter);

//errorhandlers middleware
app.use(globalErrHandler);

//404 error

app.use("*", (req, res) => {
  res.status(400).json({
    message: `${req.originalUrl} Route not found`,
  });
});

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
