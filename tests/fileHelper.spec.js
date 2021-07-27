const assert = require('assert');
const fileHelper = require('../src/fileHelper');

describe('fileHelper', () => {
  describe('generateOutputFile', () => {
    it('should return an error when no dot present', async () => {
      try {
        const outputFile = await fileHelper.generateOutputFile("InvalidPath");
        assert.fail("Should not get here");
      } catch (error) {
        assert.equal(error.message, "Invalid file path");
      }
    });

    it('should return an error when no file type present', async () => {
      try {
        const outputFile = await fileHelper.generateOutputFile("InvalidPath.");
        assert.fail("Should not get here");
      } catch (error) {
        assert.equal(error.message, "Invalid file path");
      }
    });

    it('should return an error when no file name present', async () => {
      try {
        const outputFile = await fileHelper.generateOutputFile(".jpg");
        assert.fail("Should not get here");
      } catch (error) {
        assert.equal(error.message, "Invalid file path");
      }
    });

    it('should return a file name with "-rounded" appended to the end', async () => {
      try {
        const outputFile = await fileHelper.generateOutputFile("Image.jpg");
        assert.equal(outputFile, "Image-rounded.jpg");
      } catch (error) {
        assert.fail("Error encountered");
      }
    });
  });
});

