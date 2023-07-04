//module used to sending an error message

module.exports = function(err,req,res,next){
     
    // Log all errors to a File outside the wire 
    return res.status(500).send('Something failed ...');
}