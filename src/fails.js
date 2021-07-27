const sharp = require('sharp');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let imageIn;
let imageOut;

readline.question('Enter the path of the image you want to edit:', filepath => {
    imageIn = filepath;
});

readline.question('Enter the path you\'d like to save the new image to:', filepath => {
    imageOut = filepath;
    readline.close();
})

const circle = new Buffer.from(
    '<svg height="485" width="485"><circle cx="242.5" cy="242.5" r="242.5" fill="#3a4458"/></svg>'
);

// We reach this code before the two readline.questions above have resolved, so imageIn is still undefined
sharp(imageIn)
    .resize(485, 485)
    .composite([{ input: circle, blend: "dest-in" }])
    .toFile(imageOut, function(err, info) {
        console.log(info);
    });
