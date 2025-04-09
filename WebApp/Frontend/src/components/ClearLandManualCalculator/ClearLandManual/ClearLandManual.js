// SideNavbar.js
import React, { useState, useRef ,useEffect} from "react";
import { FaBars } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsBoundingBox } from "react-icons/bs";
import {
  PiSquareDuotone,
  PiPlantFill,
  PiTreeFill,
  PiClock,
} from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GiStonePile } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import axios from "axios";
import { styles } from "./ClearLandManualStyles";
import { FiSearch } from "react-icons/fi";
import AlertWeed from "../../ClearLand/EffortOutput/AlertWeed"
import AlertPlant from "../../ClearLand/EffortOutput/AlertPlant"
import AlertStone from "../../ClearLand/EffortOutput/AlertStone"
import {Space,message } from "antd";
import EffortOutputManual from "../EffortOutputManual/EffortOutputManual";
import AxiosInstance from "../../../AxiosInstance";

export default function ClearLandManualCalculator({ onBackToSidebar,area,perimeter,PerimeterUnitselectedValue,AreaUnitselectedValue }) {
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [plantTypeSelectedValue, setPlantTypeSelectedValue] = useState(null);
  const [stoneTypeSelectedValue, setStoneTypeSelectedValue] = useState(null);
  const [machineTypeSelectedValue, setMachineTypeSelectedValue] = useState(null);
  const [pressed, setPressed] = useState(null);
  const [plantCount, setPlantCount] = useState("");
  const [stonesCount, setStonesCount] = useState("");
  const [laborCount, setLaborCount] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [machineCount, setMachineCount] = useState("");
  const [machineList, setMachineList] = useState([]);

  const prefix = <FiSearch style={{ fontSize: 16, color: "#d3d3d3" }} />;

  useEffect(() => {
    fetchMchineList();
  }, []);

  const fetchMchineList = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/Machines"
      );
      setMachineList(response.data);
    } catch (error) {
      console.error("Error fetching machiList:", error);
      message.error("Failed to fetch machiList. Please try again.");
    }
  };

  const handlePlantTypeChange = (event) => {
    setPlantTypeSelectedValue(event.target.value);
  };

  const handlePlantCountChange = (event) => {
    setPlantCount(event.target.value);
  };

  const handleStoneTypeChange = (event) => {
    setStoneTypeSelectedValue(event.target.value);
  };

  const handleStoneCountChange = (event) => {
    setStonesCount(event.target.value);
  };
  const handleMachineTypeChange = (event) => {
    setMachineTypeSelectedValue(event.target.value);
  };

  const handleLaborCountChange = (event) => {
    setLaborCount(event.target.value);
  };

  const handleWorkHourChange = (event) => {
    setWorkHours(event.target.value);
  };

  const handleMachineCountChange = (event) => {
    setMachineCount(event.target.value);
  };

  const [displayValues, setDisplayValues] = useState([]);
  const handleAdd = () => {
    if (!plantTypeSelectedValue || !plantCount) {
      message.error("Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(plantCount)) {
      message.error("Error: Please enter a valid plant count");
      return;
    }
    //validation part Add button
    const combinedValue = plantCount + " x " + plantTypeSelectedValue;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setPlantTypeSelectedValue("");
    setPlantCount("");
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const [displayValues1, setDisplayValues1] = useState([]);

  const handleAdd1 = () => {
    if (!stoneTypeSelectedValue || !stonesCount) {
      message.error("Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(stonesCount)) {
      message.error("Error: Please enter a valid stone count");
      return;
    }
    //validation part Add button
    const combinedValue1 = stonesCount + " x " + stoneTypeSelectedValue;
    const newDisplayValues1 = [...displayValues1, combinedValue1].filter(
      Boolean
    );
    setDisplayValues1(newDisplayValues1);
    setStoneTypeSelectedValue("");
    setStonesCount("");
  };

  const handleRemoveValue1 = (index) => {
    const newDisplayValues1 = [...displayValues1];
    newDisplayValues1.splice(index, 1);
    setDisplayValues1(newDisplayValues1);
  };

  const [displayValues2, setDisplayValues2] = useState([]);
  const handleAdd2 = () => {
    if (!machineTypeSelectedValue || !machineCount) {
      message.error("Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(machineCount)) {
      message.error("Error: Please enter a valid machine count");
      return;
    }
    //validation part Add button
    const combinedValue2 = machineCount + " x " + machineTypeSelectedValue;
    const newDisplayValues2 = [...displayValues2, combinedValue2].filter(
      Boolean
    );
    setDisplayValues2(newDisplayValues2);
    setMachineTypeSelectedValue("");
    setMachineCount("");
  };

  const handleRemoveValue2 = (index) => {
    const newDisplayValues2 = [...displayValues2];
    newDisplayValues2.splice(index, 1);
    setDisplayValues2(newDisplayValues2);
  };

  const handleClearlandDetails = async (e) => {
    try {
      // Validate required fields
      if (!laborCount) {
        message.error("Error:Please enter the Labor Count.");
        return;
      }
  
      if (!workHours) {
        message.error("Error:Please enter the Work Hours.");
        return;
      }
  
      if (displayValues2.length === 0) {
        message.error("Error:Please add at least one Machinery item.");
        return;
      }
  
      if (!pressed && displayValues.length === 0 && displayValues1.length === 0) {
        message.error(
          "Error:Please fill in at least one optional field: Weeds, Plants, or Stones."
        );
        return;
      }
      const regex2 = /^\d+$/; // allow only decimal numbers
        if (!regex2.test(laborCount)) {
          message.error("Error: Please enter a valid labor count");
          return;
        }
        const regex = /^\d+$/; // allow only decimal numbers
        if (!regex.test(workHours)) {
          message.error("Error: Please enter a valid work hour count");
          return;
        }
    

      setCurrentPage("effortOutputManual"); // Update this line
      setAnimatePage(true);
      e.preventDefault();

      // Prepare data for the request
      const requestData = {
        pressed,
        laborCount,
        workHours,
        displayValues,
        displayValues1,
        displayValues2,
      };

      // Make POST request to the backend
      const response = await AxiosInstance.post(
        "/api/clearLand/clearLandFromManualCalculator",
        requestData
      );

      // Handle successful response
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  //calculate the effort output function
const convertArea = (area,AreaUnitselectedValue) => {
    if(AreaUnitselectedValue === "Acres"){
      return area * 4046.86;
    }
    else if(AreaUnitselectedValue === "Perch"){
        return area*25.2929;
    }
    else if(AreaUnitselectedValue === "m²"){
      return area;
    }
  }

const Area = convertArea(area,AreaUnitselectedValue);
function calculateEffortOutput(
    weedEffort,
    plantEffort,
    stoneEffort,
  ) {
    const effortCount = Math.ceil(weedEffort+plantEffort+stoneEffort);
    return effortCount;
  }
  const calculateWeedEffort = (weedType,Area,laborsCount,machineDetails) => {
    let weedEffort = 0;
    let totalWeedEffort = 0;
    let excavatorCount = 0;
    let backhoeCount = 0;
    let backhoePresent = false;
    let excavatorPresent = false;
    const machineEffortValues = { Backhoes: 0.714, Excavators: 0.0593 }; // time in minutes to clear 1 square meter 
    const weedEffortValues = { Low: 0.036, Medium: 0.042, High: 0.714 };//hours per 1 square meter and per 1 labor.for high assume already one backhoe exists
    if(weedType === "Low" || weedType === "Medium"){
        weedEffort = weedEffortValues[weedType];
        totalWeedEffort = (weedEffort/laborsCount)*Area;
      }
      if (weedType === "High") {
        totalWeedEffort = 0; // Initialize total weed effort
        if (machineDetails) {
          machineDetails.forEach(({ count, type }) => {
            if (type === "Excavators") {
              excavatorPresent = true;
              excavatorCount = parseInt(count);
            } else if (type === "Backhoes") {
              backhoePresent = true;
              backhoeCount = parseInt(count);
            }
          });
        }
        if(excavatorPresent && backhoePresent){
          weedEffort = ((0.714/backhoeCount)+(0.0593/excavatorCount))/2;	
        }else if(excavatorPresent){
          weedEffort = 0.0593/excavatorCount;
        }else if(backhoePresent){
          weedEffort = 0.714/backhoeCount;
        }else{
          weedEffort = 0.714;
        }
        totalWeedEffort = (weedEffort*Area)/60; 
      }
     return totalWeedEffort;
  }
  
  
  const calculatePlantEffort = (plantDetails,machineDetails) => {
    let plantEffort = 0;
    let chainsawCount = 1;
    let totalPlantEffort = 0;
    const plantEffortValues = { Low: 1 / 12, Medium: 0.25, High: 0.5 };//for 1 chainsaw
    if(machineDetails){
      machineDetails.forEach(({count,type}) => {
        if(type === "Chainsaws"){
            chainsawCount = parseInt(count);
        }
    })
    }
    plantDetails.forEach(({ count, type }) => {
      const effortPerPlant = plantEffortValues[type];
      plantEffort += effortPerPlant * parseInt(count);
    });
  
    totalPlantEffort = plantEffort/chainsawCount;
    return totalPlantEffort;
  }
  
  const calculateStoneEffort = (stoneDetails,machineDetails) => {
    let stoneEffort = 0;
    let breakerCount = 1;
    let totalStoneEffort = 0;
    const stoneEffortValues = { Small:0.5 , Large: 1 };
    if(machineDetails){
      machineDetails.forEach(({count,type}) => {
        if(type === "Excavator breakers"){
            breakerCount = parseInt(count);
        }
    })
    }
    stoneDetails.forEach(({ count, type }) => {
      const effortPerStone = stoneEffortValues[type];
      stoneEffort += effortPerStone * parseInt(count);
    });
  
    totalStoneEffort = stoneEffort/breakerCount;
    return totalStoneEffort;
  }
  
  const calculateWorkDays = (effort,workHours) => {
    const fulldays = Math.floor(effort / workHours);
    const remainingHours = effort % workHours;
    const totalDays = remainingHours === 0 ? fulldays : fulldays + 1;
    return totalDays;
  }

const laborsCount = parseInt(laborCount);
const weedType = pressed;
const plantDetails = displayValues.map((value) => {
  const [count, type] = value.split(" x ");
  return {count, type: type.trim() };
});
 
const stoneDetails = displayValues1.map((value) => {
  const [count, type] = value.split(" x ");
  return {count, type: type.trim() };
});;
const machineDetails = displayValues2.map((value) => {
    const [count, type] = value.split(" x ");
    return { count, type: type.trim()};
  });
console.log(Area);
const weedEffort = calculateWeedEffort(weedType,Area,laborsCount,machineDetails);
const plantEffort = calculatePlantEffort(plantDetails,machineDetails);  
const stoneEffort = calculateStoneEffort(stoneDetails,machineDetails);
const effort = calculateEffortOutput(weedEffort,plantEffort,stoneEffort);
const workDays = calculateWorkDays(effort,workHours);

    return (
    <div>
      {!currentPage && (
        <div style={styles.content}>
          <div style={styles.header}>
            <MdArrowBack
              onClick={onBackToSidebar}
              style={styles.backButton}
              fontSize={20}
            />
            <p style={styles.titleText1}>ClearLand</p>
          </div>

          {/* first box */}
          <div style={styles.Box1}>
            <p style={styles.titleText}>Land Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}>{parseFloat(perimeter).toFixed(2)} {PerimeterUnitselectedValue}</p>
                </div>
              </div>
              <div style={styles.property}>
                <PiSquareDuotone color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>
                  {parseFloat(area).toFixed(2)} {AreaUnitselectedValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* second box */}
          <div style={styles.box2}>
            <div>
            <div style={styles.box2InnerTop}>
                <PiPlantFill color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.BoxPropertyLabel}>Weeds</p>
                  <AlertWeed></AlertWeed>
                </div>
              </div>
              <div style={styles.box2InnerBottom}>
                <button
                  style={
                    pressed === "Low" ? styles.pressedButton : styles.box2Button
                  }
                  onClick={() => setPressed("Low")}
                >
                  <p
                    style={
                      pressed === "Low"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    Low
                  </p>
                </button>
                <button
                  style={
                    pressed === "Medium"
                      ? styles.pressedButton
                      : styles.box2Button
                  }
                  onClick={() => setPressed("Medium")}
                >
                  <p
                    style={
                      pressed === "Medium"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    Medium
                  </p>
                </button>
                <button
                  style={
                    pressed === "High"
                      ? styles.pressedButton
                      : styles.box2Button
                  }
                  onClick={() => setPressed("High")}
                >
                  <p
                    style={
                      pressed === "High"
                        ? styles.pressedText
                        : styles.box2ButtonText
                    }
                  >
                    High
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* third box */}
          <div style={styles.box3}>
          <div>
              <div style={styles.box2InnerTop}>
                <PiTreeFill color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.BoxPropertyLabel}>Trees</p>
                  <AlertPlant></AlertPlant>
                </div>
              </div>
            </div>
            <div style={styles.box3InnerBottom}>
              <div style={styles.dropDownContainer}>
                <select
                  style={styles.dropdown}
                  value={plantTypeSelectedValue}
                  onChange={handlePlantTypeChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    value={plantCount}
                    onChange={handlePlantCountChange}
                    onSubmitEditing={handleAdd}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={handleAdd}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
            <div style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue(index)}
                    style={styles.closeButton}
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

          {/* fourth box */}
          <div style={styles.box3}>
          <div>
              <div style={styles.box2InnerTop}>
                <GiStonePile color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.BoxPropertyLabel}>Stones</p>
                  <AlertStone></AlertStone>
                </div>
              </div>
            </div>
            <div style={styles.box3InnerBottom}>
              <div style={styles.dropDownContainer}>
                <select
                  style={styles.dropdown}
                  value={stoneTypeSelectedValue}
                  onChange={handleStoneTypeChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Small">Small</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div style={styles.box3middleContainer}>
                <p style={styles.box3inputLabel}>Count:</p>
                <div style={styles.box3inputContainer}>
                  <input
                    type="text"
                    style={styles.box3input}
                    placeholder="00"
                    value={stonesCount}
                    onChange={handleStoneCountChange}
                    onSubmitEditing={handleAdd1}
                  />
                </div>
              </div>
              <div style={styles.addButtonContainer}>
                <button style={styles.addButton} onClick={handleAdd1}>
                  <p style={styles.addButtonText}>Add</p>
                </button>
              </div>
            </div>
            <div style={styles.displayValuesContainer}>
              {displayValues1.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue1(index)}
                    style={styles.closeButton}
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

          {/* fifth box */}
          <div style={styles.box5}>
            <div style={styles.box5leftcontainer}>
              <GrUserWorker color="gray" size={20} />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Labors : </p>
              </div>
            </div>
            <div style={styles.box5inputContainer}>
              <input
                type="text"
                style={{ ...styles.box3input, width: "70%" }}
                placeholder="Enter labor count"
                value={laborCount}
                onChange={handleLaborCountChange}
              />
            </div>
          </div>

          {/* sixth box */}
          <div style={styles.box5}>
            <div style={{ ...styles.box5leftcontainer, width: "65%" }}>
              <PiClock color="gray" size={20} />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Work hours : </p>
              </div>
            </div>
            <div style={styles.box5inputContainer}>
              <input
                type="text"
                style={{
                  ...styles.box3input,
                  width: "100%",
                  marginLeft: "-30px",
                }}
                placeholder="Enter no of hours"
                value={workHours}
                onChange={handleWorkHourChange}
              />
            </div>
          </div>

         {/* seventh box */}
         <div style={styles.box7}>
            <div>
              <div style={styles.box2InnerTop}>
                <HiTruck color="gray" size={20} />
                <div style={styles.box2PropertyDetails}>
                  <p style={styles.Box2PropertyLabel}>Machinery</p>
                </div>
              </div>
            </div>

            <Space direction="vertical" style={{ width: "100%" }}>
            <div style={styles.dropDown2Container}>
            <select
  style={styles.dropdown2}
  value={machineTypeSelectedValue}
  onChange={(e) => setMachineTypeSelectedValue(e.target.value)}
>
  <option value="" disabled selected>Select a machine type</option>
  {machineList.map((machine) => (
    <option key={machine.Name} value={machine.Name}>
      {machine.Name}
    </option>
  ))}
</select>
              </div>
            </Space>

            <div style={styles.box7InputContainer}>
              <p style={styles.box7inputLabel}>Count : </p>
              <input
                type="text"
                style={styles.box7input}
                placeholder="Enter machine count"
                value={machineCount}
                onChange={handleMachineCountChange}
                onSubmitEditing={handleAdd2}
              />
            </div>
            <div style={styles.box7addButtonContainer}>
              <button
                style={{ ...styles.addButton, width: "100%" }}
                onClick={handleAdd2}
              >
                <p style={styles.addButtonText}>Add</p>
              </button>
            </div>

            <div style={styles.displayValuesContainer}>
              {displayValues2.map((value, index) => (
                <div key={index} style={styles.displayValueContainer}>
                  <div style={styles.displayValueText}>{value}</div>
                  <button
                    onClick={() => handleRemoveValue2(index)}
                    style={styles.closeButton}
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
          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleClearlandDetails}>
              <p style={styles.addButtonText}>Calculate</p>
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "effortOutputManual" && (
          <EffortOutputManual
            onBackToSidebar={handleBackClick}
            weedEffort={weedEffort}
            plantEffort={plantEffort}
            stoneEffort={stoneEffort}
            effort={effort}
            workDays = {workDays}
            laborCount={laborCount}
            workHours={workHours}
            displayValues2={displayValues2}
            area = {area}
            perimeter = {perimeter}
            AreaUnitSelectedValue = {AreaUnitselectedValue}
            PerimeterUnitSelectedValue = {PerimeterUnitselectedValue}
          />
        )}
      </div>
    </div>
  );
}
