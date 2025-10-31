require("dotenv").config();
const mongoose = require("mongoose");
const { DB_NAME } = require("../constant/constants");

// function connectDB()
// {
//    // Database connection
//     mongoose.connect(process.env.MONGO_CONNECTION_URL,
//         {
//         useNewUrlParser: true,
//         useCreateIndex:true,
//         useUnifiedTopology:true,
//         useFindAndModify : true
//     }).then(()=> {
//         console.log('Database connected.');
//      })
//    .catch('error',(err) => {
//          console.log('connection failed.');
//     })
// }
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_CONNECTION_URL}/${DB_NAME}`
    );
    console.log(
      `connected to db!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("connection failed", error);
  }
};

module.exports = connectDB;
