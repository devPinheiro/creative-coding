const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [ 1080, 1080 ]
};

let manager;
const imageUrl = 'https://picsum.photos/200/300';
const image = new Image();
image.src = imageUrl;
let text = 'G';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
    const cell = 20;
    const cols = Math.floor(width  / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;

    typeCanvas.width  = cols;
    typeCanvas.height = rows;

    return ({ context, width, height }) => {
        
    }
}
const getGlyph = (v) => {
    if (v < 50) return '';
    if (v < 100) return '.';
    if (v < 150) return '-';
    if (v < 200) return '+';

    const glyphs = '_= /'.split('');

    return random.pick(glyphs);
};


const onKeyUp = (e) => {
    text = e.key.toUpperCase();
    manager.render();
};

document.addEventListener('keyup', onKeyUp);


const start = async () => {
    manager = await canvasSketch(sketch, settings);
};

start();





/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    });
};

const start = async () => {
    const img = await loadMeSomeImage(url);
    console.log('image width', img.width);
    console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/
