const express= require('express')
const app=express();
const path=require('path');
const cors = require('cors');
const connectDB=require('./config/db');
connectDB();
// cors setup
//const corsOptions = {
//origin: process.env.ALLOWED_CLIENTS.split(',')}
app.use(cors())
// for css 
app.use(express.static ('public'));
//json data 
app.use(express.json());

//template engine
app.set('views',path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


const port= process.env.port  ||  3000;

//routes
app.use('/api/files', require('./routes/file'));

app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'));




app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
 