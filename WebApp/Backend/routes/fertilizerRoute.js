const express = require("express");
const router = express.Router();
const fertilizerModel = require("../models/fertilizer");

const calculateFertilizerAmountForYear = (frequency, NoOfTimes, AmountOfOneTime, unit) => {
    let factor = 1;

    switch (frequency) {
        case "Daily":
            factor = 365;
            break;
        case "Weekly":
            factor = 4; 
            break;
        case "Monthly":
            factor = 12;
            break;
        case "Quarterly":
            factor = 4;
            break;
        case "Yearly":
            factor = 1;
            break;
        default:
            factor = 1;
    }

    const totalAmount = factor * NoOfTimes * AmountOfOneTime;

    if (unit === "g") {
        return totalAmount / 1000;
    } else {
        return totalAmount; 
    }

    
};

const calculateFertilizerAmountForPlantation = (totalAmount,numberOfPlants) => {
    return  totalAmount*numberOfPlants;
        
};


router.post("/fertilizer", async (req, res) => {
    
    try{
        const {textFertilizationType,textFertilizationNUmberoftime,textFertilizationAmount,FertilizerAmountUnitselectedValue,selectedButton,numberOfPlants} = req.body;
        const area = 2; 
        
        const NoOfTimes = textFertilizationNUmberoftime;
        const AmountOfOneTime = textFertilizationAmount;
        const unit = FertilizerAmountUnitselectedValue;
        const HowOften = selectedButton;
        const totalAmount = calculateFertilizerAmountForYear(HowOften, NoOfTimes, AmountOfOneTime, unit);
        const totalAmountForPlantation = calculateFertilizerAmountForPlantation(totalAmount,numberOfPlants);

        const newFertilizer = new fertilizerModel({
            AmountOfOneTime: textFertilizationAmount,
            NoOfTimes: textFertilizationNUmberoftime,
            FertilizerType: textFertilizationType,
            unit:FertilizerAmountUnitselectedValue,
            FertilizerAmountNeeded:totalAmount,
            FertilizerAmountNeededForPlantation:totalAmountForPlantation,
            HowOften:selectedButton
        })
      
        await newFertilizer.save();
        
        res.json({status:"ok" , data: {
            totalAmountForPlantation: totalAmountForPlantation,
            totalAmount: totalAmount

        }});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
});

router.post("/fertilizerFromManualCalculator", async (req, res) => {
    
    try{
        const {textFertilizationType,textFertilizationNUmberoftime,textFertilizationAmount,FertilizerAmountUnitselectedValue,selectedButton,numberOfPlants,area} = req.body;
         
        
        const NoOfTimes = textFertilizationNUmberoftime;
        const AmountOfOneTime = textFertilizationAmount;
        const unit = FertilizerAmountUnitselectedValue;
        const HowOften = selectedButton;
        const totalAmount = calculateFertilizerAmountForYear(HowOften, NoOfTimes, AmountOfOneTime, unit);
        const totalAmountForPlantation = calculateFertilizerAmountForPlantation(totalAmount,numberOfPlants);

        
      
     
        
        res.json({status:"ok" , data: {
            totalAmountForPlantation: totalAmountForPlantation,
            totalAmount: totalAmount

        }});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
});

module.exports = router;