const Cube = require('../models/Cube.js');

const cubeDb = [
    {
        name: 'Mirror Cube',
        description: 'Cool Rubik Cube :D',
        imageUrl: 'https://m.media-amazon.com/images/I/41KNQRXAYvL._AC_SY580_.jpg',
        difficulty: '4'
    }
];

const getAll = () => cubeDb.slice();

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    cubeDb.push(cube);
};

const cubeService = {
    create,
    getAll
};

module.exports = cubeService;