
const Category=require('../../model/category/category')
const isLogin = require('../../middlewares/isLogin');
const appErr = require('../../utils/appErr');

//POST/api/v1/category/
 const registerCategoryCtrl= async (req, res,next) => {

  const {title}=req.body;
    try {
      const category = await Category.create({title,user:req.userAuth});
      res.json({
        status: "success",
        data: category
      });
    } catch (error) {
      return next(appErr(error.message));
    }
  }
  
  
 //GET/api/v1/category/:id
 const fetchCategoriesCtrl= async (req, res) => {
  try {
const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.json(error.message);
  }
}
  
  //GET/api/v1/category/:id
  const getCategoryCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "category route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
 
  
  //Delete/api/v1/category/:id
   const deleteCategoryCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "deleted category route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  //put/api/v1/category/:id
  const updateCategoryCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update category route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }


  module.exports={registerCategoryCtrl,getCategoryCtrl,deleteCategoryCtrl,updateCategoryCtrl,fetchCategoriesCtrl}