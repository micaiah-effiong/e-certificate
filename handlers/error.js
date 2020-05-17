function ErrorResponse(message, statusCode){
  this.prototype = Error.prototype;
  this.message = Error.message;
  this.statusCode = statusCode;
}

const errorResponse = (message, statusCode)=>{
  return new ErrorResponse(message, statusCode);
}

module.exports = errorResponse;