const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const plantSchema = new Schema({
  // Basic plant information
  plant_name: { type: String, required: true },  // Name of the plant
  country: { type: String, required: true }, 
  scientific_name: { type: String, required: true },  // Scientific name of the plant
  days_to_yield: { type: Number, required: true },  // Number of days required for harvesting

  // Optimal growing conditions
  optimal_conditions: {
    temperature_range: { 
      min: { type: Number, required: true },  // Minimum temperature
      max: { type: Number, required: true }   // Maximum temperature
    },
    humidity_range: {  // Ideal humidity levels
      min: { type: Number, required: true },  // Minimum humidity percentage
      max: { type: Number, required: true }   // Maximum humidity percentage
    },
    soil_conditions: {  // Soil-related requirements
      soil_type: { type: String, required: true },  // Preferred soil type
      pH: { type: Number, required: true },  // Required soil pH level
      nutrient_content: {  // Nutrient requirements in soil
        nitrogen: {
          min: { type: Number, required: true },  // Minimum nitrogen content
          max: { type: Number, required: true }   // Maximum nitrogen content
        },
        phosphorus: {
          min: { type: Number, required: true },  // Minimum phosphorus content
          max: { type: Number, required: true }   // Maximum phosphorus content
        },
        potassium: {
          min: { type: Number, required: true },  // Minimum potassium content
          max: { type: Number, required: true }   // Maximum potassium content
        }
      },
      soil_moisture: {  // Moisture-related properties of soil
        ideal_moisture: { type: String, required: true },  // Ideal moisture level description
        drainage_requirement: { type: String, required: true }  // Drainage needs (e.g., well-drained, moderate)
      }
    },
    sunlight_requirements: {  // Required sunlight exposure
      min_hours_of_sunlight: { type: Number, required: true },  // Minimum hours per day
      max_hours_of_sunlight: { type: Number, required: true }   // Maximum hours per day
    }
  },

  // Watering instructions over different growth periods
  watering_instructions: [{
    water_amount: { type: String, required: true },  // Amount of water required
    frequency: { type: String, required: true },  // Watering frequency (e.g., daily, weekly)
    start_day: { type: Number, required: true },  // Starting day for this watering schedule
    end_day: { type: Number, required: true },  // Ending day for this watering schedule
    seasonal_adjustment: { type: String, required: true }  // Adjustments based on seasons
  }],

  // Fertilizer application details
  fertilizers: [{
    fertilizer_id: { type: Schema.Types.ObjectId, ref: 'Fertilizer', required: true },  // Reference to the Fertilizer model
    type: { type: String, required: true },  // Type of fertilizer
    amount: { type: String, required: true },  // Amount to be applied
    application_frequency: { type: String, required: true },  // How often the fertilizer should be applied
    start_day: { type: Number, required: true },  // Day to start applying
    end_day: { type: Number, required: true }  // Day to stop applying
  }],

  // List of common pests and diseases affecting the plant
  pests_and_diseases: [{
    name: { type: String, required: true },  // Name of the pest or disease
    disease_type: { type: String, required: true },  // Type of disease (e.g., fungal, bacterial)
    treatment: { type: String, required: true }  // Suggested treatment method
  }],

  // Crop growth monitoring details
  crop_growth_monitoring: {
    photos_required: { type: Boolean, required: true },  // Whether photos are needed for monitoring
    growth_stages: [{  // List of growth stages
      day: { type: Number, required: true },  // Day number of this growth stage
      stage: { type: String, required: true }  // Description of the stage
    }]
  },

  // Soil testing recommendations
  soil_testing: {
    nutrient_deficiency: {  // Deficiency levels for essential nutrients
      nitrogen: { min: { type: Number, required: true }, max: { type: Number, required: true } },
      phosphorus: { min: { type: Number, required: true }, max: { type: Number, required: true } },
      potassium: { min: { type: Number, required: true }, max: { type: Number, required: true } }
    },
    organic_content: { type: String, required: true },  // Organic matter content description
    salinity: { type: String, required: true }  // Soil salinity level
  },

  // Planting and harvesting guidelines
  planting_and_harvest_guidelines: {
    best_planting_window: {  // Best months for planting
      start_month: { type: String, required: true },  // Start month (e.g., March)
      end_month: { type: String, required: true }  // End month (e.g., May)
    },
    harvest_window: {  // Expected harvesting months
      start_month: { type: String, required: true },  // Start month
      end_month: { type: String, required: true }  // End month
    }
  },

  // Companion planting recommendations
  crop_companion: [{
    companion_crop_name: { type: String, required: true },  // Name of the companion plant
    compatibility: { type: String, required: true },  // Whether it is compatible (e.g., "Good", "Bad")
    reason: { type: String, required: true }  // Explanation for compatibility
  }],

  // Crop rotation suggestions
  crop_rotations: [{
    next_crop: { type: String, required: true },  // Suggested next crop
    soil_improvement: { type: String, required: true }  // Benefit to the soil (e.g., nitrogen fixation)
  }],

  // Suitable climatic zones
  climatic_zones: {
    ideal_climatic_zone: { type: String, required: true },  // Best climatic zone for growing
    tolerated_climatic_zones: [{ type: String, required: true }]  // Other zones where it can grow
  }
});

// Create a Mongoose model based on the schema
const Plants = mongoose.model('Plant', plantSchema);

// Export the model to use it in other parts of the application
module.exports = Plants;
