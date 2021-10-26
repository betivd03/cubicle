const express = require('express');
const router = express.Router();
const validator = require('validator');
const { body, validationResult } = require('express-validator');

const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const { isAuth } = require('../middlewares/authMiddleware.js');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware.js');

const getCreateCubePage = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    // console.log(req.body);
    let { name, description, imageUrl, difficulty } = req.body;

    // if (!validator.isURL(imageUrl)) {
    //     return res.status(400).send('Invalid Image Url!');
    // }

    // let errors = validationResult(req);

    try {
        await cubeService.create(name, description, imageUrl, difficulty, req.user._id);
        res.redirect('/');
    } catch (error) {
        // res.status(400).send(error.message).end();

        let errors = Object.keys(error.errors).map(x => error.errors[x].message);
        res.locals.errors = errors;
        res.render('cube/create');
    }
};

const cubeDetails = async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId);

    let isOwn = cube.creator == req.user._id;
    
    res.render('cube/details', { ...cube, isOwn })
}

const getEditCubePage = async (req, res) => {
    // let cube = await cubeService.getOne(req.params.cubeId);
    // res.render('cube/edit', cube);

    res.render('cube/edit', req.cube);
}

const postEditCubePage = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    console.log(req.body);

    await cubeService.updateOne(req.params.cubeId, { name, description, imageUrl, difficulty });

    res.redirect(`/cube/${req.params.cubeId}`);
}

const getDeleteCubePage = async (req, res) => {
    // let cube = await cubeService.getOne(req.params.cubeId);
    // res.render('cube/delete', cube);

    res.render('cube/delete', req.cube);
}

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);

    res.redirect('/');
}

router.get('/create', isAuth, getCreateCubePage);
router.post('/create', isAuth, body('imageUrl').isURL(), createCube);
router.get('/:cubeId', cubeDetails);
router.get('/:cubeId/edit', isAuth, isOwnCube, getEditCubePage);
router.post('/:cubeId/edit', isAuth, isOwnCube, postEditCubePage);
router.get('/:cubeId/delete', isAuth, isOwnCube, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth, isOwnCube, postDeleteCubePage);

router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;