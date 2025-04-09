const mongoose = require("mongoose");

const InputSchema = mongoose.Schema(
    {
        Type: {
          type: String,
          required: true,
        },
        Name: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
); 

const InputModel = mongoose.model("inputs", InputSchema);
module.exports = InputModel;