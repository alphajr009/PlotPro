import React, { useState, useEffect } from "react";
import { Button, Input, Select, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AxiosInstance from "../AxiosInstance";

const { Option } = Select;

const FenceSetupModal = ({
  visible,
  onClose,
  area,
  perimeter,
  onSave,
  existingData,
}) => {
  const [fenceType, setFenceType] = useState("");
  const [postSpacing, setPostSpacing] = useState("");
  const [postSpacingUnit, setPostSpacingUnit] = useState("m");
  const [gateCount, setGateCount] = useState("");
  const [gateLength, setGateLength] = useState("");
  const [gateLengthUnit, setGateLengthUnit] = useState("m");
  const [fenceLengthsArray, setFenceLengthsArray] = useState([]);
  const [fenceAmountsArray, setFenceAmountsArray] = useState([]);
  const [displayValues, setDisplayValues] = useState([]);
  const [numberOfSticks, setNumberOfSticks] = useState(0);

  useEffect(() => {
    if (existingData) {
      setFenceType(existingData.fenceType || "");
      setPostSpacing(
        existingData.postSpacing ? existingData.postSpacing.toString() : ""
      );
      setPostSpacingUnit(existingData.postSpacingUnit || "m");
      setNumberOfSticks(existingData.numberOfSticks || 0);
  
      // Handle gates
      if (existingData.gates && existingData.gates.length > 0) {
        const newFenceLengthsArray = [];
        const newFenceAmountsArray = [];
        const newDisplayValues = [];
  
        existingData.gates.forEach(gate => {
          newFenceLengthsArray.push(gate.length);
          newFenceAmountsArray.push(gate.count);
          newDisplayValues.push(`${gate.length}m x ${gate.count}`);
        });
  
        setFenceLengthsArray(newFenceLengthsArray);
        setFenceAmountsArray(newFenceAmountsArray);
        setDisplayValues(newDisplayValues);
      } else {
        // Reset gate-related states if no gates exist
        setFenceLengthsArray([]);
        setFenceAmountsArray([]);
        setDisplayValues([]);
      }
  
      // Reset individual gate input fields
      setGateLength("");
      setGateCount("");
      setGateLengthUnit("m");
    }
  }, [existingData]);

  const handleCalculate = async () => {
    // Validate inputs
    if (!fenceType || !postSpacing || fenceLengthsArray.length === 0) {
      message.error(
        "Please fill in all required fields and add at least one gate"
      );
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "/api/fence/fenceFromManualcal",
        {
          FenceTypeselectedValue: fenceType,
          inputValuePostspace: postSpacing,
          PostSpaceUnitselectedValue: postSpacingUnit,
          displayValues,
          fenceAmountsArray,
          fenceLengthsArray,
          Perimeter: perimeter/1000,
        }
      );

      // Handle the response
      const { numberOfSticks } = response.data;
      setNumberOfSticks(numberOfSticks);

      // You might want to show a success message or update other state variables
      message.success("Calculation completed successfully");

      // If you want to show the results in a new view, you could do something like:
      // setCurrentPage("FenceDetailsManual");
      // setAnimatePage(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.error("Failed to calculate. Please try again.");
    }
  };

  const handleAddGate = () => {
    if (!gateLength.trim() || !gateCount.trim()) {
      message.error("Please fill both gate length and count");
      return;
    }

    const length = parseFloat(gateLength);
    const count = parseInt(gateCount);

    if (isNaN(length) || isNaN(count)) {
      message.error("Please enter valid numbers");
      return;
    }

    setFenceLengthsArray([...fenceLengthsArray, length]);
    setFenceAmountsArray([...fenceAmountsArray, count]);
    const combinedValue = `${length}m x ${count}`;
    setDisplayValues([...displayValues, combinedValue]);
    setGateLength("");
    setGateCount("");
  };

  const handleRemoveGate = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);

    const newFenceLengthsArray = [...fenceLengthsArray];
    newFenceLengthsArray.splice(index, 1);
    setFenceLengthsArray(newFenceLengthsArray);

    const newFenceAmountsArray = [...fenceAmountsArray];
    newFenceAmountsArray.splice(index, 1);
    setFenceAmountsArray(newFenceAmountsArray);
  };

  const handleSave = () => {
    if (!fenceType || !postSpacing || fenceLengthsArray.length === 0) {
      message.error(
        "Please fill in all required fields and add at least one gate"
      );
      return;
    }

    const postSpacingInMeters = convertToCommonUnit(
      parseFloat(postSpacing),
      postSpacingUnit
    );

    const saveData = {
      fenceType,
      postSpacing: postSpacingInMeters,
      postSpacingUnit,
      gates: fenceLengthsArray.map((length, index) => ({
        length,
        count: fenceAmountsArray[index],
      })),
      numberOfSticks,
    };
    onSave(saveData);
    onClose();
  };
  const convertToCommonUnit = (value, unit) =>
    unit === "cm" ? value / 100 : value;

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
      <h4>Fence Setup</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>
          Area: {area} m<sup>2</sup>
        </p>
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>
          Perimeter: {perimeter} m
        </p>
      </div>
      <hr />

      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>Fence Type</p>
        <Select
          style={{ width: "65%" }}
          value={fenceType}
          onChange={(value) => setFenceType(value)}
          placeholder="Select Fence Type"
        >
          <Option value="Wood">Wood</Option>
          <Option value="Metal">Metal</Option>
          <Option value="Fiber">Fiber</Option>
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
        <p style={{ fontSize: "14px", marginLeft: "10px" }}>Post Space</p>
        <Input
          placeholder="Post Spacing"
          style={{ width: "35%", marginRight: "1px" }}
          value={postSpacing}
          onChange={(e) => setPostSpacing(e.target.value)}
        />
        <Select
          style={{ width: "25%" }}
          value={postSpacingUnit}
          onChange={(value) => setPostSpacingUnit(value)}
        >
          <Option value="m">m</Option>
          <Option value="cm">cm</Option>
        </Select>
      </div>

      <h6
        style={{ marginLeft: "10px", marginBottom: "10px", marginTop: "10px" }}
      >
        Gate details
      </h6>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "max-content",
          backgroundColor: "whitesmoke",
          marginTop: 10,
          padding: 10,
          borderRadius: 11,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 6,
        }}
      >
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "12px", marginLeft: "10px" }}>Gate Length</p>
          <Input
            placeholder="Gate Length"
            style={{ width: "65%", marginRight: "1px" }}
            value={gateLength}
            onChange={(e) => setGateLength(e.target.value)}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <p style={{ fontSize: "12px", marginLeft: "10px" }}>Gate Count</p>
          <Input
            placeholder="Gate Count"
            value={gateCount}
            onChange={(e) => setGateCount(e.target.value)}
            style={{ width: "65%" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            onClick={handleAddGate}
            style={{
              width: "30%",
              marginBottom: "10px",
              marginTop: "10px",
              height: "30px",
            }}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 8,
            alignItems: "center",
            backgroundColor: "whitesmoke",
            height: "max-content",
            borderRadius: 11,
            width: "100%",
          }}
        >
          {displayValues.map((value, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "white",
                marginRight: 3,
                marginLeft: 3,
                marginBottom: 10,
                borderRadius: 8,
                padding: 2,
                width: "30%",
                height: 30,
                border: "1px solid lightblue",
              }}
            >
              <span style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}>
                {value}
              </span>
              <button
                onClick={() => handleRemoveGate(index)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <IoIosCloseCircleOutline
                  name="close-circle-outline"
                  size={20}
                  color="#007BFF"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {numberOfSticks > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Number of sticks needed: {numberOfSticks}</p>
        </div>
      )}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={handleCalculate}
          style={{
            width: "47%",
            marginBottom: "10px",
            marginTop: "10px",
            //backgroundColor: "lightgreen",
            //color: "white",
          }}
        >
          Calculate
        </Button>
        <Button style={{ width: "47%" }} onClick={handleSave}>
          save
        </Button>
      </div>
    </div>
  );
};

export default FenceSetupModal;
