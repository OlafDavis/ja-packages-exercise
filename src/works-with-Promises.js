import readline from 'readline';
import sharp from 'sharp';
import { generateOutputFile } from './fileHelper';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="200" height="200" rx="100" ry="100"/></svg>'
);

async function askQuestion() {
    return new Promise((resolve, reject) => {
        rl.question("Enter a file: ", answer => {
            resolve(answer);
        });
    });
}

async function transformImage(inputFile, outputFile) {    
    return sharp(inputFile)
        .resize(200, 200)
        .composite([{
            input: roundedCorners,
            blend: 'dest-in'
        }])
        .toFile(outputFile);
}

async function keepAsking() {
    while(true) {
        try {
            const answer = await askQuestion();
            const outFilePath = await generateOutputFile(answer);
            const info = await transformImage(answer, outFilePath);
            console.log("Image rounded successfully:");
            console.log(info);
        } catch (error) {
            console.log("Unable to transform image:");
            console.log(error.message);
        }
    }
}

keepAsking();