const imagemin = require('imagemin');

const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');



const http = require('http');


http.createServer(function (req, res) {
    lossy() 
}).listen(8081);
console.log('server running on port 8081 . . .')


const lossy = async () => {
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'lossy/images',
        plugins: [
            imageminMozjpeg({quality: 50}),
            imageminPngquant({
				quality: [0.3, 0.5]
			})
        ]
    });

    console.log(files);
  
};