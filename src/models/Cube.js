const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'invalid image url']
        // validate: {
        //     validator: function(value) {
        //         return /^https?:\/\//i.test(value);
        //     },
        //     message: (props) => `Image Url ${props.value} is invalid!`
        // }
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ]
});

// cubeSchema.path('imageUrl').validate(function(value) {
//     return /^https?:\/\//i.test(value);
// });


// ONLY FOR DEMO!
// cubeSchema.statics.findByName = function(name) {
//     return this.find({name})
// };

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;



// const uniqid = require('uniqid');

// class Cube {
//     static #cubes = [
//         {
//             id: 'asdfghjklkjhgfdsa',
//             name: 'Mirror Cube',
//             description: 'Cool Rubik Cube :D',
//             imageUrl: 'https://m.media-amazon.com/images/I/41KNQRXAYvL._AC_SY580_.jpg',
//             difficulty: '4'
//         },
//         {
//             id: '9m0r7wkku13twxj',
//             name: 'Megaminx',
//             description: 'Different Rubik Cube',
//             imageUrl: 'http://cdn.shopify.com/s/files/1/0035/5205/1273/products/DaYan_20Megaminx_20V2_20M_1200x1200.jpg?v=1607362354',
//             difficulty: '6'
//         },
//         {
//             id: '9m0r3qsku1l6eye',
//             name: "Rubik's Cube 5x5x5",
//             description: "Difficult Rubik's Cube :D",
//             imageUrl: 'https://i5.walmartimages.com/asr/76eb79aa-1c55-4b0b-90d5-7d9a408a9e00_1.9b982635b711b3e13d3b8e8d18daf083.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',       
//             difficulty: '5'
//         }
//     ];

//     constructor(name, description, imageUrl, difficulty) {
//         this.id = uniqid();
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficulty = difficulty;
//         // this.canonicalUrl = name.replace(/ /g, '-').toLowerCase();
//     }

//     static get cubes() {
//         return Cube.#cubes.slice();
//     }

//     static add(cube) {
//         Cube.#cubes.push(cube);
//     }
// }

// module.exports = Cube;
