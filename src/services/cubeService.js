const Cube = require('../models/Cube.js');

// const cubeDb = [];
// const getAll = () => cubeDb.slice();
// const getAll = () => Cube.cubes;
const getAll = () => Cube.find({}).lean();

// const getOne = (id) => Cube.cubes.find(x => x.id == id);
const getOne = (id) => Cube.findById(id);

const create = (name, description, imageUrl, difficulty) => {
    // let cube = new Cube(name, description, imageUrl, difficulty);

    // // cubeDb.push(cube);
    // Cube.add(cube);
    let cube = new Cube({
        name, 
        description,
        imageUrl,
        difficulty
    });

    return cube.save();
};

const search = (text, from, to) => {
    let result = Cube.getAll();

    if (text) {
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (from) {
        result = result.filter(x => x.difficulty >= from);
    }

    if (to) {
        result = result.filter(x => x.difficulty <= to);
    }

    return result;
};

const cubeService = {
    create,
    getAll,
    getOne,
    search
};

module.exports = cubeService;