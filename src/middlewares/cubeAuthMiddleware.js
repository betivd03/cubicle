const cubeService = require('../services/cubeService.js');

exports.isOwnCube = function (req, res, next) {
    let cube = cubeService.getOne(req.params.cubeId);

    if (cube.creator == req.user._id) {
        req.cube = cube;

        next();
    } else {
        // next(new Error('You\'re not authorized to edit this cube!'));

        // res.locals.error = 'You\'re not authorized to edit this cube!';
        // res.render('404');

        next('You\'re not authorized to edit this cube!');
    }
}