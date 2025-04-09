// SideNavbar.js
import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./FertilizingDetailsManualStyles";
import { SlChemistry } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { GiWeight, GiChemicalDrop } from "react-icons/gi";
import { Tb24Hours } from "react-icons/tb";

import { getFertilizerDetailsHtml } from "./FertilizerDetailsTemplate.js";

export default function FertilizingDetails({
  route,
  area,
  perimeter,
  AreaUnitselectedValue,
  PerimeterUnitselectedValue,
  onBackToSidebar,
  textPlant,
  FertilizerAmountUnitselectedValue,
  textFertilizationType,
  textFertilizationAmount,
  textFertilizationNUmberoftime,
  selectedFrequency,
  numberOfPlants
}) {
  
  const [currentPage] = useState(null);
  const [animatePage] = useState(false);

  

  const params = route?.params || {};
  const {
    FertilizerType,
    NumberOfTime,
    FertilizerAmount,
    FertilizerAmountUnit,
    plantcount,
  } = params;

  const [factorValue, setFactor] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    console.log(
      "in Fertilization details screen",
      FertilizerType,
      NumberOfTime,
      FertilizerAmount,
      FertilizerAmountUnit,
      selectedFrequency,
      plantcount
    );

    let factorValue = 1;
    switch (selectedFrequency) {
      case "daily":
        factorValue = 365;
        break;
      case "weekly":
        factorValue = 4;
        break;
      case "monthly":
        factorValue = 12;
        break;
      case "quarterly":
        factorValue = 4;
        break;
      case "yearly":
        factorValue = 1;
        break;
      default:
        factorValue = 1;
    }
    setFactor(factorValue);
    setTotalAmount(textFertilizationNUmberoftime * textFertilizationAmount * factorValue);
  }, [
    selectedFrequency,
    textFertilizationAmount,
    textFertilizationNUmberoftime,
  ]);

  useEffect(() => {
    setTotal((plantcount * totalAmount) / 1000);
  }, [plantcount, totalAmount]);

  const handleSave = () => {
    const Perimeter = parseFloat(perimeter).toFixed(2);
    const Area = parseFloat(area).toFixed(2);
    const TotalFertilizer = totalAmount * numberOfPlants;

    const htmlContent = getFertilizerDetailsHtml(
      selectedFrequency,
      FertilizerAmountUnitselectedValue,
      textFertilizationAmount,
      textFertilizationNUmberoftime,
      textFertilizationType,
      Perimeter,
      Area,
      TotalFertilizer,
      totalAmount
    );
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
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
            <p style={styles.titleText1}>Fertilizing Details</p>
          </div>

          {/* first box */}
          <div style={styles.Box1}>
            <p style={styles.titleText}>Total Amount of Fertilizer</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <SlChemistry color="gray" size={30} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Plantation</p>
                  <p style={styles.propertyValue}>{totalAmount*numberOfPlants} {FertilizerAmountUnitselectedValue}</p>
                </div>
              </div>
              <div className="property" style={styles.property}>
                <FaClockRotateLeft color="gray" size={25} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Per Year / plant</p>
                  <p style={styles.propertyValue}>
                    {totalAmount} { FertilizerAmountUnitselectedValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second box */}
          <div style={styles.Box2}>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}>{parseFloat(perimeter).toFixed(2)} {PerimeterUnitselectedValue}</p>
                </div>
              </div>
              <div className="property" style={styles.property}>
                <PiSquareDuotone color="gray" size={40} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>{parseFloat(area).toFixed(2)} {AreaUnitselectedValue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Third box */}
          <div style={styles.box3}>
            <p style={styles.innertopText}>Results based on</p>

            <div style={styles.innercenter}>
              <div style={styles.innersquareleft}>
                <GiChemicalDrop name="tree" size={30} color="gray" />
                <div style={styles.propertybox}>
                  <p style={styles.propertyLabel1}>Fertilizer Type</p>
                </div>
              </div>
              <div style={styles.innersquareright}>
                <p style={styles.propertyLabel}>: {textFertilizationType}</p>
              </div>
            </div>

            <div style={styles.innercenter}>
              <div style={styles.innersquareleft}>
                <GiWeight name="boom-gate" size={30} color="gray" />
                <div style={styles.propertybox}>
                  <p style={styles.propertyLabel1}>Amount</p>
                </div>
              </div>
              <div style={styles.innersquareright}>
                <p style={styles.propertyLabel}>: {textFertilizationAmount} {FertilizerAmountUnitselectedValue}</p>
              </div>
            </div>

            <div style={styles.innercenter}>
              <div style={styles.innersquareleft}>
                <IoTimeSharp name="boom-gate" size={30} color="gray" />
                <div style={styles.propertybox}>
                  <p style={styles.propertyLabel1}>No of Times</p>
                </div>
              </div>
              <div style={styles.innersquareright}>
                <p style={styles.propertyLabel}>: {textFertilizationNUmberoftime}</p>
              </div>
            </div>

            <div style={styles.innercenter}>
              <div style={styles.innersquareleft}>
                <Tb24Hours name="boom-gate" size={30} color="gray" />
                <div style={styles.propertybox}>
                  <p style={styles.propertyLabel1}>Frequency</p>
                </div>
              </div>
              <div style={styles.innersquareright}>
                <p style={styles.propertyLabel}>: {selectedFrequency}</p>
              </div>
            </div>
          </div>

          <div style={styles.bottom2}>
            <button style={styles.Button2} onClick={handleSave}>
              <p style={styles.Box4ButtonText}>Save as PDF</p>
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto",
        }}
      >
        {/* {currentPage === "Fertilizing" && (
          <Fertilizing
            onBackToSidebar={handleBackClick}
            textPlant={textPlant}
            PlantDensity={PlantDensity}
            numberOfPlants={numberOfPlants}
          />
        )} */}
      </div>
    </div>
  );
}
