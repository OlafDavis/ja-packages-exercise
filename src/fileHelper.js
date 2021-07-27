function generateOutputFile(inputFilePath) {
    return new Promise((resolve, reject) => {
        const outFileParts = inputFilePath.split('.');
        if(outFileParts.length !== 2 ||
            outFileParts[0].length === 0 ||
            outFileParts[1].length === 0) {
            reject(new Error("Invalid file path"));
        } else {
            resolve(outFileParts[0]+'-rounded.'+outFileParts[1]);
        }
    });
}

exports.generateOutputFile = generateOutputFile