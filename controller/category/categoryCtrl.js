//POST/api/v1/category/
 const registerCategoryCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "category registered",
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


  module.exports={registerCategoryCtrl,getCategoryCtrl,deleteCategoryCtrl,updateCategoryCtrl}