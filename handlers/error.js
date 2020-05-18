class ErrorResponse extends Error {
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
  }
}

const errorResponse = (message, statusCode)=>{
  return new ErrorResponse(message, statusCode);
}

module.exports = errorResponse;