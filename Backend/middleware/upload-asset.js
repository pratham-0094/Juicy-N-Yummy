const moment = require('moment');

const Asset = require('../models/asset');

const saveImageToDatabase = async (file, type) => {
    try {
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');

        const newFilename = `${type}_${timestamp}_${file.originalname}`;

        const newImage = new Asset({
            filename: newFilename,
            contentType: file.mimetype,
            data: file.buffer
        });
        const savedImage = await newImage.save();
        return savedImage._id;
    } catch (error) {
        log.error(`Error saving image to database: ${error}`);
        throw error;
    }
}

const deleteImageFromDatabase = async (fileID) => {
    try {
        const deletedImage = await Asset.findByIdAndDelete(fileID);
        if (!deletedImage) {
            throw new Error('Image not found');
        }
        return deletedImage._id;
    } catch (error) {
        log.error(`Error deleting image fron database: ${error}`);
        throw error;
    }
}

module.exports = { saveImageToDatabase, deleteImageFromDatabase };
