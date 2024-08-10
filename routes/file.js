const router = require('express').Router();
const path=require('path')
const multer= require('multer')
const File= require('../models/file');
const{v4:uuid4}= require ('uuid');

let storage= multer.diskStorage({
    destination: (req, file, cb)=> cb(null, 'uploads/'),
    filename:(req, file, cb)=> { 
        const uniquename=  `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
   
        cb (null,uniquename)
    },
    
});

let upload=multer({
    storage:storage,
    limit:{fileSize:1000000*100},
}).single('myfile');

router.post('/', (req, res)=>
{
    // //validate request
    // if(!req.file)
    //     {
    //         return res.json({error:'all feilds are required.'});
    //     }


    // //store file

    upload(req,res, async(e)=>{
    //validate request
        if(e){
           return res.status(500).send({error:e.message})
        }

        
    //store into database
    const file=new File({
    filename:req.file.filename,
    uuid: uuid4(),
    path:req.file.path,
    size:req.file.size
                    });

const response= await file.save();  
return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
 //response -> link
  
});
  

});

// send email

router.post('/send', async (req, res)=>{
    const {uuid, emailTo, emailFrom}=req.body
    //validate request
    if(!uuid||!emailTo||!emailFrom)
    {
        return res.status(422).send({error:'All field are required'});
    } 
    //get data from database

    const file=await File.findOne({uuid:uuid}) ;
    if(file.sender){
        return res.status(422).send({error:'Email Already Sent.'});
    }

    file.sender= emailFrom;
    file.receiver=emailTo;
    const response=await file.save();

    // send email
     const sendMail= require('../services/emailService')
     sendMail({
        from:emailFrom,
        to:emailTo,
        subject:'inshare file Sharing',
        text:`${emailFrom} shared a file with you`,
        html:require('../services/emailTemplate')({
            emailFrom:emailFrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
            size:parseInt(file.size/1000)+'KB',
            expires:'24 Hours'
        })
     }).then(()=>{
        return res.json({success:true});
         }).catch((err) =>{
        return res.status(500).json({error: 'Error in email sending.'});
          }).catch((err) =>{
            return res.status(500).send({ error: 'Something went wrong.'});
          });
          
        
    });


module.exports =router;