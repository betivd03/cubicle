exports.errorHandler = function (error, req, res, next) {
    if (error) {
        // console.log(error);
        res.locals.errors = [error];
        res.status(404).render('404');
    }
};