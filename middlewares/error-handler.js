const errorHandler = (error, req, res, next)=>{
  console.log("Error message: "+error.message,);
  console.log("Error name: "+error.name);
  console.log("Error code: "+error.code);
  console.log("Error stack: ",error.stack);
  if (error.name == "SequelizeDatabaseError") {
    error.statusCode = 400;
    error.message = "Invalid input";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.name,
    msg: error.message
  }); 
}

module.exports = errorHandler;