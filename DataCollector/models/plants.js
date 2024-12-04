const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  plant_name: { type: String, required: true },
  country: { type: String, required: true },
  scientific_name: { type: String, required: true },
  days_to_yield: { type: Number, required: true },

  optimal_conditions: {
    temperature_range: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    humidity_range: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    soil_conditions: {
      soil_type: { type: String, required: true },
      pH: { type: Number, required: true },
      nutrient_content: {
        nitrogen: {
          min: { type: Number, required: true },
          max: { type: Number, required: true }
        },
        phosphorus: {
          min: { type: Number, required: true },
          max: { type: Number, required: true }
        },
        potassium: {
          min: { type: Number, required: true },
          max: { type: Number, required: true }
        }
      },
      soil_moisture: {
        ideal_moisture: { type: String, required: true },
        drainage_requirement: { type: String, required: true }
      }
    },
    sunlight_requirements: {
      min_hours_of_sunlight: { type: Number, required: true },
      max_hours_of_sunlight: { type: Number, required: true }
    }
  },

  watering_instructions: [{
    water_amount: { type: String, required: true },
    frequency: { type: String, required: true },
    start_day: { type: Number, required: true },
    end_day: { type: Number, required: true },
    seasonal_adjustment: { type: String, required: true }
  }],

  fertilizers: [{
    fertilizer_id: { type: Schema.Types.ObjectId, ref: 'Fertilizer', required: true },
    type: { type: String, required: true },
    amount: { type: String, required: true },
    application_frequency: { type: String, required: true },
    start_day: { type: Number, required: true },
    end_day: { type: Number, required: true }
  }],

  pests_and_diseases: [{
    name: { type: String, required: true },
    disease_type: { type: String, required: true },
    treatment: { type: String, required: true }
  }],

  crop_growth_monitoring: {
    photos_required: { type: Boolean, required: true },
    growth_stages: [{
      day: { type: Number, required: true },
      stage: { type: String, required: true }
    }]
  },

  soil_testing: {
    nutrient_deficiency: {
      nitrogen: { min: { type: Number, required: true }, max: { type: Number, required: true } },
      phosphorus: { min: { type: Number, required: true }, max: { type: Number, required: true } },
      potassium: { min: { type: Number, required: true }, max: { type: Number, required: true } }
    },
    organic_content: { type: String, required: true },
    salinity: { type: String, required: true }
  },

  planting_and_harvest_guidelines: {
    best_planting_window: {
      start_month: { type: String, required: true },
      end_month: { type: String, required: true }
    },
    harvest_window: {
      start_month: { type: String, required: true },
      end_month: { type: String, required: true }
    }
  },

  crop_companion: [{
    companion_crop_name: { type: String, required: true },
    compatibility: { type: String, required: true },
    reason: { type: String, required: true }
  }],

  crop_rotations: [{
    next_crop: { type: String, required: true },
    soil_improvement: { type: String, required: true }
  }],

  climatic_zones: {
    ideal_climatic_zone: { type: String, required: true },
    tolerated_climatic_zones: [{ type: String, required: true }]
  }
});

const Plants = mongoose.model('Plant', plantSchema);

module.exports = Plants;
