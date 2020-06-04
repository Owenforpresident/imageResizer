const express = require('express');
const app = express();
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

app.get('/lossless', (req, res) => {
    console.log('running lossless compression');
    lossless()
});

app.get('/lossy', (req, res) => { 
    const qual = parseInt(req.query["quality"])
    if( typeof qual !== 'undefined'  && qual > 0 && qual < 100){
     
            res.send(`running lossy function w specific quality of ${qual} percent`)
            console.log('specific quality')
            lossy(qual)
        
      
           
    
    } else {   
            res.send('Quality not specified . . . running compression with default quality of 50% . . . set desired quality using query string i.e /lossy?quality=80 will reduce image quality by 20%')
            console.log('default quality')
            lossy(50)
           
        }
      
});

const lossy = async (qual) => {
    const decimal = qual/100
    console.log(qual)
    console.log(decimal)
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'lossy/images',
        plugins: [
            imageminMozjpeg({quality: qual}),
            imageminPngquant({
				quality: [0.5, decimal]
			})
        ]
    });
};


const lossless = async () => {
    const files = await imagemin(['images/*.{jpg,png}'], {
        destination: 'lossless/images',
        plugins: [
            imageminJpegtran(),
            imageminOptipng()
        ]
    });
};

app.listen(3000, () => console.log('Listening on port 3000......'));