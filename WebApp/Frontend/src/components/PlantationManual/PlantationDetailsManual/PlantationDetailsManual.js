
import React from "react";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./PlantationDetailsManualStyles";
import { MdGrass,MdFormatLineSpacing } from "react-icons/md";
import { GiGrassMushroom } from "react-icons/gi";
import { FaTree } from "react-icons/fa";
import { RxRowSpacing } from "react-icons/rx";
import FertilizingManual from "../../FertilizingManual/FertilizingPageManual/FertilizingManual";
import { getPlantationDetailsHtml } from "./plantationDetailsTemplate";
export default function PlantationDetails({
  area,
  perimeter,
  PerimeterUnitselectedValue,
  AreaUnitselectedValue,
  numberOfPlants,
  calculatedPlantDensity,
  onBackToSidebar,
  textplantspace,
  textRowspace,
  PlantSpaceUnitselectedValue,
  RowSpaceUnitselectedValue,
  textPlant,
}) {

  


  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  const handleFertilization = () => {
      setCurrentPage("FertilizingManual");
      setAnimatePage(true);
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  const handleSave = () => {
    const htmlContent = getPlantationDetailsHtml(calculatedPlantDensity,numberOfPlants,textPlant,textRowspace,textplantspace,perimeter,area);
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
        <p style={styles.titleText1}>Plantation Details</p>
      </div>

      {/* first box  */}


      <div style={styles.Box1}>
        <p style={styles.titleText}>Total Plants</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <div >
              <MdGrass color="gray" size={30} />
            </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Plant count</p>
              <p style={styles.propertyValue}>{numberOfPlants} Plants</p>
            </div>
          </div>

          <div className="property" style={styles.property}>
            <GiGrassMushroom color="gray" size={30} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Plant Density</p>
              <p style={styles.propertyValue}>
                {calculatedPlantDensity} / m<sup>2</sup>
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
            <FaTree name="tree" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>Plant Type</p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textPlant}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <RxRowSpacing  style={{ transform: "rotate(90deg)" }}name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Plant Spacing
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textplantspace}{PlantSpaceUnitselectedValue}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <MdFormatLineSpacing name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Row Spacing
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textRowspace}{RowSpaceUnitselectedValue}</p>
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        <button style={styles.Button1} onClick={handleFertilization}>
          <p style={styles.Box4ButtonText}>Fertilization</p>
        </button>
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
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "FertilizingManual" && (
          <FertilizingManual
            onBackToSidebar={handleBackClick}
            textPlant={textPlant}
            calculatedPlantDensity={calculatedPlantDensity}
            numberOfPlants={numberOfPlants}
            area={area}
            perimeter={perimeter}
            AreaUnitselectedValue={AreaUnitselectedValue}
            PerimeterUnitselectedValue={PerimeterUnitselectedValue}


          />
        )}
      </div>
    </div>
  );
}
