import React, { useState, useEffect } from "react";
import { Button, Input, Select, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;

const PlantationSetupModal = ({
  visible,
  onClose,
  area,
  perimeter,
  onSave,
  existingData,
}) => {
  const [plantType, setPlantType] = useState("");
  const [plantSpacing, setPlantSpacing] = useState("");
  const [rowSpacing, setRowSpacing] = useState("");
  const [plantSpacingUnit, setPlantSpacingUnit] = useState("m");
  const [rowSpacingUnit, setRowSpacingUnit] = useState("m");
  const [numberOfPlants, setNumberOfPlants] = useState(null);
  const [plantationDensity, setPlantationDensity] = useState(null);
  const [showFertilizer, setShowFertilizer] = useState(false);
  const [fertilizerType, setFertilizerType] = useState("");
  const [fertilizerFrequency, setFertilizerFrequency] = useState("");
  const [fertilizerTimes, setFertilizerTimes] = useState("");
  const [fertilizerAmount, setFertilizerAmount] = useState("");
  const [fertilizerUnit, setFertilizerUnit] = useState("kg");
  const [fertilizerPerPlant, setFertilizerPerPlant] = useState(null);
  const [totalFertilizerPerYear, setTotalFertilizerPerYear] = useState(null);
  const hasPlantationResults =
    numberOfPlants !== null && plantationDensity !== null;

  useEffect(() => {
    if (existingData) {
      setPlantType(existingData.plantType || "");
      setPlantSpacing(
        existingData.plantSpacing ? existingData.plantSpacing.toString() : ""
      );
      setRowSpacing(
        existingData.rowSpacing ? existingData.rowSpacing.toString() : ""
      );
      setNumberOfPlants(existingData.numberOfPlants || null);
      setPlantationDensity(existingData.plantationDensity || null);
      setShowFertilizer(!!existingData.fertilizerData);

      if (existingData.fertilizerData) {
        setFertilizerType(existingData.fertilizerData.fertilizerType || "");
        setFertilizerFrequency(
          existingData.fertilizerData.fertilizerFrequency || ""
        );
        setFertilizerTimes(
          existingData.fertilizerData.fertilizerTimes
            ? existingData.fertilizerData.fertilizerTimes.toString()
            : ""
        );
        setFertilizerAmount(
          existingData.fertilizerData.fertilizerAmount
            ? existingData.fertilizerData.fertilizerAmount.toString()
            : ""
        );
        setFertilizerUnit(existingData.fertilizerData.fertilizerUnit || "kg");
        setTotalFertilizerPerYear(
          existingData.fertilizerData.totalFertilizerPerYear || null
        );
        setFertilizerPerPlant(
          existingData.fertilizerData.fertilizerPerPlant || null
        );
      }
    }
  }, [existingData]);

  useEffect(() => {
    // Recalculate when area or perimeter changes
    if (plantSpacing && rowSpacing) {
      handleCalculatePlantation();
    }
  }, [area, perimeter]);

  const handleSave = () => {
    if (!plantType || !plantSpacing || !rowSpacing) {
      message.error("Please fill in all plantation fields");
      return;
    }

    const plantSpacingInMeters = convertToCommonUnit(
      parseFloat(plantSpacing),
      plantSpacingUnit
    );
    const rowSpacingInMeters = convertToCommonUnit(
      parseFloat(rowSpacing),
      rowSpacingUnit
    );

    const numberOfPlants = calculateNumberOfPlants(
      area,
      plantSpacingInMeters,
      rowSpacingInMeters
    );
    const plantationDensity = calculatePlantationDensity(
      area,
      plantSpacingInMeters,
      rowSpacingInMeters
    );

    const fertilizerData = {
      fertilizerType,
      fertilizerFrequency,
      fertilizerTimes: parseInt(fertilizerTimes),
      fertilizerAmount: parseFloat(fertilizerAmount),
      fertilizerUnit,
      totalFertilizerPerYear,
      fertilizerPerPlant,
    };

    const saveData = {
      plantType,
      plantSpacing: plantSpacingInMeters,
      rowSpacing: rowSpacingInMeters,
      numberOfPlants,
      plantationDensity,
      fertilizerData,
    };

    onSave(saveData);
    onClose();
  };

  const handleClearResults = () => {
    setNumberOfPlants(null);
    setPlantationDensity(null);
    setPlantType("");
    setPlantSpacing("");
    setPlantSpacingUnit("m");
    setRowSpacing("");
    setRowSpacingUnit("m");
    setShowFertilizer(false);
    setFertilizerType("");
    setFertilizerFrequency("monthly");
    setFertilizerTimes("");
    setFertilizerAmount("");
    setFertilizerUnit("kg");
    setTotalFertilizerPerYear(null);
    setFertilizerPerPlant(null);
  };

  const handleCalculatePlantation = () => {
    if (!plantType || !plantSpacing || !rowSpacing) {
      message.error("Please fill in all plantation fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/;
    if (!regex.test(plantSpacing) || !regex.test(rowSpacing)) {
      message.error("Please enter valid values for plant and row spacing");
      return;
    }

    const plantSpacingInMeters = convertToCommonUnit(
      parseFloat(plantSpacing),
      plantSpacingUnit
    );
    const rowSpacingInMeters = convertToCommonUnit(
      parseFloat(rowSpacing),
      rowSpacingUnit
    );

    const numberOfPlants = calculateNumberOfPlants(
      area,
      plantSpacingInMeters,
      rowSpacingInMeters
    );
    const plantationDensity = calculatePlantationDensity(
      area,
      plantSpacingInMeters,
      rowSpacingInMeters
    );

    setNumberOfPlants(numberOfPlants);
    setPlantationDensity(plantationDensity);

    message.success(
      `Calculated: ${numberOfPlants} plants, Density: ${plantationDensity.toFixed(
        2
      )} plants/sq m`
    );
  };

  const convertToCommonUnit = (value, unit) =>
    unit === "cm" ? value / 100 : value;

  const calculateNumberOfPlants = (area, plantSpacing, rowSpacing) => {
    const areaPerPlant = plantSpacing * rowSpacing;
    return Math.floor(area / areaPerPlant);
  };

  const calculatePlantationDensity = (area, plantSpacing, rowSpacing) => {
    const areaPerPlant = plantSpacing * rowSpacing;
    const numberOfPlants = Math.floor(area / areaPerPlant);
    return numberOfPlants / area;
  };

  const handleCalculateFertilizer = () => {
    if (
      !fertilizerType ||
      !fertilizerTimes ||
      !fertilizerAmount ||
      !numberOfPlants
    ) {
      message.error(
        "Please fill in all fertilizer fields and calculate plantation first"
      );
      return;
    }

    const regex = /^\d+(\.\d+)?$/;
    if (!regex.test(fertilizerTimes) || !regex.test(fertilizerAmount)) {
      message.error(
        "Please enter valid values for fertilizer times and amount"
      );
      return;
    }

    const times = parseInt(fertilizerTimes);
    const amount = parseFloat(fertilizerAmount);

    const amountInKg = fertilizerUnit === "g" ? amount / 1000 : amount;

    let totalPerYear;
    switch (fertilizerFrequency) {
      case "daily":
        totalPerYear = amountInKg * times * 365;
        break;
      case "weekly":
        totalPerYear = amountInKg * times * 52;
        break;
      case "monthly":
        totalPerYear = amountInKg * times * 12;
        break;
      case "quarterly":
        totalPerYear = amountInKg * times * 4;
        break;
      case "yearly":
        totalPerYear = amountInKg * times;
        break;
      default:
        totalPerYear = 0;
    }

    const perPlantPerYear = totalPerYear * numberOfPlants;

    setTotalFertilizerPerYear(totalPerYear);
    setFertilizerPerPlant(perPlantPerYear);

    message.success(`Fertilizer calculation complete`);
  };
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "300px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "20px",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <CloseOutlined
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={onClose}
      />
      <h4>Plantation</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>
          Area: {area} m<sup>2</sup>
        </p>
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>
          Perimeter: {perimeter} m
        </p>
        <hr></hr>
      </div>

      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>Plant Type</p>
        <Input
          placeholder="Plant Type"
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          style={{ width: "65%" }}
        />
      </div>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>Plant Space</p>
        <Input
          placeholder="Plant Spacing"
          style={{ width: "35%", marginRight: "1px" }}
          value={plantSpacing}
          onChange={(e) => setPlantSpacing(e.target.value)}
        />
        <Select
          style={{ width: "25%" }}
          value={plantSpacingUnit}
          onChange={(value) => setPlantSpacingUnit(value)}
        >
          <Option value="m">m</Option>
          <Option value="cm">cm</Option>
        </Select>
      </div>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>Row Space</p>
        <Input
          placeholder="Row Spacing"
          style={{ width: "35%", marginRight: "1px" }}
          value={rowSpacing}
          onChange={(e) => setRowSpacing(e.target.value)}
        />
        <Select
          style={{ width: "25%" }}
          value={rowSpacingUnit}
          onChange={(value) => setRowSpacingUnit(value)}
        >
          <Option value="m">m</Option>
          <Option value="cm">cm</Option>
        </Select>
      </div>

      {numberOfPlants !== null && plantationDensity !== null && (
        <div style={{ marginTop: "10px", marginBottom: "15px" }}>
          <h5>Plantation Details</h5>
          <p>Number of Plants: {numberOfPlants}</p>
          <p>
            Plantation Density: {plantationDensity.toFixed(2)} plants/sq meters
          </p>
        </div>
      )}

      <div style={{ marginTop: "15px" }}>
        <Button
          type="primary"
          onClick={handleCalculatePlantation}
          style={{ marginRight: "40px" }}
        >
          Calculate Plantation
        </Button>
        <Button onClick={handleClearResults}>Clear</Button>

        {showFertilizer && hasPlantationResults && (
          <div>
            <h4 style={{ marginTop: "8px" }}>Fertilizer</h4>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>
                Fertilizer Type
              </p>
              <Input
                placeholder="Fertilizer Type"
                value={fertilizerType}
                onChange={(e) => setFertilizerType(e.target.value)}
                style={{ width: "65%" }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Frequency</p>
              <Select
                style={{ width: "65%" }}
                value={fertilizerFrequency}
                onChange={(value) => setFertilizerFrequency(value)}
              >
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="quarterly">Quarterly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>
                Number of Times
              </p>
              <Input
                placeholder="Number of Times"
                value={fertilizerTimes}
                onChange={(e) => setFertilizerTimes(e.target.value)}
                style={{ width: "73%" }}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Amount</p>
              <Input
                placeholder="Amount"
                style={{ width: "35%", marginLeft: "23px" }}
                value={fertilizerAmount}
                onChange={(e) => setFertilizerAmount(e.target.value)}
              />
              <Select
                style={{ width: "25%" }}
                value={fertilizerUnit}
                onChange={(value) => setFertilizerUnit(value)}
              >
                <Option value="kg">kg</Option>
                <Option value="g">g</Option>
              </Select>
            </div>
            <Button type="primary" onClick={handleCalculateFertilizer}>
              Calculate Fertilizer
            </Button>
            {totalFertilizerPerYear !== null && fertilizerPerPlant !== null && (
              <div style={{ marginTop: "8px" }}>
                <h5>Fertilizer Results</h5>
                <p>
                  Total fertilizer per year: {totalFertilizerPerYear.toFixed(2)}{" "}
                  kg
                </p>
                <p>
                  Fertilizer per plantation per year:{" "}
                  {fertilizerPerPlant.toFixed(2)} kg
                </p>
              </div>
            )}
          </div>
        )}

        {hasPlantationResults && (
          <div
            style={{
              marginTop: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setShowFertilizer(!showFertilizer)}
              style={{
                width: "47%",
                marginBottom: "10px",
                marginTop: "10px",
                backgroundColor: "lightgreen",
                color: "white",
              }}
            >
              {showFertilizer ? "Hide Fertilizer" : "Show Fertilizer"}
            </Button>
            <Button style={{ width: "47%" }} onClick={handleSave}>
              save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantationSetupModal;
