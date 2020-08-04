class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

let errorResponse = (msg, statusCode) => {
  return new ErrorResponse(msg, statusCode);
};

module.exports = errorResponse;
