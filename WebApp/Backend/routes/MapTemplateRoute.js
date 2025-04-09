const express = require("express");
const cors = require("cors");
const router = express.Router();
const MapTemplateModel = require("../models/MapTemplateModel");
const fenceModel = require("../models/fence");
const plantationModel = require("../models/plantation");
const clearLandModel = require("../models/clearLand");

const turf = require("@turf/turf");
const MapModel = require("../models/MapModel");

router.use(cors());

/* this route is used to save map template */
router.post("/saveTemplate", async (req, res) => {
  try {
    let {
      perimeter,
      area,
      templateName,
      measureName,
      landType,
      location,
      description,
      locationPoints,
      imageUrl,
    } = req.body;
    area = parseFloat(area).toFixed(2);
    perimeter = parseFloat(perimeter).toFixed(2);
    const mapTemplate = new MapTemplateModel({
      area,
      perimeter,
      templateName,
      measureName,
      landType,
      location,
      description,
      locationPoints,
      imageUrl,
      userId: req.userId,
    });
    const savedMapTemplate = await mapTemplate.save();
    res.json({ ...savedMapTemplate._doc, userId: req.userId });
  } catch (error) {
    res.status(500).send(error);
  }
});

/* this route is used to get all map templates */
router.get("/getAllTemplates", async (req, res) => {
  try {
    const templates = await MapTemplateModel.find({ userId: req.userId });
    res.json(templates);
  } catch (error) {
    res.status(500).send("Error while getting templates.");
  }
});

/* this route is used to get one map template */
router.get("/getOneTemplate/:id", async (req, res) => {
  try {
    const template = await MapTemplateModel.findById(req.params.id);
    res.json(template);
  } catch (error) {
    res.status(500).send("Error while getting template.");
  }
});

/* this route is used to calculate area and perimeter */
const calculateArea = (locationPoints) => {
  const coordinates = locationPoints.map((point) => [
    point.longitude,
    point.latitude,
  ]);
  coordinates.push(coordinates[0]);

  const polygon = turf.polygon([coordinates]);
  const areaInSquareMeters = turf.area(polygon);
  const areaInPerches = parseFloat((areaInSquareMeters * 0.0395369).toFixed(4));
  return areaInPerches;
};

/* this route is used to update map template */
router.put("/updateTemplate/:id", async (req, res) => {
  try {
    const updatedTemplate = await MapTemplateModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updatedTemplate);
  } catch (error) {
    res.status(500).send("Error while updating map.");
  }
});

/* this route is used to delete map template */
router.delete("/deleteTemplate/:id", async (req, res) => {
  try {
    await MapTemplateModel.findByIdAndDelete(req.params.id);
    res.send("Map deleted successfully.");
  } catch (error) {
    res.status(500).send("Error while deleting map.");
  }
});

