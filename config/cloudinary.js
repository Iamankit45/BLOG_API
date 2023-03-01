//for file uploadng i am using 3rd party api which i cloudnary

const cloudinary = require('cloudinary').v2;

require('dotenv').config;
const {CloudinaryStorage}=require('multer-storage-cloudinary');


//configure cloudinary

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})



//instance of clodinary storage
const storage = new CloudinaryStorage({

cloudinary,
allowedFormats: ['jpg','png','jpeg'],
params:{
    folder:"BLOG_API",
    transformation:[
        {width:500,height:500,crop:"limit"},
    ]
}

});

module.exports=storage;