


//POST/api/v1/comments/
const postCommentCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "comments registered",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  
  
  //GET/api/v1/comments/:id
  const getCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "comments route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  
  
  //Delete/api/v1/comments/:id
 const deleteCommentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "deleted comments route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  //put/api/v1/comments/:id
  const updateCommentCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update comments route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }


  module.exports={postCommentCtrl,getCommentCtrl,deleteCommentCtrl,updateCommentCtrl}




