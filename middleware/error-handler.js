const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("🚀 ~ file: error-handler.js ~ line 10 ~ errorHandlerMiddleware ~ err", err)
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({msg: "Something went wrong, please try again later."});
}

module.exports = errorHandlerMiddleware