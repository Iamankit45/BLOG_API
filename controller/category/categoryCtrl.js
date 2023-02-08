
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
      const category = await Category.findById(req.params.id);
      res.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
 
  
  //Delete/api/v1/category/:id
   const deleteCategoryCtrl= async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      res.json({
        status: "success",
        data: "deleted succesfully",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  //put/api/v1/category/:id
  const updateCategoryCtrl= async (req, res) => {
    const {title}=req.body;
    try {
      const category=await Category.findByIdAndUpdate(req.params.id,{title},{new:true,runValidators:true})
      res.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      res.json(error.message);
    }
  }


  module.exports={registerCategoryCtrl,getCategoryCtrl,deleteCategoryCtrl,updateCategoryCtrl,fetchCategoriesCtrl}