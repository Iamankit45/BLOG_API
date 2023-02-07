const express = require("express");

const {
  registerCategoryCtrl,
  getCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} = require("../../controller/category/categoryCtrl");

const isLogin=require("../../middlewares/isLogin")
const categoryRouter = express.Router();

//POST/api/v1/category/
categoryRouter.post("/",isLogin,registerCategoryCtrl);

//GET/api/v1/category/:id
categoryRouter.get("/:id", getCategoryCtrl);

//Delete/api/v1/category/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);
//put/api/v1/category/:id
categoryRouter.put("/:id", updateCategoryCtrl);

module.exports = categoryRouter;
