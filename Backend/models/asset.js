const mongoose = require('mongoose');

const { Schema } = mongoose;

const assetSchema = new Schema({
    filename: {
        type: String
    },
    contentType: {
        type: String
    },
    data: {
        type: Buffer
    }
});

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;