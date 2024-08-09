require('dotenv').config();
const mongoose= require ('mongoose');


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
function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,
        //useFindAndModify: true,
      })
      .then(() => {
        console.log("Database connected.");
      })
      .catch(err => {
        console.log(`connection failed ${err}`);
      });
  }




module.exports=connectDB;