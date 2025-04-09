
import React, { useState, useRef } from "react";
import { MdArrowBack } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { PiSquareDuotone } from "react-icons/pi";
import { MdGrass } from "react-icons/md";
import { GiGrassMushroom } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { message } from "antd";
import { styles } from "./FetilizingManualStyles";
import Select from "react-select";

import { FaTree } from "react-icons/fa";
import FertilizingDetailsManual from "../FertilizingDetailsManual/FertilizingDetailsManual";


export default function Fertilizing(
  {
    area,
    perimeter,
    AreaUnitselectedValue,
    PerimeterUnitselectedValue,
    onBackToSidebar,
    textPlant,
    calculatedPlantDensity,
    numberOfPlants
  }) {


  const [textFertilizationType, setTextFertilizationType] =
    useState("");
  const [textFertilizationNUmberoftime, setTextFertilizationNUmberoftime] =
    useState("");
  const [textFertilizationAmount, setTextFertilizationAmount] =
    useState("");
  const [FertilizerAmountUnitselectedValue, setFertilizerAmountUnitselectedValue] = useState(null);
  const [FertilizerAmountUnitselectedValue1, setFertilizerAmountUnitselectedValue1] = useState(null);

  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);


  const handleInputTypeChange = (event) => {
    setTextFertilizationType(event.target.value);
  };

  const handleInputNoOfTimesChange = (event) => {
    setTextFertilizationNUmberoftime(event.target.value);
  };
  const handleInputAmount = (event) => {
    setTextFertilizationAmount(event.target.value);
  };


  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const handleFrequencyChange = (selectedFrequency) => {
    setSelectedFrequency(selectedFrequency);
  };

  const handleAmountUnitChange = (selectedOption) => {
    setFertilizerAmountUnitselectedValue1(selectedOption);
    setFertilizerAmountUnitselectedValue(selectedOption.value);
  };


  const handleFertilizingDetails = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !textFertilizationNUmberoftime ||
      !textFertilizationAmount ||
      !textFertilizationType ||
      !FertilizerAmountUnitselectedValue
    ) {
      message.error("Please fill in all fields");
      return;
    }
    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(textFertilizationAmount)) {
      message.error("Error: Please enter a valid value for amount");
      return;
    }
    if (!regex.test(textFertilizationNUmberoftime)) {
      message.error("Error: Please enter a valid value for number of times");
      return;
    }

    // Transition to the next page or section
    setCurrentPage("FertilizingDetailsManual");
    setAnimatePage(true);
  };
  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

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
            <p style={styles.titleText1}>Fertilizing</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Plantation Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <FaTree color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Type</p>
                  <p style={styles.propertyValue}>{textPlant}</p>
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
            <div style={styles.propertyBox1}>
              <div style={styles.property}>
                <GiGrassMushroom color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Density</p>
                  <p style={styles.propertyValue}>{calculatedPlantDensity}/m<sup>2</sup></p>
                </div>
              </div>
              <div style={styles.property}>
                <MdGrass color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Total Plants</p>
                  <p style={styles.propertyValue}>
                    {numberOfPlants} plants
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* box 2 */}
          <div style={styles.box2}>
            <div style={styles.box2Property}>
              <SlChemistry name="plant" size={35} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Fertilizer Type</p>
              </div>
            </div>
            <div style={styles.box2Property}>
              <input
                type="text"
                style={styles.box2input}
                placeholder="Compost"
                value={textFertilizationType}
                onChange={handleInputTypeChange}
              />

            </div>
          </div>


          <div style={styles.BoxFrequency}>
            <p style={styles.titleText}>Frequency</p>
            <div style={styles.frequencyButtonContainer}>
              <button
                style={{
                  ...styles.frequencyButton,
                  ...(selectedFrequency === 'daily' && styles.selectedFrequencyButton)
                }}
                onClick={() => handleFrequencyChange('daily')}
              >
                Daily
              </button>
              <button
                style={{
                  ...styles.frequencyButton,
                  ...(selectedFrequency === 'weekly' && styles.selectedFrequencyButton)
                }}
                onClick={() => handleFrequencyChange('weekly')}
              >
                Weekly
              </button>
              <button
                style={{
                  ...styles.frequencyButton,
                  ...(selectedFrequency === 'monthly' && styles.selectedFrequencyButton)
                }}
                onClick={() => handleFrequencyChange('monthly')}
              >
                Monthly
              </button>
              <button
                style={{
                  ...styles.frequencyButton,
                  ...(selectedFrequency === 'quarterly' && styles.selectedFrequencyButton)
                }}
                onClick={() => handleFrequencyChange('quarterly')}
              >
                Quarterly
              </button>
              <button
                style={{
                  ...styles.frequencyButton,
                  ...(selectedFrequency === 'yearly' && styles.selectedFrequencyButton)
                }}
                onClick={() => handleFrequencyChange('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* box 3 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div >
                <FaClockRotateLeft name="format-line-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>No Of Times</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="00"
                  value={textFertilizationNUmberoftime}
                  onChange={handleInputNoOfTimesChange}
                />
              </div>
            </div>
          </div>





          {/* box 4 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div>
                <GiWeight name="format-row-spacing" size={25} color="gray" />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Amount</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="100"
                  value={textFertilizationAmount}
                  onChange={handleInputAmount}
                />
                <Select
                  placeholder="unit"
                  options={[
                    { value: "mg", label: "mg" },
                    { value: "g", label: "g" },
                    { value: "kg", label: "kg" },
                  ]}
                  value={FertilizerAmountUnitselectedValue1}
                  onChange={handleAmountUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "13px",
                      width: "78px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* calculate button */}
          <div style={styles.bottom}>
            <button style={styles.Button1} onClick={handleFertilizingDetails}>
              <p style={styles.Box4ButtonText}>Calculate Fertilizing</p>
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
        {currentPage === "FertilizingDetailsManual"
          && (<FertilizingDetailsManual
            onBackToSidebar={handleBackClick}
            textPlant={textPlant}
            FertilizerAmountUnitselectedValue={FertilizerAmountUnitselectedValue}
            textFertilizationNUmberoftime={textFertilizationNUmberoftime}
            textFertilizationAmount={textFertilizationAmount}
            textFertilizationType={textFertilizationType}
            selectedFrequency={selectedFrequency}
            calculatedPlantDensity={calculatedPlantDensity}
            numberOfPlants={numberOfPlants}
            area={area}
            perimeter={perimeter}
            AreaUnitselectedValue={AreaUnitselectedValue}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}

          />)}
      </div>
    </div>
  );
}
