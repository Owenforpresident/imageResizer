const imagemin = require('imagemin');


const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');



const http = require('http');


http.createServer(function (req, res) {
    lossless() 
}).listen(8081);
console.log('server running on port 8081 . . .')

const lossless = async () => {
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'lossless/images',
        plugins: [
            imageminJpegtran(),
            imageminOptipng()
        ]
    });

    console.log(files);
  
};