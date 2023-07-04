function asyncMiddleware(handler){
    return async (req,res,next) => {
        try{
           await  handler(req,res);
        }catch(err){
            next(err);
        }
    }
}

// unhandledRejection
// uncaughtException

// Alternatively use the express-async-errors  module for handling errors
module.exports = asyncMiddleware;