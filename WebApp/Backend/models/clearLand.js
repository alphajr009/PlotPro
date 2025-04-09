const mongoose = require("mongoose");
// const { default: EffortOutput } = require("../../MobileApp/app/src/screens/ClearLand/EffortOutput");

const clearLandSchema = mongoose.Schema(
    {   
        Id: {
            type: String,
        },
        WeedType: {
            type: String,
        },
        PlantDetails: [{
            type: String,
        }],
        StoneDetails: [{
            type: String,
        }],
        LaborsCOunt: {
            type: String,
        },
        WorkHoursCount: {
            type: String,
        },
        MachineDetails: [{
            type: String,
        }],
        WeedEffort: {
            type: Number,
        },
        PlantEffort: {
            type: Number,
        },
        StoneEffort: {
            type: Number,
        },
        EffortOutput: {
            type: Number,
        },
        WorkDays : {
            type: Number,
        },
    }
    );

const clearLandModel = mongoose.model("clearLand", clearLandSchema);
module.exports = clearLandModel;
