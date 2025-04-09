import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
  OverlayView,
} from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";
import { styles, containerStyle } from "./ManagemapStyles";
import AxiosInstance from "../AxiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiGrid,
  FiEdit,
  FiX,
  FiSave,
  FiTag,
  FiTrash2,
} from "react-icons/fi";
import { GiBulldozer } from "react-icons/gi";
import { FaArrowPointer } from "react-icons/fa6";
import { PiPlantLight } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { GrUndo } from "react-icons/gr";
import { message, Button, Modal, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PiSelectionForeground } from "react-icons/pi";
import { GrCompliance } from "react-icons/gr";
import PlantationSetupModal from "./PlantationSetupModal";
import { TbFence } from "react-icons/tb";
import FenceSetupModal from "./FenceSetupModal";
import ClearLandSetupModal from "./ClearLandSetupModal ";
import TemplateDataModal from "./TemplateDataModal ";

const { confirm } = Modal;

const Managemap = () => {
  const { templateId } = useParams();
  const [points, setPoints] = useState([]);
  const [partitionPolygons, setPartitionPolygons] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [editingPolygonIndex, setEditingPolygonIndex] = useState(null);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const drawingManagerRef = useRef(null);
  const polygonRefs = useRef([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mapTypeId, setMapTypeId] = useState("satellite");
  const [toolButtonHovered, setToolButtonHovered] = useState(null);
  const [labelText, setLabelText] = useState("");
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [PlantationSetupModalVisible, setPlantationSetupModalVisible] =
    useState(false);
  const navigate = useNavigate();
  const [selectedPolygonData, setSelectedPolygonData] = useState(null);
  const [fenceSetupData, setFenceSetupData] = useState({});
  const [plantationSetupData, setPlantationSetupData] = useState({});
  const [isEditingPlantation, setIsEditingPlantation] = useState(false);
  const [isEditingFence, setIsEditingFence] = useState(false);
  const [fenceSetupModalVisible, setFenceSetupModalVisible] = useState(false);
  const [clearLandSetupModalVisible, setClearLandSetupModalVisible] =
    useState(false);
  const [clearLandSetupData, setClearLandSetupData] = useState({});
  const [drawingMode, setDrawingMode] = useState(null);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [multiSelectedPolygons, setMultiSelectedPolygons] = useState([]);
  const [templateData, setTemplateData] = useState(null);
  const [templateDataModalVisible, setTemplateDataModalVisible] =
    useState(false);

  const handleMapClick = () => {
    if (selectedPolygonIndex !== null) {
      setSelectedPolygonIndex(null);
    }
  };

  const deleteSelectedPolygons = async () => {
    if (multiSelectedPolygons.length > 0) {
      const updatedPolygons = partitionPolygons.filter(
        (_, index) => !multiSelectedPolygons.includes(index)
      );

      confirm({
        title: "Are you sure?",
        content: `Do you want to delete ${
          multiSelectedPolygons.length
        } selected partition${multiSelectedPolygons.length > 1 ? "s" : ""}?`,
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        async onOk() {
          try {
            await AxiosInstance.put(
              `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
              {
                partitionPolygons: updatedPolygons,
              }
            );
            setPartitionPolygons(updatedPolygons);
            setMultiSelectedPolygons([]);
            setMultiSelectMode(false);
            message.success(
              `${multiSelectedPolygons.length} partition${
                multiSelectedPolygons.length > 1 ? "s" : ""
              } deleted successfully!`
            );
          } catch (error) {
            console.error("Error deleting partition polygons:", error);
            message.error("Failed to delete partition polygons.");
          }
        },
        onCancel() {
          console.log("Cancelled");
        },
      });
    } else {
      message.warning("No polygons selected for deletion.");
    }
  };

  const toggleMultiSelectMode = () => {
    setDrawingMode(null);
    setMultiSelectMode(!multiSelectMode);
    if (multiSelectMode) {
      // Clear selections when exiting multi-select mode
      setMultiSelectedPolygons([]);
    }
  };

  const handleMultiSelect = (index) => {
    if (multiSelectMode) {
      setMultiSelectedPolygons((prevSelected) => {
        if (prevSelected.includes(index)) {
          return prevSelected.filter((i) => i !== index);
        } else {
          return [...prevSelected, index];
        }
      });
    }
  };

  const handleClearLandSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setClearLandSetupModalVisible(true);
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleClearLandSetupSave = (data) => {
    setClearLandSetupData((prevData) => ({
      ...prevData,
      [selectedPolygonIndex]: data,
    }));

    // Update the partitionPolygons state
    setPartitionPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons];
      updatedPolygons[selectedPolygonIndex] = {
        ...updatedPolygons[selectedPolygonIndex],
        clearLandSetup: data,
      };
      return updatedPolygons;
    });

    // Save the updated data to the backend
    savePartitionPoints();

    message.success("Clear land setup data saved successfully!");
    setClearLandSetupModalVisible(false);
  };

  const handleEditFenceSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
      setIsEditingFence(true);
      setFenceSetupModalVisible(true);
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleFenceSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
      setFenceSetupModalVisible(true);
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleFenceSetupSave = (data) => {
    setFenceSetupData((prevData) => ({
      ...prevData,
      [selectedPolygonIndex]: data,
    }));

    // Update the partitionPolygons state
    setPartitionPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons];
      updatedPolygons[selectedPolygonIndex] = {
        ...updatedPolygons[selectedPolygonIndex],
        fenceSetup: data,
      };
      return updatedPolygons;
    });

    // Save the updated data to the backend
    savePartitionPoints();

    message.success("Fence setup data saved successfully!");
    setFenceSetupModalVisible(false);
  };

  const handleEditPlantation = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setIsEditingPlantation(true);
      setPlantationSetupModalVisible(true);
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
    }
  };

  const handlePlantationSetupSave = (data) => {
    setPlantationSetupData((prevData) => ({
      ...prevData,
      [selectedPolygonIndex]: data,
    }));

    // Update the partitionPolygons state
    setPartitionPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons];
      updatedPolygons[selectedPolygonIndex] = {
        ...updatedPolygons[selectedPolygonIndex],
        plantationSetup: data,
      };
      return updatedPolygons;
    });

    // Save the updated data to the backend
    savePartitionPoints();

    message.success("Plantation setup data saved successfully!");
    setPlantationSetupModalVisible(false);
  };

  const handlePlantationSetup = () => {
    if (selectedPolygonIndex !== null) {
      const selectedPolygon = partitionPolygons[selectedPolygonIndex];
      setPlantationSetupModalVisible(true);
      // Pass only the area and perimeter to the modal
      setSelectedPolygonData({
        area: selectedPolygon.area,
        perimeter: selectedPolygon.perimeter,
      });
    } else {
      message.warning("Please select a partition first.");
    }
  };

  const handleAddLabel = () => {
    if (selectedPolygonIndex !== null) {
      const currentPolygon = partitionPolygons[selectedPolygonIndex];
      if (currentPolygon.label) {
        setLabelText(currentPolygon.label);
      } else {
        setLabelText("");
      }
      setShowLabelInput(true);
    }
  };

  const handleLabelSubmit = () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = [...partitionPolygons];
      updatedPolygons[selectedPolygonIndex].label = labelText;
      setPartitionPolygons(updatedPolygons);
      setShowLabelInput(false);
      setLabelText("");
    }
  };

  const handleDeleteLabel = () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = [...partitionPolygons];
      delete updatedPolygons[selectedPolygonIndex].label;
      setPartitionPolygons(updatedPolygons);
      setShowLabelInput(false);
      setLabelText("");
      message.success("Label deleted successfully");

      // Save the updated data to the backend
      savePartitionPoints();
    }
  };

  const calculatePolygonCenter = (points) => {
    let lat = 0,
      lng = 0;
    for (let point of points) {
      lat += point.latitude;
      lng += point.longitude;
    }
    return {
      lat: lat / points.length,
      lng: lng / points.length,
    };
  };

  const handleGeofenceComplete = (polygon) => {
    polygon.setEditable(true);
    const newPoints = polygon
      .getPath()
      .getArray()
      .map((latLng) => ({
        latitude: latLng.lat(),
        longitude: latLng.lng(),
      }));

    // Calculate area and perimeter
    const stats = calculatePolygonStats(polygon);

    const newPolygon = {
      points: newPoints,
      area: stats.area,
      perimeter: stats.perimeter,
    };

    setPartitionPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
    //setDrawingEnabled(false);

    polygon.setMap(null);

    // Show popup with area and perimeter
    Modal.info({
      title: "Polygon Statistics",
      content: (
        <div>
          <p>Area: {stats.area} sq meters</p>
          <p>Perimeter: {stats.perimeter} meters</p>
        </div>
      ),
      onOk() {},
    });
  };

  const calculatePolygonStats = (polygon) => {
    const path = polygon.getPath();
    const area = window.google.maps.geometry.spherical.computeArea(path);
    const perimeter = window.google.maps.geometry.spherical.computeLength(path);
    return {
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
    };
  };

  const toggleDrawingMode = () => {
    setDrawingEnabled(true);
    setEditingPolygonIndex(null);
    setSelectedPolygonIndex(null);
    setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
  };

  const toggleSelectionMode = () => {
    setDrawingMode(null);
    setEditingPolygonIndex(null);
    setSelectedPolygonIndex(null);
  };

  const savePartitionPoints = async () => {
    try {
      const updatedPartitionPolygons = partitionPolygons.map(
        (polygon, index) => ({
          ...polygon,
          plantationSetup: plantationSetupData[index] || {},
          fenceSetup: fenceSetupData[index] || {},
          clearLandSetup: clearLandSetupData[index] || {},
        })
      );

      const response = await AxiosInstance.put(
        `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
        {
          partitionPolygons: updatedPartitionPolygons,
        }
      );
      console.log("Save response:", response.data);
      message.success("Partition polygons saved successfully!");
    } catch (error) {
      console.error("Error saving partition polygons:", error);
      message.error("Failed to save partition polygons.");
    }
  };

  const save = async () => {
    try {
      confirm({
        title: "Are you sure?",
        content: "Do you want to Save the partition?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        async onOk() {
          try {
            const updatedPartitionPolygons = partitionPolygons.map(
              (polygon, index) => {
                const updatedPolygon = { ...polygon };

                // Only include plantationSetup if it has content
                if (
                  plantationSetupData[index] &&
                  Object.keys(plantationSetupData[index]).length > 0
                ) {
                  updatedPolygon.plantationSetup = plantationSetupData[index];
                }

                // Only include fenceSetup if it has content
                if (
                  fenceSetupData[index] &&
                  Object.keys(fenceSetupData[index]).length > 0
                ) {
                  updatedPolygon.fenceSetup = fenceSetupData[index];
                }

                // Only include clearLandSetup if it has content
                if (
                  clearLandSetupData[index] &&
                  Object.keys(clearLandSetupData[index]).length > 0
                ) {
                  updatedPolygon.clearLandSetup = clearLandSetupData[index];
                }

                return updatedPolygon;
              }
            );

            const response = await AxiosInstance.put(
              `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
              {
                partitionPolygons: updatedPartitionPolygons,
              }
            );
            console.log("Save response:", response.data);
            message.success("Partition polygons saved successfully!");
            window.location.reload();
          } catch (error) {
            console.error("Error saving partition polygons:", error);
            message.error("Failed to save partition polygons.");
          }
        },
        onCancel() {
          console.log("Cancelled");
        },
      });
    } catch (error) {
      console.error("Error showing confirmation dialog:", error);
    }
  };

  const handlePolygonClick = (index) => {
    setSelectedPolygonIndex(index);
    setEditingPolygonIndex(null);
    setShowLabelInput(false);

    const selectedPolygon = partitionPolygons[index];
    const PlantationData = plantationSetupData[index];
    const fenceData = fenceSetupData[index];
    const clearLandData = clearLandSetupData[index];

    console.log("Clear land data:", clearLandData);

    const styles = {
      modalContent: {
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.5,
      },
      heading: {
        color: "#333",
        marginTop: "1em",
      },
      paragraph: {
        margin: "0.5em 0",
      },
      section: {
        marginTop: "1em",
        paddingTop: "1em",
        borderTop: "1px solid #e0e0e0",
      },
      firstSection: {
        marginTop: "1em",
        paddingTop: "0",
        borderTop: "none",
      },
      highlight: {
        fontWeight: "bold",
        color: "#007BFF",
      },
    };

    let modalContent = (
      <div style={styles.modalContent}>
        <p style={styles.paragraph}>
          Area:{" "}
          <span style={styles.highlight}>{selectedPolygon.area} sq meters</span>
        </p>
        <p style={styles.paragraph}>
          Perimeter:{" "}
          <span style={styles.highlight}>
            {selectedPolygon.perimeter} meters
          </span>
        </p>
        <p style={styles.paragraph}>
          Label:{" "}
          <span style={styles.highlight}>
            {selectedPolygon.label || "No label"}
          </span>
        </p>
      </div>
    );

    if (PlantationData) {
      modalContent = (
        <div style={styles.modalContent}>
          {modalContent}
          <div style={styles.firstSection}>
            <h4 style={styles.heading}>Plantation Data:</h4>
            <p style={styles.paragraph}>
              Plant Type:{" "}
              <span style={styles.highlight}>
                {PlantationData.plantType || "N/A"}
              </span>
            </p>
            <p style={styles.paragraph}>
              Plant Spacing:{" "}
              <span style={styles.highlight}>
                {PlantationData.plantSpacing
                  ? PlantationData.plantSpacing.toFixed(2)
                  : "N/A"}{" "}
                meters
              </span>
            </p>
            <p style={styles.paragraph}>
              Row Spacing:{" "}
              <span style={styles.highlight}>
                {PlantationData.rowSpacing
                  ? PlantationData.rowSpacing.toFixed(2)
                  : "N/A"}{" "}
                meters
              </span>
            </p>
            <p style={styles.paragraph}>
              Number of Plants:{" "}
              <span style={styles.highlight}>
                {PlantationData.numberOfPlants || "N/A"}
              </span>
            </p>
            <p style={styles.paragraph}>
              Plantation Density:{" "}
              <span style={styles.highlight}>
                {PlantationData.plantationDensity
                  ? PlantationData.plantationDensity.toFixed(2)
                  : "N/A"}{" "}
                plants/sq m
              </span>
            </p>
            {PlantationData.fertilizerData &&
              Object.values(PlantationData.fertilizerData).some(
                (value) =>
                  value !== null &&
                  value !== undefined &&
                  value !== "" &&
                  !isNaN(value)
              ) && (
                <div style={styles.section}>
                  <h4 style={styles.heading}>Fertilizer Data:</h4>
                  {PlantationData.fertilizerData.fertilizerType && (
                    <p style={styles.paragraph}>
                      Fertilizer Type:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.fertilizerType}
                      </span>
                    </p>
                  )}
                  {PlantationData.fertilizerData.fertilizerFrequency && (
                    <p style={styles.paragraph}>
                      Frequency:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.fertilizerFrequency}
                      </span>
                    </p>
                  )}
                  {PlantationData.fertilizerData.fertilizerTimes && (
                    <p style={styles.paragraph}>
                      Times:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.fertilizerTimes}
                      </span>
                    </p>
                  )}
                  {PlantationData.fertilizerData.fertilizerAmount && (
                    <p style={styles.paragraph}>
                      Amount:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.fertilizerAmount}{" "}
                        {PlantationData.fertilizerData.fertilizerUnit || ""}
                      </span>{" "}
                    </p>
                  )}
                  {PlantationData.fertilizerData.totalFertilizerPerYear && (
                    <p style={styles.paragraph}>
                      Total Fertilizer per Year:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.totalFertilizerPerYear.toFixed(
                          2
                        )}{" "}
                        kg
                      </span>
                    </p>
                  )}
                  {PlantationData.fertilizerData.fertilizerPerPlant && (
                    <p style={styles.paragraph}>
                      Fertilizer per Plant:{" "}
                      <span style={styles.highlight}>
                        {PlantationData.fertilizerData.fertilizerPerPlant.toFixed(
                          2
                        )}{" "}
                        kg
                      </span>
                    </p>
                  )}
                </div>
              )}
          </div>
        </div>
      );
    }

    if (
      fenceData &&
      Object.keys(fenceData).length > 0 &&
      (fenceData.fenceType ||
        fenceData.postSpacing ||
        fenceData.numberOfSticks ||
        (fenceData.gates && fenceData.gates.length > 0))
    ) {
      modalContent = (
        <div style={styles.modalContent}>
          {modalContent}
          <div style={styles.section}>
            <h4 style={styles.heading}>Fence Data:</h4>
            {fenceData.fenceType && (
              <p style={styles.paragraph}>
                Fence Type:{" "}
                <span style={styles.highlight}>{fenceData.fenceType}</span>
              </p>
            )}
            {fenceData.postSpacing && (
              <p style={styles.paragraph}>
                Post Spacing:{" "}
                <span style={styles.highlight}>
                  {fenceData.postSpacing} {fenceData.postSpacingUnit}
                </span>
              </p>
            )}
            {fenceData.numberOfSticks && (
              <p style={styles.paragraph}>
                Number of Sticks:{" "}
                <span style={styles.highlight}>{fenceData.numberOfSticks}</span>
              </p>
            )}
            {fenceData.gates && fenceData.gates.length > 0 && (
              <>
                <h6 style={{ marginTop: "0.2em" }}>Gates:</h6>
                {fenceData.gates.map((gate, idx) => (
                  <p key={idx} style={styles.paragraph}>
                    Gate {idx + 1}:{" "}
                    <span style={styles.highlight}>
                      {gate.length}m x {gate.count}
                    </span>
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      );
    }

    if (
      clearLandData &&
      typeof clearLandData === "object" &&
      Object.keys(clearLandData).length > 0 &&
      (clearLandData.weedData.weedType ||
        clearLandData.plantData.plantList ||
        clearLandData.stoneData.stoneList)
    ) {
      modalContent = (
        <div style={styles.modalContent}>
          {modalContent}
          <div style={styles.section}>
            {/* Weed Data */}

            {clearLandData.weedData &&
              typeof clearLandData.weedData === "object" && (
                <div>
                  {clearLandData.weedData.weedType && (
                    <>
                      <h4 style={styles.heading}>Clear Land Data:</h4>
                      <h6 style={{ marginTop: "0.2em" }}>Weed Data:</h6>
                      <p style={styles.paragraph}>
                        Weed Type:{" "}
                        <span style={styles.highlight}>
                          {clearLandData.weedData.weedType}
                        </span>
                      </p>
                    </>
                  )}

                  {clearLandData.weedData.labourCount && (
                    <p style={styles.paragraph}>
                      Labour Count:{" "}
                      <span style={styles.highlight}>
                        {clearLandData.weedData.labourCount}
                      </span>
                    </p>
                  )}
                  {clearLandData.weedData.workHours && (
                    <p style={styles.paragraph}>
                      Work Hours:{" "}
                      <span style={styles.highlight}>
                        {clearLandData.weedData.workHours}
                      </span>
                    </p>
                  )}
                  {clearLandData.weedData.machineList &&
                    clearLandData.weedData.machineList.length > 0 && (
                      <>
                        <div style={styles.paragraph}>
                          <h6 style={{ marginTop: "0.2em" }}>Machines:</h6>
                          {clearLandData.weedData.machineList.map(
                            (machine, idx) => (
                              <p key={idx} style={styles.highlight}>
                                {machine}
                              </p>
                            )
                          )}
                        </div>
                      </>
                    )}
                  {clearLandData.weedData.weedCalculationResults && (
                    <div>
                      <h6 style={{ marginTop: "0.2em" }}>
                        Weed Efforrt Output:
                      </h6>
                      <p style={styles.paragraph}>
                        Total Hours For Weeding:{" "}
                        <span style={styles.highlight}>
                          {clearLandData.weedData.weedCalculationResults.weedEffort.toFixed(
                            2
                          )}
                        </span>
                      </p>
                      {/* <p style={styles.paragraph}>
                  Total Time: <span style={styles.highlight}>{clearLandData.weedData.weedCalculationResults.totalTime}</span>
                </p> */}
                    </div>
                  )}
                </div>
              )}

            {/* Plant Data */}
            {clearLandData.plantData && (
              <div>
                {clearLandData.plantData.plantList &&
                  clearLandData.plantData.plantList.length > 0 && (
                    <>
                      <h5 style={styles.heading}>Plant Data:</h5>
                      <h6 style={styles.heading}>Plants:</h6>
                      {clearLandData.plantData.plantList.map((plant, idx) => (
                        <p key={idx} style={styles.highlight}>
                          {plant}
                        </p>
                      ))}
                    </>
                  )}
                {clearLandData.plantData.plantWorkHours && (
                  <p style={styles.paragraph}>
                    Plant Work Hours:{" "}
                    <span style={styles.highlight}>
                      {clearLandData.plantData.plantWorkHours}
                    </span>
                  </p>
                )}
                {clearLandData.plantData.plantMachineList &&
                  clearLandData.plantData.plantMachineList.length > 0 && (
                    <>
                      <h6 style={{ marginTop: "0.2em" }}>Plant Machines:</h6>
                      {clearLandData.plantData.plantMachineList.map(
                        (machine, idx) => (
                          <p key={idx} style={styles.highlight}>
                            {machine}
                          </p>
                        )
                      )}
                    </>
                  )}
                {clearLandData.plantData.plantCalculationResults && (
                  <div>
                    <h6 style={{ marginTop: "0.2em" }}>
                      plants Efforrt Output:
                    </h6>
                    <p style={styles.paragraph}>
                      Total Hours For clear plants:{" "}
                      <span style={styles.highlight}>
                        {clearLandData.plantData.plantCalculationResults.plantEffort.toFixed(
                          2
                        )}
                      </span>
                    </p>
                    {/* <p style={styles.paragraph}>
                  Total Time: <span style={styles.highlight}>{clearLandData.plantData.plantCalculationResults.totalTime}</span>
                </p> */}
                  </div>
                )}
              </div>
            )}

            {/* Stone Data */}
            {clearLandData.stoneData && (
              <div>
                {clearLandData.stoneData.stoneList &&
                  clearLandData.stoneData.stoneList.length > 0 && (
                    <>
                      <h5 style={styles.heading}>Stone Data:</h5>
                      <h6 style={styles.heading}>Stones:</h6>
                      {clearLandData.stoneData.stoneList.map((stone, idx) => (
                        <p key={idx} style={styles.highlight}>
                          {stone}
                        </p>
                      ))}
                    </>
                  )}
                {clearLandData.stoneData.stoneWorkHours && (
                  <p style={styles.paragraph}>
                    Stone Work Hours:{" "}
                    <span style={styles.highlight}>
                      {clearLandData.stoneData.stoneWorkHours}
                    </span>
                  </p>
                )}
                {clearLandData.stoneData.stoneMachineList &&
                  clearLandData.stoneData.stoneMachineList.length > 0 && (
                    <>
                      <h6 style={{ marginTop: "0.2em" }}>Stone Machines:</h6>
                      {clearLandData.stoneData.stoneMachineList.map(
                        (machine, idx) => (
                          <p key={idx} style={styles.highlight}>
                            {machine}
                          </p>
                        )
                      )}
                    </>
                  )}
                {clearLandData.stoneData.stoneCalculationResults && (
                  <div>
                    <h6 style={{ marginTop: "0.2em" }}>
                      Stone Efforrt Output:
                    </h6>
                    <p style={styles.paragraph}>
                      Total Hours For Stone Cleaning:{" "}
                      <span style={styles.highlight}>
                        {clearLandData.stoneData.stoneCalculationResults.stoneEffort.toFixed(
                          2
                        )}
                      </span>
                    </p>
                    {/* <p style={styles.paragraph}>
                  Total Time: <span style={styles.highlight}>{clearLandData.stoneData.stoneCalculationResults.totalTime}</span>
                </p> */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    Modal.info({
      title: "Partition Statistics",
      content: modalContent,
      width: 500,
      onOk() {},
    });
  };

  const deleteSelectedPolygon = async () => {
    if (selectedPolygonIndex !== null) {
      const updatedPolygons = partitionPolygons.filter(
        (_, index) => index !== selectedPolygonIndex
      );

      // Confirm before deleting
      confirm({
        title: "Are you sure?",
        content: "Do you want to Delete partition?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        async onOk() {
          try {
            await AxiosInstance.put(
              `/api/auth/mapTemplate/savePartitionPoints/${templateId}`,
              {
                partitionPolygons: updatedPolygons,
              }
            );
            setPartitionPolygons(updatedPolygons); // Update state after successful save
            setSelectedPolygonIndex(null);
            message.success("Partition polygon deleted successfully!"); // Use message.success for success
          } catch (error) {
            console.error("Error deleting partition polygon:", error);
            message.error("Failed to delete partition polygon."); // Use message.error for error
          }
        },
        onCancel() {
          console.log("Cancelled");
        },
      });
    } else {
      message.warning("No polygon selected for deletion."); // Inform user if no polygon is selected
    }
  };

  const editSelectedPolygon = () => {
    if (selectedPolygonIndex !== null) {
      setEditingPolygonIndex(selectedPolygonIndex);
      setUndoStack([partitionPolygons[selectedPolygonIndex]]); // Initialize undo stack with original polygon
      setSelectedPolygonIndex(null);
    }
  };

  const handlePolygonEdit = (index) => {
    if (editingPolygonIndex === index) {
      const polygon = polygonRefs.current[index];
      if (polygon) {
        const newPoints = polygon
          .getPath()
          .getArray()
          .map((latLng) => ({
            latitude: latLng.lat(),
            longitude: latLng.lng(),
          }));

        const stats = calculatePolygonStats(polygon);

        const updatedPolygon = {
          points: newPoints,
          area: stats.area,
          perimeter: stats.perimeter,
          label: partitionPolygons[index].label, // Preserve the label
        };

        setUndoStack((prevStack) => [...prevStack, updatedPolygon]);

        setPartitionPolygons((prevPolygons) => {
          const updatedPolygons = [...prevPolygons];
          updatedPolygons[index] = updatedPolygon;
          return updatedPolygons;
        });

        // Update the polygon on the map
        polygon.setPath(
          newPoints.map(
            (point) =>
              new window.google.maps.LatLng(point.latitude, point.longitude)
          )
        );
      }
    }
  };

  const undoEdit = () => {
    if (undoStack.length > 1 && editingPolygonIndex !== null) {
      const previousState = undoStack[undoStack.length - 2]; // Get the previous state
      const updatedPolygons = [...partitionPolygons];
      updatedPolygons[editingPolygonIndex] = previousState;
      setPartitionPolygons(updatedPolygons);
      setUndoStack((prevStack) => prevStack.slice(0, -1)); // Remove the last state

      // Update the polygon on the map
      const polygon = polygonRefs.current[editingPolygonIndex];
      if (polygon) {
        polygon.setPath(
          previousState.points.map(
            (point) =>
              new window.google.maps.LatLng(point.latitude, point.longitude)
          )
        );
      }
    }
  };

  const finishEditing = () => {
    setEditingPolygonIndex(null);
    setUndoStack([]);
    savePartitionPoints();
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/auth/mapTemplate/getOneTemplate/${templateId}`
        );
        console.log("Fetched template data:", response.data);
        const fetchedTemplateData = response.data;
        const fetchedPoints = response.data.locationPoints;
        const fetchedPartitionPolygons = response.data.partitionPolygons || [];
        setPoints(fetchedPoints);
        setPartitionPolygons(fetchedPartitionPolygons);
        setTemplateData(fetchedTemplateData);

        // Set plantation setup data
        const fetchedPlantationSetupData = {};
        // Set fence setup data
        const fetchedFenceSetupData = {};

        const fetchedClearLandSetupData = {};

        fetchedPartitionPolygons.forEach((polygon, index) => {
          if (polygon.plantationSetup) {
            fetchedPlantationSetupData[index] = polygon.plantationSetup;
          }
          if (polygon.fenceSetup) {
            fetchedFenceSetupData[index] = polygon.fenceSetup;
          }
          if (polygon.clearLandSetup) {
            fetchedClearLandSetupData[index] = polygon.clearLandSetup;
          }
        });
        setPlantationSetupData(fetchedPlantationSetupData);
        setFenceSetupData(fetchedFenceSetupData);
        setClearLandSetupData(fetchedClearLandSetupData);
        console.log(
          "Fetched clear land setup data:",
          fetchedClearLandSetupData
        );

        const avgLatitude =
          fetchedPoints.reduce((total, point) => total + point.latitude, 0) /
          fetchedPoints.length;
        const avgLongitude =
          fetchedPoints.reduce((total, point) => total + point.longitude, 0) /
          fetchedPoints.length;

        setCenter({ lat: avgLatitude, lng: avgLongitude });
      } catch (error) {
        console.error("An error occurred while fetching the template:", error);
      }
    };

    fetchTemplateData();
  }, [templateId]);
  const toggleMapType = () => {
    setMapTypeId((prevType) =>
      prevType === "roadmap" ? "satellite" : "roadmap"
    );
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const mapOptions = useCallback(() => {
    if (!window.google || typeof window.google === "undefined") return {};

    return {
      minZoom: 2,
      maxZoom: 40,
      mapTypeId: window.google.maps.MapTypeId.SATELLITE, // Add this line
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_LEFT,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    };
  }, []);

  return (
    <div style={styles.container}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}
        libraries={["places", "drawing", "geometry"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={20}
          options={mapOptions()}
          onClick={handleMapClick}
        >
          {points.length > 1 && (
            <Polygon
              path={points.map((point) => ({
                lat: point.latitude,
                lng: point.longitude,
              }))}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: "rgba(199, 192, 192, 0.5)",
                fillOpacity: 0.4,
                zIndex: 1,
              }}
            />
          )}

          {partitionPolygons.map((polygon, index) => (
            <React.Fragment key={index}>
              <Polygon
                path={polygon.points.map((point) => ({
                  lat: point.latitude,
                  lng: point.longitude,
                }))}
                options={{
                  strokeColor:
                    (multiSelectMode &&
                      multiSelectedPolygons.includes(index)) ||
                    (!multiSelectMode && selectedPolygonIndex === index)
                      ? "#00B640"
                      : "#0000FF",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  fillColor:
                    (multiSelectMode &&
                      multiSelectedPolygons.includes(index)) ||
                    (!multiSelectMode && selectedPolygonIndex === index)
                      ? "rgba(0, 182, 64, 0.2)"
                      : "rgba(0, 0, 255, 0.2)",
                  fillOpacity: 0.4,
                  zIndex: 2,
                  editable: editingPolygonIndex === index,
                  clickable: true,
                }}
                onClick={() =>
                  multiSelectMode
                    ? handleMultiSelect(index)
                    : handlePolygonClick(index)
                }
                onMouseUp={() => handlePolygonEdit(index)}
                onLoad={(polygon) => {
                  polygonRefs.current[index] = polygon;
                }}
              />
              {polygon.label && (
                <OverlayView
                  position={calculatePolygonCenter(polygon.points)}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.9)", // Slight transparency for a modern look
                      padding: "10px 15px", // More padding for better spacing
                      border: "1px solid #ddd", // Light gray border for a softer appearance
                      borderRadius: "8px", // Slightly more rounded corners
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {polygon.label}
                  </div>
                </OverlayView>
              )}
            </React.Fragment>
          ))}

          {drawingEnabled && (
            <DrawingManager
              onLoad={(drawingManager) => {
                drawingManagerRef.current = drawingManager;
              }}
              onPolygonComplete={handleGeofenceComplete}
              options={{
                drawingControl: false,
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.POLYGON,
                  ],
                },
                polygonOptions: {
                  fillColor: "#0000FF",
                  fillOpacity: 0.4,
                  strokeColor: "#0000FF",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  editable: true,
                  clickable: true,
                  zIndex: 2,
                },
                drawingMode: drawingMode,
              }}
            />
          )}

          {/* //toolbox */}

          <div style={{ ...styles.toolbox, top: "0px", right: "0" }}>
            <p style={styles.toolTitle}>Tools</p>
            <hr style={styles.toolHr}></hr>
            <Button
              onClick={() => setTemplateDataModalVisible(true)}
              icon={<BsClipboardData />}
              style={styles.toolButton}
            >
              Template Data
            </Button>
            <Button
              onClick={toggleDrawingMode}
              icon={<FiGrid />}
              style={styles.toolButton}
            >
              {drawingEnabled ? "Draw Polygon" : "Draw Polygon"}
            </Button>

            <Button
              onClick={toggleSelectionMode}
              icon={<FaArrowPointer />}
              style={styles.toolButton}
            >
              Select polygon
            </Button>
            <Button
              onClick={savePartitionPoints}
              icon={<FiSave />}
              style={styles.toolButton}
            >
              Save Partition
            </Button>

            {selectedPolygonIndex === null && (
              <Button
                onClick={toggleMultiSelectMode}
                icon={<PiSelectionForeground />}
                style={{
                  ...styles.toolButton,
                  backgroundColor: multiSelectMode ? "#4CAF50" : undefined,
                  color: multiSelectMode ? "white" : undefined,
                }}
              >
                {multiSelectMode ? "Exit Multi-Select" : "Select Multiple"}
              </Button>
            )}

            {multiSelectMode && (
              <Button
                onClick={deleteSelectedPolygons}
                icon={<MdDeleteForever />}
                style={styles.toolButton}
                disabled={multiSelectedPolygons.length === 0}
              >
                <span style={{ fontSize: "10px" }}>
                  Delete Selected ({multiSelectedPolygons.length})
                </span>
              </Button>
            )}
            {selectedPolygonIndex !== null && (
              <>
                <Button
                  onClick={deleteSelectedPolygon}
                  icon={<MdDeleteForever />}
                  style={styles.toolButton}
                >
                  Delete Partition
                </Button>
                <Button
                  onClick={editSelectedPolygon}
                  icon={<FiEdit />}
                  style={styles.toolButton}
                >
                  Edit Partition
                </Button>
                {partitionPolygons[selectedPolygonIndex].label ? (
                  <Button
                    onClick={handleAddLabel}
                    icon={<FiTag />}
                    style={styles.toolButton}
                  >
                    Edit Label
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddLabel}
                    icon={<FiTag />}
                    style={styles.toolButton}
                  >
                    Add Label
                  </Button>
                )}

                {showLabelInput && (
                  <div>
                    <Input
                      value={labelText}
                      onChange={(e) => setLabelText(e.target.value)}
                      placeholder="Enter label"
                      style={{
                        ...styles.toolButton,
                        borderColor: "#4CAF50",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                    <Button
                      onClick={handleLabelSubmit}
                      style={{
                        ...styles.toolButton,
                        backgroundColor: "#4CAF50",
                        borderColor: "#4CAF50",
                        color: "white",
                      }}
                    >
                      {partitionPolygons[selectedPolygonIndex].label
                        ? "Update Label"
                        : "Submit Label"}
                    </Button>

                    {partitionPolygons[selectedPolygonIndex].label && (
                      <Button
                        onClick={handleDeleteLabel}
                        style={{
                          ...styles.toolButton,
                          backgroundColor: "#FF4136",
                          borderColor: "#FF4136",
                          color: "white",
                          flex: 1,
                          marginLeft: "5px",
                        }}
                      >
                        Delete Label
                      </Button>
                    )}
                  </div>
                )}

                {plantationSetupData[selectedPolygonIndex] ? (
                  <Button
                    onClick={handleEditPlantation}
                    icon={<PiPlantLight />}
                    style={styles.toolButton}
                  >
                    Edit Plantation
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlantationSetup}
                    icon={<PiPlantLight />}
                    style={styles.toolButton}
                  >
                    Plantation
                  </Button>
                )}

                {fenceSetupData[selectedPolygonIndex] ? (
                  <Button
                    onClick={handleEditFenceSetup}
                    icon={<TbFence />}
                    style={styles.toolButton}
                  >
                    Edit Fence
                  </Button>
                ) : (
                  <Button
                    onClick={handleFenceSetup}
                    icon={<TbFence />}
                    style={styles.toolButton}
                  >
                    Fence Setup
                  </Button>
                )}

                {clearLandSetupData[selectedPolygonIndex] &&
                typeof clearLandSetupData[selectedPolygonIndex] === "object" &&
                Object.keys(clearLandSetupData[selectedPolygonIndex]).length >
                  0 &&
                (clearLandSetupData[selectedPolygonIndex].weedData.weedType ||
                  clearLandSetupData[selectedPolygonIndex].plantData
                    .plantList ||
                  clearLandSetupData[selectedPolygonIndex].stoneData
                    .stoneList) ? (
                  <Button
                    onClick={handleClearLandSetup}
                    icon={<GiBulldozer size={15} />}
                    style={styles.toolButton}
                  >
                    Clear Land
                  </Button>
                ) : (
                  <Button
                    onClick={handleClearLandSetup}
                    icon={<FiTrash2 />}
                    style={styles.toolButton}
                  >
                    Clear Land
                  </Button>
                )}
              </>
            )}

            {editingPolygonIndex !== null && (
              <>
                <Button
                  onClick={undoEdit}
                  disabled={undoStack.length <= 1}
                  icon={<GrUndo />}
                  style={styles.toolButton}
                >
                  Undo
                </Button>
                <Button
                  onClick={finishEditing}
                  icon={<GrCompliance />}
                  style={styles.toolButton}
                >
                  Finish Editing
                </Button>
              </>
            )}
            <div style={styles.buttonContainer}>
              <Button style={styles.saveButton} onClick={save}>
                Save
              </Button>
              <Button style={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>

          <PlantationSetupModal
            visible={PlantationSetupModalVisible}
            onClose={() => {
              setPlantationSetupModalVisible(false);
              setIsEditingPlantation(false);
            }}
            area={selectedPolygonData?.area}
            perimeter={selectedPolygonData?.perimeter}
            onSave={handlePlantationSetupSave}
            existingData={
              isEditingPlantation
                ? plantationSetupData[selectedPolygonIndex]
                : null
            }
          />

          <FenceSetupModal
            visible={fenceSetupModalVisible}
            onClose={() => {
              setFenceSetupModalVisible(false);
              setIsEditingFence(false);
            }}
            area={selectedPolygonData?.area}
            perimeter={selectedPolygonData?.perimeter}
            onSave={handleFenceSetupSave}
            existingData={
              isEditingFence ? fenceSetupData[selectedPolygonIndex] : null
            }
          />

          <ClearLandSetupModal
            visible={clearLandSetupModalVisible}
            onClose={() => setClearLandSetupModalVisible(false)}
            area={selectedPolygonData?.area}
            perimeter={selectedPolygonData?.perimeter}
            onSave={handleClearLandSetupSave}
            existingData={clearLandSetupData[selectedPolygonIndex]}
          />

          <TemplateDataModal
            visible={templateDataModalVisible}
            onClose={() => setTemplateDataModalVisible(false)}
            data={templateData}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Managemap;
