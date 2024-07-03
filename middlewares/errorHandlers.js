const { customAPIError } = require("../errors/customErrors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof customAPIError) {
    console.log("custom error");
    return res.status(error.statusCode).json({ msg: error.message });
  }
  res.status(500).json("Internal error occured in server");
};

module.exports = errorHandler;