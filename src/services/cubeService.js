const Cube = require('../models/Cube.js');

// const cubeDb = [];

// const getAll = () => cubeDb.slice();
const getAll = () => Cube.cubes;

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    // cubeDb.push(cube);
    Cube.add(cube);
};

const cubeService = {
    create,
    getAll
};

module.exports = cubeService;