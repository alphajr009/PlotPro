const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
  fertilizer_name: { type: String, required: true },  
  fertilizer_type: { 
    type: String, 
    enum: ['Solid', 'Liquid', 'Dust'], 
    required: true 
  },  

  unit: { 
    type: String, 
    required: true 
  },  
  

 price_per_unit: { 
    price: { type: Number, required: true }, // Price for the fertilizer per unit (e.g., per gram or ml)
    currency_code: { type: String, required: true } // Currency code (e.g., 'LKR' for Sri Lankan Rupee)
  },

  country_code: { 
    type: String, 
    required: true 
  },  // Country code (e.g., 'LK' for Sri Lanka, 'US' for the United States)
  
  ingredients: [{
    ingredient_name: { type: String, required: true },  // Ingredient name (e.g., Nitrogen, Phosphorus, Potassium)
    percentage: { type: Number, required: true }  // Percentage of the ingredient in the fertilizer
  }],

  storage_instructions: { 
    temperature_range: { 
      min: { type: Number, required: true }, // Minimum temperature (°C)
      max: { type: Number, required: true }  // Maximum temperature (°C)
    }, 
    humidity_range: {
      min: { type: Number, required: true }, // Minimum humidity (%) for storage
      max: { type: Number, required: true }  // Maximum humidity (%) for storage
    },
    light_conditions: { 
      type: String, 
      enum: ['Low light', 'No light', 'Indirect light'], 
      required: true 
    },  // Light conditions for storage (e.g., no direct sunlight)
    description: { 
      type: String, 
      required: true 
    }  // Any other additional storage instructions
  },
  
  toxicity_level: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    required: true 
  },  // Toxicity level of the fertilizer
  
  safety_instructions: { 
    type: String, 
    required: true 
  }  // Safety instructions for handling the fertilizer
});


const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;
