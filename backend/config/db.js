const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
async function dbConnect(){
  try {
    const conn = await mongoose.connect(process.env.DB_CONN);
    if(conn) {
      console.log("===================== Mongodb Atlas is connect ======================")
    }
  } catch (error) {
    console.log("===================== Mongodb Atlas connection fail ======================")
    console.log("error message : ", error)
  }
}
module.exports = dbConnect;