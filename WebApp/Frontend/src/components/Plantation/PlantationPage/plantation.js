import React, { useEffect, useState } from "react";
import { MdArrowBack, MdFormatLineSpacing } from "react-icons/md";
import { RxRowSpacing } from "react-icons/rx";
import { PiTreeEvergreenFill } from "react-icons/pi";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./plantationStyles.js";
import Select from "react-select";
import { message, Button } from "antd";
import PlantationDetails from "../PlantationDetails/plantationDetails";
import AxiosInstance from "../../../AxiosInstance";
import TemplateDetails from "../../SavedTemplates/TemplateDetails.js";
export default function Plantation({
  onBackToSidebar,
  id,
  Perimeter,
  area,
  onEditTemplateClick,
  template,
  plantationdata,
}) {
  const [PlantSpaceUnitselectedValue, setPlantSpaceUnitselectedValue] =
    useState("");
  const [RowSpaceUnitselectedValue, setRowSpaceUnitselectedValue] =
    useState("");
  const [PlantSpaceUnitselectedValue1, setPlantSpaceUnitselectedValue1] =
    useState("");
  const [RowSpaceUnitselectedValue1, setRowSpaceUnitselectedValue1] =
    useState("");
  const [textplantspace, settextplantspace] = useState("");
  const [textRowspace, settextRowspace] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const [plants, setPlants] = useState([]);
  const [textPlant, setTextPlant] = useState(null);
  const [editMode,setEditMode]=useState(false);
  
  useEffect(() => {
    fetchPlants();

    if (plantationdata) {
      setEditMode(true);
      setTextPlant( {value:plantationdata.PlnatType,label:plantationdata.PlnatType} );
      settextplantspace(plantationdata.plantspace);
      setPlantSpaceUnitselectedValue(plantationdata.Unit);
      setPlantSpaceUnitselectedValue1({ value: plantationdata.Unit, label: plantationdata.Unit });
      settextRowspace(plantationdata.rowSpace);
      setRowSpaceUnitselectedValue1({ value: plantationdata.Unit, label: plantationdata.Unit });
      setRowSpaceUnitselectedValue(plantationdata.Unit);
    }
  }, [plantationdata]);

  const fetchPlants = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/Plants"
      );
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      message.error("Failed to fetch plants. Please try again.");
    }
  };

  const handleInput1Change = (event) => {
    settextplantspace(event.target.value);
  };

  const handleInput2Change = (event) => {
    settextRowspace(event.target.value);
  };

  const backtotemp = () => {
    setCurrentPage("TemplateDetails"); 
    setAnimatePage(true);
  };
  const handlePlantSpaceUnitChange = (selectedOption) => {
    setPlantSpaceUnitselectedValue1(selectedOption);
    setPlantSpaceUnitselectedValue(selectedOption.value);
  };

  const handleRowSpaceUnitChange = (selectedOption) => {
    setRowSpaceUnitselectedValue1(selectedOption);
    setRowSpaceUnitselectedValue(selectedOption.value);
  };

  let plantSpaceInMeters = textplantspace;
  let rowSpaceInMeters = textRowspace;

  if (PlantSpaceUnitselectedValue === "cm") {
    plantSpaceInMeters = parseFloat(textplantspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    plantSpaceInMeters = plantSpaceInMeters;
  }

  if (PlantSpaceUnitselectedValue === "cm") {
    rowSpaceInMeters = parseFloat(textRowspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    rowSpaceInMeters = rowSpaceInMeters;
  }

  const handlePlantationDetails = async (e) => {
    // Validate the data
    if (
      !PlantSpaceUnitselectedValue ||
      !RowSpaceUnitselectedValue ||
      !textPlant ||
      !textplantspace ||
      !textRowspace
    ) {
      message.error("Please fill all input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow decimal and float numbers
    if (!regex.test(textplantspace) || !regex.test(textRowspace)) {
      message.error("Please fill valid input");
      return;
    }

    try {
      const method = editMode ? 'put' : 'post';
      const url = editMode ? `/api/plantation/plantation/${id}` : '/api/plantation/plantation';
  
      const response = await AxiosInstance[method](url, {
        id,
        area,
        textPlant: textPlant ? textPlant.value : null,
        textplantspace: plantSpaceInMeters,
        textRowspace: rowSpaceInMeters,
        PlantSpaceUnitselectedValue: "m", // Send 'm' as the unit
      });

      console.log("Response:", response.data);
      setCurrentPage("plantationDetails");
      setAnimatePage(true);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error(
        `Failed to ${editMode ? 'update' : 'create'} plantation. Please try again.`
      );
    }
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
              onClick={backtotemp}
              style={styles.backButton}
              fontSize={20}
            />
            <p style={styles.titleText1}>Plantation</p>
          </div>

          {/* first box */}

          <div style={styles.Box1}>
            <p style={styles.titleText}>Land Info</p>
            <div style={styles.propertyBox}>
              <div style={styles.property}>
                <BsBoundingBox color="gray" size={28} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Perimeter</p>
                  <p style={styles.propertyValue}> {parseFloat(Perimeter).toFixed(2)} Km</p>
                </div>
              </div>
              <div style={styles.property}>
                <PiSquareDuotone color="gray" size={35} />
                <div style={styles.propertyDetails}>
                  <p style={styles.propertyLabel}>Area</p>
                  <p style={styles.propertyValue}> {parseFloat(area).toFixed(2)} Perch</p>
                </div>
              </div>
            </div>
          </div>

          {/* box 2 */}
          <div style={styles.box2}>
            <div style={styles.box2Property1}>
              <PiTreeEvergreenFill name="plant" size={25} color="gray" />
              <div style={styles.box2PropertyDetails}>
                <p style={styles.Box2PropertyLabel}>Plant</p>
              </div>
            </div>
            <div style={styles.box2Property2}>
              <Select
                style={{ width: "120%" }}
                placeholder="Select a plant"
                value={textPlant}
                onChange={(selectedOption) => setTextPlant(selectedOption)}
                options={plants.map((plant) => ({
                  value: plant.Name,
                  label: plant.Name,
                }))}
              />
            </div>
          </div>
          {/* box 3 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <RxRowSpacing
                  name="format-line-spacing"
                  size={25}
                  color="gray"
                />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Plant Spacing</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="0"
                  value={textplantspace}
                  onChange={handleInput1Change}
                />
                <Select
                  placeholder="unit"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={PlantSpaceUnitselectedValue1}
                  onChange={handlePlantSpaceUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "78px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          {/* box 4 */}
          <div style={styles.box3}>
            <div style={styles.box3Property}>
              <div style={{ transform: "rotate(90deg)" }}>
                <MdFormatLineSpacing
                  name="format-row-spacing"
                  size={25}
                  color="gray"
                />
              </div>
              <div style={styles.box3PropertyDetails}>
                <p style={styles.Box3PropertyLabel}>Row Spacing</p>
              </div>
            </div>
            <div style={styles.box3Property}>
              <div style={styles.box3inputContainer}>
                <input
                  type="text"
                  style={styles.box3input}
                  placeholder="0"
                  value={textRowspace}
                  onChange={handleInput2Change}
                />
                <Select
                  placeholder="unit"
                  options={[
                    { value: "m", label: "m" },
                    { value: "cm", label: "cm" },
                  ]}
                  value={RowSpaceUnitselectedValue1}
                  onChange={handleRowSpaceUnitChange}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      textAlign: "center",
                      fontSize: "14px",
                      width: "78px",
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          {/* calculate button */}
          <div style={styles.bottom}>
            <Button
              type="primary"
              style={styles.Button1}
              onClick={handlePlantationDetails}
            >
              <p style={{ fontSize: 13 }}>Calculate Plantation</p>
            </Button>
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
        {currentPage === "plantationDetails" && (
          <PlantationDetails
            onBackToSidebar={onBackToSidebar}
            onback={handleBackClick}
            id={id}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "TemplateDetails" && (
          <TemplateDetails
            onBackToSidebar={onBackToSidebar}
            id={id}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
      </div>
    </div>
  );
}