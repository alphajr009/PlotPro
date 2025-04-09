const mongoose = require("mongoose");

const plantationSchema = mongoose.Schema(
    {
        Id: {
            type: String,
        },
        PlantType: {
            type: String,
        },
        PlantSpace: {
            type: String,
        },
        RowSpace: {
            type: String,
        },
        NoOfPlants:
        {
            type: String,
        },
        PlantDensity:
        {
            type: String,
        },
        Unit:{
            type: String,
        }
       
    }
); 

const plantationModel = mongoose.model("plantation", plantationSchema);
module.exports = plantationModel;     