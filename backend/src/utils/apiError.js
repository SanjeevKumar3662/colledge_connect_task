class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", error = []) {
    super(message);
    this.name = this.constructor.name; //this will show up as ApiError instead of Error
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = error;
  }
}

export { ApiError };
