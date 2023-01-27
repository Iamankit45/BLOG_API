

const postRegisterCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "post registered",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  
  
  //GET/api/v1/post/:id
 const getPostCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "post route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  //GET/api/v1/posts/
 const getAllPostCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "posts route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  
  //Delete/api/v1/posts/:id
 const deletePostCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "delete posts route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
  //put/api/v1/posts/:id
const updatePostCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update posts route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }




  module.exports ={ postRegisterCtrl,getAllPostCtrl,deletePostCtrl,updatePostCtrl,getPostCtrl}
  







