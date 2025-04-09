const mongoose = require("mongoose");

const fertilizerSchema = mongoose.Schema(
    {
        FertilizerType: {
            type: String,
        },
        NoOfTimes: {
            type: String,
        },
        AmountOfOneTime: {
            type: String,
        },
        HowOften: {
            type: String,
        },
        unit:{
            type: String,
        },
      
    }
); 

const fertilizerModel = mongoose.model("fertilizer", fertilizerSchema);
module.exports = fertilizerModel;       