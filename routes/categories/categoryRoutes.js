const express = require("express");

const {
  registerCategoryCtrl,
  getCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
  fetchCategoriesCtrl
} = require("../../controller/category/categoryCtrl");

const isLogin=require("../../middlewares/isLogin")
const categoryRouter = express.Router();

//POST/api/v1/category/
categoryRouter.post("/",isLogin,registerCategoryCtrl);

categoryRouter.get("/",fetchCategoriesCtrl);

//GET/api/v1/category/:id
categoryRouter.get("/:id", getCategoryCtrl);

//Delete/api/v1/category/:id
categoryRouter.delete("/:id",isLogin,deleteCategoryCtrl);
//put/api/v1/category/:id
categoryRouter.put("/:id",isLogin,updateCategoryCtrl);

module.exports = categoryRouter;
