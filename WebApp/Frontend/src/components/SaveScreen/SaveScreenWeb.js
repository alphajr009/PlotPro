import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import "./SaveScreenWebStyles.css";
import { FaVectorSquare } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";
import AxiosInstance from "../../AxiosInstance";

const SaveScreenWeb = ({ onBackToSidebar, hideMapButtons, landInfo }) => {
  const [area, setArea] = useState("0");
  const [perimeter, setPerimeter] = useState("0");
  const [locationPoints, setLocationPoints] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [templateName, setTemplateName] = useState(" ");
  const [measureName, setMeasureName] = useState(" coffee trees");
  const [landType, setLandType] = useState(" ");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(" ");

  useEffect(() => {
    if (landInfo) {
      setArea(landInfo.area);
      setPerimeter(landInfo.perimeter);
      setLocationPoints(landInfo.locationPoints);
      setImageUrl(landInfo.imageUrl);
    }
  }, [landInfo]);

  const handleTemplateNameChange = (e) => setTemplateName(e.target.value);
  const handleMeasureNameChange = (e) => setMeasureName(e.target.value);
  const handleLandTypeChange = (e) => setLandType(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSave = async () => {
    try {
      const response = await AxiosInstance.post(
        "/api/auth/mapTemplate/saveTemplate",
        {
          perimeter,
          area,
          templateName,
          measureName,
          landType,
          location,
          description,
          locationPoints,
          imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Template saved successfully:", response.data);
        alert("Template saved successfully");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error(
        "Error saving template:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="outer-div">
      <div className="save-screen">
        <div className="save-screen-header">
          <MdArrowBack
            onClick={() => {
              console.log("clicked back btn");
              hideMapButtons();
              onBackToSidebar();
            }}
            size={20}
            className="backBtn"
          />
        </div>
        <div className="land-info-div">
          <p className="bold-text">Land info</p>
          <div className="info-blocks">
            <div className="info-block">
              <FaVectorSquare className="info-icon" size={22} />
              <div>
                <p>Perimeter</p>
                <p className="bold-text">
                  {parseFloat(perimeter).toFixed(2)} km
                </p>
              </div>
            </div>
            <div className="info-block">
              <RiPieChart2Fill className="info-icon" size={25} />
              <div>
                <p>Area</p>
                <p className="bold-text">{parseFloat(area).toFixed(2)} perch</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mn-block">
          <label className="mn-label bold-text">Template Name:</label>
          <input
            className="mn-input"
            type="text"
            value={templateName}
            onChange={handleTemplateNameChange}
          />
        </div>
        <div className="mn-block">
          <label className="mn-label bold-text">Measure Name:</label>
          <input
            className="mn-input"
            type="text"
            value={measureName}
            onChange={handleMeasureNameChange}
          />
        </div>
        <div className="mn-block">
          <label className="mn-label bold-text">Land Type:</label>
          <input
            className="mn-input"
            type="text"
            value={landType}
            onChange={handleLandTypeChange}
          />
        </div>
        <div className="mn-block">
          <label className="mn-label bold-text">Location : </label>
          <input
            className="mn-input"
            type="text"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="desc-block">
          <label className="mn-label bold-text">Description:</label>
          <textarea
            className="desc-input"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {imageUrl && (
          <div className="map-snapshot">
            <img src={imageUrl} alt="Map Snapshot" height={"150px"} />
          </div>
        )}
        <div className="save-button-div">
          <button className="save-button" onClick={handleSave}>
            <FaRegSave />
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveScreenWeb;