/* saving map item location points */
router.post("/saveMapPoints", async (req, res) => {
  try {
    const { locationPoints } = req.body;
    if (!locationPoints) {
      return res.status(400).send("Error: locationPoints are required.");
    }
    const map = new MapModel({ points: locationPoints });
    await map.save();
    res.send("Map saved successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
});

/* getting map item location points */
router.get("/getMapPoints/:id", async (req, res) => {
  try {
    const map = await MapModel.findById(req.params.id);
    res.json(map);
  } catch (error) {
    res.status(500).send("Error while getting map.");
  }
});

/* getting all map items location points */
router.get("/getAllMapPoints", async (req, res) => {
  try {
    const maps = await MapModel.find();
    res.json(maps);
  } catch (error) {
    res.status(500).send("Error while getting maps.");
  }
});

/* this route is used to save partition points */
router.put("/savePartitionPoints/:id", async (req, res) => {
  try {
    const { partitionPolygons } = req.body;
    const updatedTemplate = await MapTemplateModel.findByIdAndUpdate(
      req.params.id,
      { $set: { partitionPolygons } },
      { new: true }
    );

    if (!updatedTemplate) {
      return res.status(404).send("Template not found");
    }

    res.json(updatedTemplate);
  } catch (error) {
    console.error("Error saving partition points:", error);
    res.status(500).send("Error while saving partition points.");
  }
});

router.put(
  "/deletePartitionPolygon/:templateId/:polygonIndex",
  async (req, res) => {
    try {
      const { templateId, polygonIndex } = req.params;

      // Find the map template by ID
      const mapTemplate = await MapTemplateModel.findById(templateId);

      if (!mapTemplate) {
        return res.status(404).send("Template not found");
      }

      // Ensure polygonIndex is within bounds
      if (
        polygonIndex < 0 ||
        polygonIndex >= mapTemplate.partitionPolygons.length
      ) {
        return res.status(400).send("Invalid polygon index");
      }

      // Remove the specified partition polygon
      mapTemplate.partitionPolygons.splice(polygonIndex, 1);

      // Save the updated map template
      await mapTemplate.save();

      res.json(mapTemplate);
    } catch (error) {
      console.error("Error deleting partition polygon:", error);
      res.status(500).send("Error while deleting partition polygon.");
    }
  }
);

router.get("/getLocationAnalytics", async (req, res) => {
  try {
    const locationAnalytics = await MapTemplateModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $group: {
          _id: "$location",
          count: { $sum: 1 },
          users: { 
            $push: { 
              userId: { $arrayElemAt: ["$userDetails._id", 0] },
              fname: { $arrayElemAt: ["$userDetails.fname", 0] },
              lname: { $arrayElemAt: ["$userDetails.lname", 0] },
              email: { $arrayElemAt: ["$userDetails.email", 0] },
              templateName: "$templateName",
              area: "$area",
              landType: "$landType"
            }
          }
        }
      },
      {
        $sort: { count: -1 },
      },
    ]);
    console.log(locationAnalytics);
    res.json(locationAnalytics);
  } catch (error) {
    console.error("Error fetching location analytics:", error);
    res.status(500).send("Error while fetching location analytics.");
  }
});

router.get("/getAllmapData/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Fence = await fenceModel.findOne({ Id: id });
    const Plantation = await plantationModel.findOne({ Id: id });
    const ClearLand = await clearLandModel.findOne({ Id: id });
    const map = await MapTemplateModel.findOne({ _id: id });

    if (!map) {
      return res
        .status(404)
        .json({ status: "error", message: "Map not found" });
    }

    const response = {
      status: "success",
      mapDetails: {
        Area: map.area,
        Perimeter: map.perimeter,
        templateName: map.templateName,
        landType: map.landType,
        location: map.location,
        description: map.description,
      },
      fenceDetails: Fence ? {
        postSpace: Fence.PostSpace,
        postSpaceUnit: Fence.PostSpaceUnit,
        gateDetails: Fence.GateDetails,
        numberOfSticks: Fence.NumberofSticks,
        fenceType: Fence.FenceType,
        fenceAmount: Fence.NumberofGates,
        fenceLength: Fence.Gatelength,
      } : null,
      plantationDetails: Plantation ? {
        numberOfPlants: Plantation.NoOfPlants,
        plantType: Plantation.PlantType,
        plantSpace: Plantation.PlantSpace,
        rowSpace: Plantation.RowSpace,
        plantDensity: Plantation.PlantDensity,
        unit: Plantation.Unit,
      } : null,
      clearLandDetails: ClearLand ? {
        weedType: ClearLand.WeedType,
        effortOutput: ClearLand.EffortOutput,
        weedEffort: ClearLand.WeedEffort,
        plantEffort: ClearLand.PlantEffort,
        stoneEffort: ClearLand.StoneEffort,
        workDays: ClearLand.WorkDays,
        laborCount: ClearLand.LaborsCOunt,
        workHours: ClearLand.WorkHoursCount,
        plantDetails: ClearLand.PlantDetails,
        stoneDetails: ClearLand.StoneDetails,
        machineDetails: ClearLand.MachineDetails,
      } : null,
      
      locationPoints: map.locationPoints,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/getAllTemplates/:userId", async (req, res) => {
  try {
    const templates = await MapTemplateModel.find({ userId: req.params.userId });
    res.json(templates);
  } catch (error) {
    res.status(500).send("Error while getting templates.");
  }
});

module.exports = router;
