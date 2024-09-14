const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//Wrong Mongodb Id error
    if(err.name === "CastError"){
        const message = `Resouce not found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
//Mongose Duplicate error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400);
    }
    //Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }
        // JWT Expire error
    if(err.name === "TokenExpitedError"){
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    });
}