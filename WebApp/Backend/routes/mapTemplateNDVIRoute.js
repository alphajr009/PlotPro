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


/* this route is used to get one map template */
router.get("/getOneTemplate/:id", async (req, res) => {
  try {
    const template = await MapTemplateModel.findById(req.params.id);
    res.json(template);
  } catch (error) {
    res.status(500).send("Error while getting template.");
  }
});

module.exports = router;
