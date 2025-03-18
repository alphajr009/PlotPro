import mongoose from 'mongoose';

const { Schema } = mongoose;

const templatesSchema = new Schema({
    measureId: {
        type: String,
        required: true
    },
    perimeter: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    templateName: {
        type: String,
        required: true
    },
    landType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    partitions: {
        type: Number,
        required: true,
        default:"0"
    },
    method: {
        type: String,
        required: true
    },
    lastUpdatedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const templates = mongoose.model('templates', templatesSchema);
export default templates;
