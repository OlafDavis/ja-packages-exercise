const sharp = require('sharp');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let imageIn;
let imageOut;

const circle = new Buffer.from(
    '<svg height="485" width="485"><circle cx="242.5" cy="242.5" r="242.5" fill="#3a4458"/></svg>'
);

readline.question('Enter the path of the image you want to edit:', (filename) => {
    imageIn = filename
    readline.question('Enter the path you\'d like to save the new image to:', (filename) => {
        imageOut = filename;

        sharp(imageIn)
            .resize(485, 485)
            .composite([{ input: circle, blend: "dest-in" }])
            .toFile(imageOut, function(err, info) {
                console.log(info);
            });
        readline.close();

    });
});