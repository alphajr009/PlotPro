import React, { useState } from "react";
import { MdArrowBack, MdFence } from "react-icons/md";
import { PiTreePalmFill, PiSquareDuotone } from "react-icons/pi";
import { BsBoundingBox } from "react-icons/bs";
import { TbBackhoe } from "react-icons/tb";
import { styles } from "./calculatorSelectStyles";
import PlantationManul from "../PlantationManual/PlantationPageManual/PlantationManul";
import FenceManual from "../Fence Manual/Fence/fenceManual";
import ClearLandManual from "../ClearLandManualCalculator/ClearLandManual/ClearLandManual";
import { Button,} from "antd";

const convertAreaToSqMeters = (area, unit) => {
  const conversionRates = {
    Acres: 4046.86, 
    Perch: 25.29, 
    "m²": 1,
  };

  return area * (conversionRates[unit] || 1);
};

export default function CalculatorSelect({
  onBackToSidebar,
  area,
  perimeter,
  PerimeterUnitselectedValue,
  AreaUnitselectedValue,
}) {
  
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [Perimeter, setPerimeter] = useState(0);
  const [perimetersetValue, setperimetersetValue] = useState("");

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  const handlePageChange = (page) => {
    let updatedPerimeter = perimeter;
    let unit = PerimeterUnitselectedValue;
    if (PerimeterUnitselectedValue === "m") {
      updatedPerimeter = perimeter / 1000;
      unit = "Km";
    }
    setperimetersetValue(unit);
    setPerimeter(updatedPerimeter);
    setCurrentPage(page);
    setAnimatePage(true);
  };

  
  const areaInSqMeters = convertAreaToSqMeters(
    parseFloat(area),
    AreaUnitselectedValue
  );

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
            <p style={styles.titleText1}>Manual Calculator</p>
          </div>

          <div style={styles.Box2}>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}>
                    {perimeter} {PerimeterUnitselectedValue}
                  </p>
                </div>
              </div>
              <div className="property" style={styles.property}>
                <PiSquareDuotone color="gray" size={40} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}>
                    {area} {AreaUnitselectedValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.BoxPara}>
            <p style={styles.para}>
              Based on the area and perimeter values you have given now you can
              calculate the following
            </p>
          </div>
          <div style={styles.bottom}>
            <Button
              type="primary"
              block
              onClick={() => handlePageChange("PlantationManul")}
            >
              <PiTreePalmFill name="plant" size={25} color="white" />
              <p>Plantation</p>
            </Button>
          </div>

          <div style={styles.bottom}>
            <Button
              type="primary"
              block
              onClick={() => handlePageChange("clearLandManual")}
            >
              <TbBackhoe name="clear" size={25} color="white" />
              <p>Clear Land</p>
            </Button>
          </div>

          <div style={styles.bottom}>
            <Button
              type="primary"
              block
              onClick={() => handlePageChange("FenceManual")}
            >
              <MdFence name="fence" size={25} color="white" />
              <p>Fence Setup</p>
            </Button>
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
        {currentPage === "PlantationManul" && (
          <PlantationManul
            onBackToSidebar={handleBackClick}
            area={areaInSqMeters} 
            perimeter={perimeter}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}
            AreaUnitselectedValue="m²"
          />
        )}

        {currentPage === "FenceManual" && (
          <FenceManual
            onBackToSidebar={handleBackClick}
            area={area}
            Perimeter={Perimeter}
            PerimeterUnitselectedValue={perimetersetValue}
            AreaUnitselectedValue={AreaUnitselectedValue}
          />
        )}

        {currentPage === "clearLandManual" && (
          <ClearLandManual
            onBackToSidebar={handleBackClick}
            area={area}
            perimeter={perimeter}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}
            AreaUnitselectedValue={AreaUnitselectedValue}
          />
        )}
      </div>
    </div>
  );
}
