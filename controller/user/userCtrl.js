

const userRegisterCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "user registered",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

 const userLoginCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "user login",
      });
    } catch (error) {
      res.json(error.message);
    }
  }


  const userProfileCtrl =async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "profile route ",
      });
    } catch (error) {
      res.json(error.message);
    } 
  }

  const usersCtrl=async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "all users route",
      });
    } catch (error) {
      res.json(error.message);
    }
  }

  const deleteUserCtrl= async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "delete user route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }


   const updateUserCtrl =async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update user route ",
      });
    } catch (error) {
      res.json(error.message);
    }
  }
module.exports ={userRegisterCtrl,userLoginCtrl,userProfileCtrl,usersCtrl,deleteUserCtrl,updateUserCtrl};