const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");
const MapTemplateSchema = require("../models/MapTemplateModel");

//cacculate the number of stick function
function calculateNumberOfSticks (perimeter,gapBetweenSticks,gapUnit,totalGateLengths,gateCount) {
  const convertedGap = convertToCommonUnit(gapBetweenSticks, gapUnit);
  const remainingPerimeter = perimeter - totalGateLengths;
  let numberOfSticks = Math.ceil(remainingPerimeter / convertedGap);
  if(gateCount>0){
    numberOfSticks -= gateCount;
    numberOfSticks += 2;
  }
  return numberOfSticks;
}

//convert unit function
function convertToCommonUnit(value, unit) {
  if (unit === "cm") {
    return value / 100;
  } else {
    return value;
  }
}

//calculate the total length of the gate 
const calculateTotalGateLengths = (numberOfGates, gateLengths) => {
  let totalLength = 0;
  for (let i = 0; i < numberOfGates.length; i++) {
    totalLength += numberOfGates[i] * gateLengths[i];
  }
  return totalLength;
};

function calculateSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += parseInt(array[i]);
  }
  return sum;
}

// create fence and save it in database API
router.post("/fence", async (req, res) => {
  try {
    const {
      id,
      FenceTypeselectedValue,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray,
      fenceLengthsArray,
      Perimeter,
    } = req.body;

    const perimeter = Perimeter*1000;
    const gapBetweenSticks = inputValuePostspace;
    const gapUnit = PostSpaceUnitselectedValue;
    const gateLength = fenceLengthsArray;
    const numberOfGates = fenceAmountsArray;
    const gateCount = calculateSum(numberOfGates);

    const totalGateLengths = calculateTotalGateLengths(numberOfGates,gateLength);
    const numberOfSticks = calculateNumberOfSticks(perimeter,gapBetweenSticks,gapUnit,totalGateLengths,gateCount);

    const newFence = new fenceModel({
      Id:id,
      FenceType: FenceTypeselectedValue,
      PostSpace: inputValuePostspace,
      PostSpaceUnit: PostSpaceUnitselectedValue,
      Gatelength: fenceLengthsArray,
      NumberofGates: fenceAmountsArray,
      NumberofSticks: numberOfSticks,
      GateDetails: displayValues,
    });

    await newFence.save();

    res.json({
      status: "ok",
      data: "Fence Created",
      totalGateLengths,
      gateCount,
      numberOfSticks,
    });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

//send data to the frontend page -API
router.get("/numberOfSticks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Fence = await fenceModel.findOne({ Id: id });
    const map = await MapTemplateSchema.findOne({ _id: id });
    if (!Fence && !map) {
      return res.status(404).json({ status: "error", message: "No recently updated data found" });
    }
    const numberOfSticks = Fence.NumberofSticks;
    const data = Fence.GateDetails;
    const fenceType = Fence.FenceType;
    const postSpace = Fence.PostSpace;
    const postSpaceUnit = Fence.PostSpaceUnit;
    const fenceamount = Fence.NumberofGates;
    const fenceLength = Fence.Gatelength;
    const Area = map.area;
    const Perimeter = map.perimeter;
    res.json({status: "success",postSpace,postSpaceUnit,Area,Perimeter,gateDetails: data,numberOfSticks,fenceType,fenceamount,fenceLength});    
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


// check id exists or not in the database - API
router.get("/check-id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await fenceModel.findOne({ Id: id });
    if (item) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

// delete data from the database - API
router.delete("/deleteFence/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedFence = await fenceModel.findOneAndDelete({ Id: id });
    if (!deletedFence) {
      return res.status(404).send('Fence not found.');
    }
    res.send('Fence deleted successfully.');
  } catch (error) {
    res.status(500).send('Error while deleting fence.');
  }
});


router.post("/fenceFromManualcal", async (req, res) => {
  try {
    const {
      FenceTypeselectedValue,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray, 
      fenceLengthsArray,
      Perimeter,
    } = req.body;

    const perimeter = Perimeter*1000;
    const gapBetweenSticks = inputValuePostspace;
    const gapUnit = PostSpaceUnitselectedValue;
    const gateLength = fenceLengthsArray;
    const numberOfGates = fenceAmountsArray;
    const gateCount = calculateSum(numberOfGates);

    const totalGateLengths = calculateTotalGateLengths(numberOfGates,gateLength);
    const numberOfSticks = calculateNumberOfSticks(perimeter,gapBetweenSticks,gapUnit,totalGateLengths,gateCount);

    res.json({
      status: "ok",
      data: "Fence Created",
      totalGateLengths,
      gateCount,
      numberOfSticks,
    });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

router.put("/fence/:id", async (req, res) => {
  try {
    const {
      FenceTypeselectedValue,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray,
      fenceLengthsArray,
      Perimeter,
    } = req.body;

    const id = req.params.id;

    const perimeter = Perimeter * 1000;
    const gapBetweenSticks = inputValuePostspace;
    const gapUnit = PostSpaceUnitselectedValue;
    const gateLength = fenceLengthsArray;
    const numberOfGates = fenceAmountsArray;
    const gateCount = calculateSum(numberOfGates);

    const totalGateLengths = calculateTotalGateLengths(numberOfGates, gateLength);
    const numberOfSticks = calculateNumberOfSticks(perimeter, gapBetweenSticks, gapUnit, totalGateLengths, gateCount);

    const updatedFence = await fenceModel.findOneAndUpdate(
      { Id: id },
      {
        FenceType: FenceTypeselectedValue,
        PostSpace: inputValuePostspace,
        PostSpaceUnit: PostSpaceUnitselectedValue,
        Gatelength: fenceLengthsArray,
        NumberofGates: fenceAmountsArray,
        NumberofSticks: numberOfSticks,
        GateDetails: displayValues,
      },
      { new: true }
    );

    if (!updatedFence) {
      return res.status(404).json({ status: "error", data: "Fence not found" });
    }

    res.json({
      status: "ok",
      data: "Fence Updated",
      totalGateLengths,
      gateCount,
      numberOfSticks,
      updatedFence,
    });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});


module.exports = router;