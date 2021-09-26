const Cube = require('../models/Cube.js');

// const cubeDb = [];

// const getAll = () => cubeDb.slice();
const getAll = () => Cube.cubes;

const getOne = (id) => Cube.cubes.find(x => x.id == id);

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    // cubeDb.push(cube);
    Cube.add(cube);
};

const search = (text, from, to) => Cube.cubes.filter(x => x.name.toLowerCase().includes(text.toLowerCase()))

const cubeService = {
    create,
    getAll,
    getOne,
    search
};

module.exports = cubeService;