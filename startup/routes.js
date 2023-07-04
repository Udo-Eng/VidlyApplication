const genresRouter = require('../routes/genres');
const customerRouter = require('../routes/customers');
const homeRouter = require('../routes/home');
const movieRouter = require('../routes/movies');
const rentalRouter = require('../routes/rentals');
const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const returnsRouter = require('../routes/returns');
const error = require('../middleware/error');


module.exports = function(app){
    app.use('/', homeRouter);
    app.use('/api/genres',genresRouter);
    app.use('/api/customer',customerRouter);
    app.use('/api/movie',movieRouter);
    app.use("/api/rental",rentalRouter);
    app.use("/api/users",userRouter);
    app.use("/api/auth",authRouter);
    app.use("/api/returns",returnsRouter)
    app.use(error);
}
