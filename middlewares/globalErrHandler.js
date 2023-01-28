

const globalErrHandler = (err,req,res,next)=>{

    const stack=err.stack;
    const message=err.message;
    const status=err.status?err.satus :'failed';
    const statusCode=err?.statusCode?err.statusCode:500;
  
  
  res.status(statusCode).json({
  message,stack,status
  
  })
    console.log(err.stack);
  }


module.exports=globalErrHandler;