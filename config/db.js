const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("connection to db successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// dbConnect();
module.exports=dbConnect;
