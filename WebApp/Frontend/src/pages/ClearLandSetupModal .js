import React, { useState, useEffect } from "react";
import { Button, Input, Select, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AxiosInstance from "../AxiosInstance";

const { Option } = Select;

  const calculateEffortOutput = (weedEffort, plantEffort, stoneEffort) => {
    return Math.ceil(weedEffort + plantEffort + stoneEffort);
  };
  
  const calculateWeedEffort = (weedType, area, laborsCount, machineDetails) => {
    let weedEffort = 0;
    let totalWeedEffort = 0;
    const machineEffortValues = { Backhoes: 0.714, Excavators: 0.0593 };
    const weedEffortValues = { low: 0.036, medium: 0.042, high: 0 };
  
    if (weedType === "low" || weedType === "medium") {
      weedEffort = weedEffortValues[weedType];
      totalWeedEffort = (weedEffort / laborsCount) * area;
    }
    if (weedType === "high") {
      if (machineDetails) {
        machineDetails.forEach(({ type, count }) => {
          if (type === "Backhoes") {
            weedEffort = machineEffortValues[type] / parseInt(count);
          }
          if (type === "Excavators") {
            weedEffort = machineEffortValues[type] / parseInt(count);
          }
          if (type !== "Backhoes" && type !== "Excavators") {
            weedEffort = 0.714;
          }
        });
      }
      totalWeedEffort = (weedEffort * area) / 60;
    }
    return totalWeedEffort;
  };
  
  const calculatePlantEffort = (plantDetails, machineDetails) => {
    let plantEffort = 0;
    let chainsawCount = 1;
    const plantEffortValues = { Low: 1 / 12, Medium: 0.25, High: 0.5 };
  
    if (machineDetails) {
      machineDetails.forEach(({ type, count }) => {
        if (type === "Chainsaws") {
          chainsawCount = parseInt(count);
        }
      });
    }
  
    plantDetails.forEach(({ count, type }) => {
      const effortPerPlant = plantEffortValues[count];
      plantEffort += effortPerPlant * parseInt(type);
    });
  
    return plantEffort / chainsawCount;
  };
  
  const calculateStoneEffort = (stoneDetails, machineDetails) => {
    let stoneEffort = 0;
    let breakerCount = 1;
    let totalStoneEffort = 0;
    const stoneEffortValues = { Small: 0.5, High: 1 };
  
    if (machineDetails) {
      machineDetails.forEach(({ type, count }) => {
        if (type === "Excavator breakers") {
          breakerCount = parseInt(count);
        }
      });
    }
  
    stoneDetails.forEach(({ count, type }) => {
      const effortPerStone = stoneEffortValues[count];
      stoneEffort += effortPerStone * parseInt(type);
    });
  
    totalStoneEffort = stoneEffort / breakerCount;
    return totalStoneEffort;
  };
  
  const calculateWorkDays = (effort, workHours) => {
    const fulldays = Math.floor(effort / workHours);
    const remainingHours = effort % workHours;
    const totalDays = remainingHours === 0 ? fulldays : fulldays + 1;
    return totalDays;
  };
  
  const ClearLandSetupModal = ({
    visible,
    onClose,
    area,
    perimeter,
    onSave,
    existingData,
  }) => {
    const [activeSection, setActiveSection] = useState(null);
  
    // Weed section states
    const [weedType, setWeedType] = useState("");
    const [labourCount, setLabourCount] = useState("");
    const [workHours, setWorkHours] = useState("");
    const [machineType, setMachineType] = useState("");
    const [machineCount, setMachineCount] = useState("");
    const [machineList, setMachineList] = useState([]);
  
    // Plant section states
    const [plantType, setPlantType] = useState("");
    const [plantCount, setPlantCount] = useState("");
    const [plantList, setPlantList] = useState([]);
    const [plantWorkHours, setPlantWorkHours] = useState("");
    const [plantMachineType, setPlantMachineType] = useState("");
    const [plantMachineCount, setPlantMachineCount] = useState("");
    const [plantMachineList, setPlantMachineList] = useState([]);
  
    // Stone section states
    const [stoneType, setStoneType] = useState("");
    const [stoneCount, setStoneCount] = useState("");
    const [stoneList, setStoneList] = useState([]);
    const [stoneWorkHours, setStoneWorkHours] = useState("");
    const [stoneMachineType, setStoneMachineType] = useState("");
    const [stoneMachineCount, setStoneMachineCount] = useState("");
    const [stoneMachineList, setStoneMachineList] = useState([]);
  
    // Calculation result states
    const [weedCalculationResults, setWeedCalculationResults] = useState(null);
    const [plantCalculationResults, setPlantCalculationResults] = useState(null);
    const [stoneCalculationResults, setStoneCalculationResults] = useState(null);
  
    useEffect(() => {
      if (existingData) {
        // Load existing data if available
        setWeedType(existingData.weedData.weedType || "");
        setLabourCount(existingData.weedData.labourCount || "");
        setWorkHours(existingData.weedData.workHours || "");
        setMachineList(existingData.weedData.machineList|| []);
        setWeedCalculationResults(existingData.weedData.weedCalculationResults || null);
        setPlantList(existingData.plantData.plantList || []);
        setPlantMachineList(existingData.plantData.plantMachineList || []);
        setPlantCalculationResults(existingData.plantData.plantCalculationResults || null);
        setStoneList(existingData.stoneData.stoneList || []);
        setStoneMachineList(existingData.stoneData.stoneMachineList || []);
        setStoneCalculationResults(existingData.stoneData.stoneCalculationResults || null);
      }
    }, [existingData]);
  
    const handleAddMachine = (type) => {
      if (type === "weed") {
        if (!machineType || !machineCount) {
          message.error("Please select a machine type and enter a count");
          return;
        }
        const newMachine = `${machineType} x ${machineCount}`;
        setMachineList([...machineList, newMachine]);
        setMachineType("");
        setMachineCount("");
      } else if (type === "plant") {
        if (!plantMachineType || !plantMachineCount) {
          message.error("Please select a machine type and enter a count");
          return;
        }
        const newMachine = `${plantMachineType} x ${plantMachineCount}`;
        setPlantMachineList([...plantMachineList, newMachine]);
        setPlantMachineType("");
        setPlantMachineCount("");
      } else if (type === "stone") {
        if (!stoneMachineType || !stoneMachineCount) {
          message.error("Please select a machine type and enter a count");
          return;
        }
        const newMachine = `${stoneMachineType} x ${stoneMachineCount}`;
        setStoneMachineList([...stoneMachineList, newMachine]);
        setStoneMachineType("");
        setStoneMachineCount("");
      }
    };
  
    const handleRemoveMachine = (index, type) => {
      if (type === "weed") {
        const newMachineList = [...machineList];
        newMachineList.splice(index, 1);
        setMachineList(newMachineList);
      } else if (type === "plant") {
        const newMachineList = [...plantMachineList];
        newMachineList.splice(index, 1);
        setPlantMachineList(newMachineList);
      } else if (type === "stone") {
        const newMachineList = [...stoneMachineList];
        newMachineList.splice(index, 1);
        setStoneMachineList(newMachineList);
      }
    };
  
    const handleAddPlant = () => {
      if (!plantType || !plantCount) {
        message.error("Please select a plant type and enter a count");
        return;
      }
      const newPlant = `${plantType} x ${plantCount}`;
      setPlantList([...plantList, newPlant]);
      setPlantType("");
      setPlantCount("");
    };
  
    const handleRemovePlant = (index) => {
      const newPlantList = [...plantList];
      newPlantList.splice(index, 1);
      setPlantList(newPlantList);
    };
  
    const handleAddStone = () => {
      if (!stoneType || !stoneCount) {
        message.error("Please select a stone type and enter a count");
        return;
      }
      const newStone = `${stoneType} x ${stoneCount}`;
      setStoneList([...stoneList, newStone]);
      setStoneType("");
      setStoneCount("");
    };
  
    const handleRemoveStone = (index) => {
      const newStoneList = [...stoneList];
      newStoneList.splice(index, 1);
      setStoneList(newStoneList);
    };
  
    const calculateWeedSection = () => {
      const weedMachineDetails = machineList.map(machine => {
        const [type, count] = machine.split(" x ");
        return { type, count };
      });
  
      const weedEffort = calculateWeedEffort(weedType, area, parseInt(labourCount), weedMachineDetails);
      const workDays = calculateWorkDays(weedEffort, parseInt(workHours));
  
      setWeedCalculationResults({ weedEffort, workDays });
    };
  
    const calculatePlantSection = () => {
      const plantMachineDetails = plantMachineList.map(machine => {
        const [type, count] = machine.split(" x ");
        return { type, count };
      });
  
      const plantDetails = plantList.map(plant => {
        const [count, type] = plant.split(" x ");
        return { count, type };
      });
  
      const plantEffort = calculatePlantEffort(plantDetails, plantMachineDetails);
      const workDays = calculateWorkDays(plantEffort, parseInt(plantWorkHours));
  
      setPlantCalculationResults({ plantEffort, workDays });
    };
  
    const calculateStoneSection = () => {
      const stoneMachineDetails = stoneMachineList.map(machine => {
        const [type, count] = machine.split(" x ");
        return { type, count };
      });
  
      const stoneDetails = stoneList.map(stone => {
        const [count, type] = stone.split(" x ");
        return { count, type };
      });
  
      const stoneEffort = calculateStoneEffort(stoneDetails, stoneMachineDetails);
      const workDays = calculateWorkDays(stoneEffort, parseInt(stoneWorkHours));
  
      setStoneCalculationResults({ stoneEffort, workDays });
    };
  
    const handleSave = () => {
      const weedData = {
        weedType,
        labourCount,
        workHours,
        machineList,
        weedCalculationResults,
      };
      
      const plantData = {
        plantList,
        plantWorkHours,
        plantMachineList,
        plantCalculationResults,
      };
      
      const stoneData = {
        stoneList,
        stoneWorkHours,
        stoneMachineList,
        stoneCalculationResults,
      };
    
      const saveData = {
        weedData,
        plantData,
        stoneData
      };
    
      onSave(saveData);
      onClose();
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
      <h4>Clear Land Setup</h4>
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
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => setActiveSection("weeds")}>Weeds</Button>
        <Button onClick={() => setActiveSection("plants")}>Plants</Button>
        <Button onClick={() => setActiveSection("stones")}>Stones</Button>
      </div>

      {activeSection === "weeds" && (
        <div style={{ marginTop: "20px" }}>
          <h5>Weed Clearing</h5>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "12px", marginLeft: "10px" }}>Weed Type</p>
            <Select
              style={{ width: "65%" }}
              value={weedType}
              onChange={(value) => setWeedType(value)}
              placeholder="Select Weed Type"
            >
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
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
            <p style={{ fontSize: "12px", marginLeft: "10px" }}>Labour Count</p>
            <Input
              placeholder="Labour Count"
              value={labourCount}
              onChange={(e) => setLabourCount(e.target.value)}
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
            <p style={{ fontSize: "12px", marginLeft: "10px" }}>Work Hours</p>
            <Input
              placeholder="Work Hours"
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
              style={{ width: "65%" }}
            />
          </div>

          <h6
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Machinery
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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Machine </p>
              <Select
                style={{ width: "65%", marginRight: "1px" }}
                value={machineType}
                onChange={(value) => setMachineType(value)}
                placeholder="Select Machine"
              >
                <Option value="Backhoes">Backhoes</Option>
                <Option value="excavator">Excavators</Option>
                {/* <Option value="bulldozer">Bulldozer</Option> */}
              </Select>
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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Count</p>
              <Input
                placeholder="Machine Count"
                style={{ width: "65%", marginLeft: "10px" }}
                value={machineCount}
                onChange={(e) => setMachineCount(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                onClick={() => handleAddMachine("weed")}                
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
              {machineList.map((machine, index) => (
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
                  <span
                    style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}
                  >
                    {machine}
                  </span>
                  <button
                   onClick={() => handleRemoveMachine(index, "weed")}
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

          {weedCalculationResults && (
      <div style={{ marginTop: "10px" }}>
        <h6>Weed Clearing Results</h6>
        <p>Weed Effort: {weedCalculationResults.weedEffort.toFixed(2)} hours</p>
        {/* <p>Work Days: {weedCalculationResults.workDays}</p> */}
      </div>
    )}

          <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={calculateWeedSection}
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
      )}

    {activeSection === "plants" && (
        <div style={{ marginTop: "10px" }}>
          <h5>Plant Clearing</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "max-content",
              backgroundColor: "whitesmoke",
              marginTop: 0,
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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Plant Type </p>
              <Select
                style={{ width: "65%", marginRight: "1px" }}
                value={plantType}
                onChange={(value) => setPlantType(value)}
                placeholder="Select Plant Type"
              >
                 <Option value="Low">Low</Option>
                 <Option value="Medium">Medium</Option>
                 <Option value="High">High</Option>
              </Select>
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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Count</p>
              <Input
                placeholder="Plant Count"
                style={{ width: "65%", marginLeft: "10px" }}
                value={plantCount}
                onChange={(e) => setPlantCount(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                onClick={handleAddPlant}
                style={{
                  width: "30%",
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
              {plantList.map((palnt, index) => (
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
                    marginBottom: 5,
                    borderRadius: 8,
                    padding: 2,
                    width: "31%",
                    height: 25,
                    border: "1px solid lightblue",
                  }}
                >
                  <span
                    style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}
                  >
                    {palnt}
                  </span>
                  <button
                    onClick={() => handleRemovePlant(index)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      marginBottom: 5
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

          
          {/* <div style={{ marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",}}>
            <p style={{ fontSize: "12px", marginLeft: "10px" }}>Work Hours</p>
            <Input
              placeholder="Work Hours"
              value={plantWorkHours}
              onChange={(e) => setPlantWorkHours(e.target.value)}
              style={{ width: "65%" }}
            />
          </div> */}

         <h6
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Machinery
          </h6> 
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "max-content",
              backgroundColor: "whitesmoke",
              marginTop: 10,

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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Machine </p>
              <Select
                style={{ width: "65%", marginRight: "1px" }}
                value={plantMachineType}
                onChange={(value) => setPlantMachineType(value)}
                placeholder="Select Machine"
              >
                <Option value="Chainsaws">Chainsaws</Option>
                <Option value="Excavator">Excavator</Option>
                {/* <Option value="bulldozer">Bulldozer</Option> */}
              </Select>
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
              <p style={{ fontSize: "12px", marginLeft: "10px" }}>Count</p>
              <Input
                placeholder="Machine Count"
                style={{ width: "65%", marginLeft: "10px" }}
                value={plantMachineCount}
                onChange={(e) => setPlantMachineCount(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                onClick={() => handleAddMachine("plant")}                
                style={{
                  width: "30%",
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
              {plantMachineList.map((plantmachine, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: "white",
                    marginRight: 1,
                    marginLeft: 1,
                    marginBottom: 5,
                    borderRadius: 8,
                    padding: 2,
                    width: "32%",
                    height: 25,
                    border: "1px solid lightblue",
                  }}
                >
                  <span
                    style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}
                  >
                    {plantmachine}
                  </span>
                  <button
                   onClick={() => handleRemoveMachine(index, "plant")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      marginBottom: 5
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

          {plantCalculationResults && (
      <div style={{ marginTop: "10px" }}>
        <h5>Plant Clearing Results</h5>
        <p>Plant Effort: {plantCalculationResults.plantEffort.toFixed(2)} hours</p>
        {/* <p>Work Days: {plantCalculationResults.workDays}</p> */}
      </div>
    )}

          <div style={{ marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",}}>
            <Button type="primary" onClick={calculatePlantSection} 
            style={{
            width: "47%",
            marginBottom: "10px",
            marginTop: "10px",
          }}>Calculate</Button>
            <Button style={{ width: "47%" }} onClick={handleSave}>Save</Button>
          </div>
        </div>
      )}

{activeSection === "stones" && (
  <div style={{ marginTop: "10px" }}>
    <h5>Stone Clearing</h5>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "max-content",
        backgroundColor: "whitesmoke",
        marginTop: 0,
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
        <p style={{ fontSize: "12px", marginLeft: "10px" }}>Stone Type </p>
        <Select
          style={{ width: "65%", marginRight: "1px" }}
          value={stoneType}
          onChange={(value) => setStoneType(value)}
          placeholder="Select Stone Type"
        >
           <Option value="Small">Small</Option>
           {/* <Option value="medium">Medium</Option> */}
           <Option value="High">High</Option>
        </Select>
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
        <p style={{ fontSize: "12px", marginLeft: "10px" }}>Count</p>
        <Input
          placeholder="Stone Count"
          style={{ width: "65%", marginLeft: "10px" }}
          value={stoneCount}
          onChange={(e) => setStoneCount(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={handleAddStone}
          style={{
            width: "30%",
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
        {stoneList.map((stone, index) => (
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
              marginBottom: 5,
              borderRadius: 8,
              padding: 2,
              width: "31%",
              height: 25,
              border: "1px solid lightblue",
            }}
          >
            <span
              style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}
            >
              {stone}
            </span>
            <button
              onClick={() => handleRemoveStone(index)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 5
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

    {/* <div style={{ marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",}}>
      <p style={{ fontSize: "12px", marginLeft: "10px" }}>Work Hours</p>
      <Input
        placeholder="Work Hours"
        value={stoneWorkHours}
        onChange={(e) => setStoneWorkHours(e.target.value)}
        style={{ width: "65%" }}
      />
    </div> */}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "max-content",
        backgroundColor: "whitesmoke",
        marginTop: 10,
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
        <p style={{ fontSize: "12px", marginLeft: "10px" }}>Machine </p>
        <Select
          style={{ width: "65%", marginRight: "1px" }}
          value={stoneMachineType}
          onChange={(value) => setStoneMachineType(value)}
          placeholder="Select Machine"
        >
          <Option value="Excavator breakers">Excavator breakers</Option>
          {/* <Option value="excavator">Excavator</Option> */}
          <Option value="Bulldozer">Bulldozer</Option>
        </Select>
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
        <p style={{ fontSize: "12px", marginLeft: "10px" }}>Count</p>
        <Input
          placeholder="Machine Count"
          style={{ width: "65%", marginLeft: "10px" }}
          value={stoneMachineCount}
          onChange={(e) => setStoneMachineCount(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={() => handleAddMachine("stone")}                
          style={{
            width: "30%",
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
        {stoneMachineList.map((stonemachine, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "white",
              marginRight: 1,
              marginLeft: 1,
              marginBottom: 5,
              borderRadius: 8,
              padding: 2,
              width: "32%",
              height: 25,
              border: "1px solid lightblue",
            }}
          >
            <span
              style={{ fontSize: 10, marginRight: 5, color: "#007BFF" }}
            >
              {stonemachine}
            </span>
            <button
             onClick={() => handleRemoveMachine(index, "stone")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 5
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

    {stoneCalculationResults && (
      <div style={{ marginTop: "20px" }}>
        <h5>Stone Clearing Results</h5>
        <p>Stone Effort: {stoneCalculationResults.stoneEffort.toFixed(2)} hours</p>
        {/* <p>Work Days: {stoneCalculationResults.workDays}</p> */}
      </div>
    )}

    <div style={{ marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",}}>
      <Button type="primary" onClick={calculateStoneSection} 
      style={{
      width: "47%",
      marginBottom: "10px",
      marginTop: "10px",
    }}>Calculate</Button>
      <Button style={{ width: "47%" }} onClick={handleSave}>Save</Button>
    </div>
  </div>
)}

      {/* Add similar sections for plants and stones if needed */}
    </div>
  );
};

export default ClearLandSetupModal;
