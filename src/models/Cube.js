const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: 'asdfghjklkjhgfdsa',
            name: 'Mirror Cube',
            description: 'Cool Rubik Cube :D',
            imageUrl: 'https://m.media-amazon.com/images/I/41KNQRXAYvL._AC_SY580_.jpg',
            difficulty: '4'
        },
        {
            id: '9m0r7wkku13twxj',
            name: 'Megaminx',
            description: 'Different Rubik Cube',
            imageUrl: 'http://cdn.shopify.com/s/files/1/0035/5205/1273/products/DaYan_20Megaminx_20V2_20M_1200x1200.jpg?v=1607362354',
            difficulty: '5'
          }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    static get cubes() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}

module.exports = Cube;