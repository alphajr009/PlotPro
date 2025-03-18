import mongoose from 'mongoose';

const { Schema } = mongoose;

const partitions = new Schema({
    templateId: {
        type: String,
        required: true
    },
    partitionId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Exporting the model using ES modules syntax
const templates = mongoose.model('parititions', partitions);
export default templates;
