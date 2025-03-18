import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
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
const User = mongoose.model('User', userSchema);
export default User;
