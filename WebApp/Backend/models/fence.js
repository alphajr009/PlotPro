const mongoose = require("mongoose");

const fenceSchema = mongoose.Schema(
    {   Id: {
            type: String,
        },
        FenceType: {
            type: String,
        },
        PostSpace: {
            type: String,
        },
        PostSpaceUnit: {
            type: String,
        },
        Gatelength: [{
            type: String,
        }],
        NumberofGates: [{
            type: String,
        }],
        NumberofSticks: {
            type: Number,
        },
        GateDetails: [{
            type: String,
        }],
    }
); 

const fenceModel = mongoose.model("fence", fenceSchema);
module.exports = fenceModel;