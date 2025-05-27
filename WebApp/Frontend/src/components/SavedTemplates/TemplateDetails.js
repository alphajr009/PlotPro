import React, { useState } from "react";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { PiPlantFill } from "react-icons/pi";
import { GiAxeInStump, GiWoodenFence,GiPlantRoots} from "react-icons/gi";
import "./TemplateDetails.css";
import { TbContainer } from "react-icons/tb";
import { HiChartPie } from "react-icons/hi2";
import { TbVector } from "react-icons/tb";
import { ImLocation2 } from "react-icons/im";
import Fence from "../Fence/Fence/fence";
import FenceDetails from "../Fence/FenceDetails/fenceDetails";
import ClearLand from "../ClearLand/ClearLand/clearLand";
import EffortOutput from "../ClearLand/EffortOutput/effortOutput";
import Plantation from "../Plantation/PlantationPage/plantation";
import PlantationDetails from "../Plantation/PlantationDetails/plantationDetails";
import AxiosInstance from "../../AxiosInstance";
import { Button, Modal, InputNumber, Table, Spin, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const TemplateDetails = ({
  onBackToSidebar,
  template,
  handleEditTemplateClick,
}) => {
  const id = template._id;
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);
  const navigate = useNavigate();

  const [clearLandDays, setClearLandDays] = useState(null);

  const handleEdit = (e) => {
    e.stopPropagation();
    handleEditTemplateClick(template);
  };
  const [currentLocation, setCurrentLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [region, setRegion] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({
  area: null,
  perimeter: null,
  imageUrl: null,
  longitude: null,
  latitude: null,
});

const [isModalVisible2, setIsModalVisible2] = useState(false);
const [selectedCrop, setSelectedCrop] = useState(null);
const [isLoadingCropAnalysis, setIsLoadingCropAnalysis] = useState(false);
const [cropAnalysis, setCropAnalysis] = useState(null);


const [isModalVisible3, setIsModalVisible3] = useState(false);
const [uploadedImage, setUploadedImage] = useState(null);
const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
const [isUploading, setIsUploading] = useState(false);
const [isLoadingSoilAnalysis, setIsLoadingSoilAnalysis] = useState(false);
const [soilAnalysis, setSoilAnalysis] = useState(null);




const [isLoading, setIsLoading] = useState(false);
const [apiResponse, setApiResponse] = useState(null);
const [currentStep, setCurrentStep] = useState(1);


  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  const navigateToRegister = () => {
    navigate(`/Managemap/${id}`); // Navigate to ManageMap page with template ID
  };


  const openAutomatedModel2 = () => {
    setIsModalVisible2(true);
    setSelectedCrop(null);
    setCropAnalysis(null);
};


const openAutomatedModel3 = () => {
  setIsModalVisible3(true);
  setUploadedImage(null);
  setUploadedImageUrl(null);
  setSoilAnalysis(null);
};


const uploadToImgbb = async (imageFile) => {
  const apiKey = "074328837193dc603f419619c5517209"; 
  const formData = new FormData();
  formData.append("image", imageFile);

  setIsUploading(true);
  setUploadedImageUrl(null);

  try {
      const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          }
      );

      if (response.data && response.data.data.url) {
          setUploadedImageUrl(response.data.data.url);
      } else {
          alert("Image upload failed. Try again.");
      }
  } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
  } finally {
      setIsUploading(false);
  }
};


const handleAnalyzeSoil = async () => {
  if (!uploadedImageUrl) {
    alert("Please upload an image first!");
    return;
  }

  if (!template.locationPoints || template.locationPoints.length === 0) {
    alert("Location data is missing for this template.");
    return;
  }

  const { latitude, longitude } = template.locationPoints[0];

  if (!latitude || !longitude) {
    alert("Latitude and Longitude are missing.");
    return;
  }

  setIsLoadingSoilAnalysis(true);
  setSoilAnalysis(null);

  try {
    console.log("📡 Sending API Request...");
    console.log("Payload:", {
      image_url: uploadedImageUrl,
      latitude: latitude,
      longitude: longitude,
    });

    const response = await axios.post(
      "http://127.0.0.1:5003/analyze-image",
      {
        image_url: uploadedImageUrl,
        latitude: latitude,
        longitude: longitude,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000, // Set timeout to 15 seconds
      }
    );

    console.log("✅ API Response Received:", response.data);

    // Simulate 10-second delay before showing results
    setTimeout(() => {
      if (response.data && response.data.response) {
        setSoilAnalysis(response.data.response);
      } else {
        alert("Unexpected API response format.");
      }
      setIsLoadingSoilAnalysis(false);
    }, 10000);

  } catch (error) {
    console.error("❌ Soil Analysis Error:", error);

    // Detailed error handling
    if (error.response) {
      // The server responded with a status outside the 2xx range
      console.error("📡 Server Response:", error.response.data);
      alert(`Error: ${error.response.data.error || "Failed to analyze soil data."}`);
    } else if (error.request) {
      // The request was made but no response received
      console.error("⏳ No Response from API. Possible Causes: Backend is down or network issue.");
      alert("No response received from the server. Please try again.");
    } else {
      // Something else happened
      alert("Error processing your request. Please try again.");
    }

    setIsLoadingSoilAnalysis(false);
  }
};


const openAutomatedModel = async (id) => {
  try {
      const response = await AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${id}`);

      if (response.data) {
          console.log("Template found", response.data);

          // Extract first location point
          const firstLocation = response.data.locationPoints[0] || {};

          setTemplateDetails({
              area: response.data.area,
              perimeter: response.data.perimeter,
              imageUrl: response.data.imageUrl,
              longitude: firstLocation.longitude || null,
              latitude: firstLocation.latitude || null
          });

          setIsModalVisible(true);
      }
  } catch (error) {
      console.error("Error fetching template details:", error);
  }
};


  const handleAnalyzeCrop = async () => {
    if (!selectedCrop) {
        alert("Please select a crop first!");
        return;
    }

    setIsLoadingCropAnalysis(true);
    setCropAnalysis(null); // Clear previous results

    try {
        const response = await axios.post(
            "http://127.0.0.1:5002/analyze-text",
            { crops: selectedCrop },
            { headers: { "Content-Type": "application/json" } }
        );

        setTimeout(() => {
            setCropAnalysis(response.data.response);
            setIsLoadingCropAnalysis(false);
        }, 5000); // Simulate loading for 5 seconds
    } catch (error) {
        console.error("Error analyzing crop:", error);
        setIsLoadingCropAnalysis(false);
        alert("Failed to analyze crop. Please try again.");
    }
};


  const handleAnalyzeLand = async () => {
    if (!clearLandDays) {
      alert("Please enter the number of days to proceed.");
      return;
    }
  
    setIsLoading(true);
    setCurrentStep(2); // Move to loading screen
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/analyze_land",
        {
          numberOfDays: clearLandDays,
          imageUrl: template.imageUrl,
          area: template.area,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Simulate a 12-second delay before updating UI
      setTimeout(() => {
        setApiResponse(response.data);
        setIsLoading(false);
        setCurrentStep(3);
      }, 12000);
    } catch (error) {
      console.error("Full Axios Error:", error);
      console.error("Error Response:", error.response?.data || "No response received");
      setIsLoading(false);
      alert("Failed to analyze the land. Please try again.");
      setCurrentStep(1);
    }
  };
  
  

  const checkIdClearLand = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/clearLand/check-id/${id}`);
      if (response.data.exists) {
        console.log("ID exists");
        setCurrentPage("EffortOutput");
        setAnimatePage(true);
      } else {
        console.log("ID does not exist");
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log("ID not found");
        setCurrentPage("ClearLand");
        setAnimatePage(true);
      } else {
        console.error("Error checking ID:", error);
      }
    }
  };
  

  const checkIdPlantation = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/plantation/check-id/${id}`
      );
      if (response.data.exists) {
        console.log("ID exists");
        setCurrentPage("PlantationDetails"); // Updated to PlantationDetails for existing ID
        setAnimatePage(true);
      } else {
        console.log("ID does not exist");
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log("ID not found");
        setCurrentPage("Plantation"); // Updated to Plantation for 404 error
        setAnimatePage(true);
      } else {
        console.error("Error checking ID:", error);
      }
    }
  };

  const checkIdFence = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/fence/check-id/${id}`);
      if (response.data.exists) {
        console.log("ID exists");
        setCurrentPage("FenceDetails"); // Updated to FenceDetails for existing ID
        setAnimatePage(true);
      } else {
        console.log("ID does not exist");
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log("ID not found");
        setCurrentPage("Fence"); // Updated to Fence for 404 error
        setAnimatePage(true);
      } else {
        console.error("Error checking ID:", error);
      }
    }
  };

  const handleResizeMapClick = () => {
    navigate("/resizemap", {
      state: {
        templateId: template._id,
        templateArea: template.area,
        templatePerimeter: template.perimeter,
      },
    });
  };


  

  return (
    <div>
      {!currentPage && (
        <div className="main-div">
          <div className="outer-div">
            <div className="div-01">
              <MdArrowBack onClick={onBackToSidebar} className="backBtn" />
              <p className="templateName-text">{template.templateName}</p>
              <div className="edit-icon-container">
                <BiEdit className="edit-icon" onClick={handleEdit} />
              </div>
            </div>
            <div className="div-02">
              <div className="map-img-container">
                <img
                  src={template.imageUrl}
                  alt="mapImage"
                  className="map-img"
                />
              </div>
              <div className="button-container">
                <Button
                  type="primary"
                  className="action-btn"
                  onClick={navigateToRegister}
                >
                  Manage Map
                </Button>
                <Button
                  type="primary"
                  className="action-btn"
                  onClick={handleResizeMapClick}
                >
                  Resize Map
                </Button>
              </div>
              <div className="button-container">
                <Button
                  type="primary"
                  className="action-btn"
                  onClick={() => window.open(`https://plot-pro-zcjm.vercel.app/${template._id}`, "_blank")}
                >
                  NDVI Analysis
                </Button>
              </div>

              <br />
              <h6 >Manual</h6>
              <br />
            </div>
            <div className="div-03">
              <div className="icon-container">
                <div
                  className="circle-div circle-div-1"
                  onClick={() => checkIdClearLand(template._id)}
                >
                  <GiAxeInStump className="icon" />
                </div>
                <p>Clear Land</p>
              </div>
              <div className="icon-container">
                <button
                  className="circle-div circle-div-2"
                  onClick={() => checkIdPlantation(template._id)}
                >
                  <PiPlantFill className="icon" />
                </button>
                <p>Plantation</p>
              </div>
              <div className="icon-container">
                <button
                  className="circle-div circle-div-3"
                  onClick={() => checkIdFence(template._id)}
                >
                  <GiWoodenFence className="icon" />
                </button>
                <p>Fence setup</p>
              </div>
            </div>
            <hr className="breaker" />
            {/* Automated Actions */}
            <h6 >Automated</h6>
            <br />
            <div className="div-03">
              <div className="icon-container">
                <div
                  className="circle-div circle-div-1"
                  onClick={() => openAutomatedModel(template._id)}
                >
                  <GiAxeInStump className="icon" />
                </div>
                <p>Clear Land</p>
              </div>

              <div className="icon-container">
                <button
                  className="circle-div circle-div-2"
                  onClick={() => openAutomatedModel2(template._id)}
                >
                  <PiPlantFill className="icon" />
                </button>
                <p>Plantation</p>
              </div>

              <div className="icon-container">
                <button
                  className="circle-div circle-div-3"
                  onClick={() => openAutomatedModel3(template._id)}
                >
                  <GiPlantRoots className="icon" />
                </button>
                <p>Crop Suggest</p>
              </div>

            </div>
            <hr className="breaker" />
            <div className="div-04">
              <p className="bold-text">Land Info</p>
              <div className="info-grid">
                <div className="info-container">
                  <TbContainer className="info-icon" />
                  <div>
                    <p>Type</p>
                    <p className="bold-text">{template.landType}</p>
                  </div>
                </div>
                <div className="info-container">
                  <HiChartPie className="info-icon" />
                  <div>
                    <p>Area</p>
                    <p className="bold-text">{parseFloat(template.area).toFixed(2)} perch</p>
                  </div>
                </div>
                <div className="info-container">
                  <TbVector className="info-icon" />
                  <div>
                    <p>Perimeter</p>
                    <p className="bold-text">{parseFloat(template.perimeter).toFixed(2)} km</p>
                  </div>
                </div>
                <div className="info-container">
                  <ImLocation2 className="info-icon" />
                  <div>
                    <p>Location</p>
                    <p className="bold-text">{template.location}</p>
                  </div>
                </div>
              </div>
              <hr className="breaker" />
              <div className="description-div">
                <p className="bold-text">Description</p>
                <p className="description-text">{template.description}</p>
              </div>
            </div>
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
        {currentPage === "Fence" && (
          <Fence
            onBackToSidebar={onBackToSidebar}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "Plantation" && (
          <Plantation
            onBackToSidebar={onBackToSidebar}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "FenceDetails" && (
          <FenceDetails
            onBackToSidebar={onBackToSidebar}
            onback={handleBackClick}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "PlantationDetails" && (
          <PlantationDetails
            onBackToSidebar={onBackToSidebar}
            onback={handleBackClick}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "ClearLand" && (
          <ClearLand
            onBackToSidebar={onBackToSidebar}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "EffortOutput" && (
          <EffortOutput
            onBackToSidebar={onBackToSidebar}
            onback={handleBackClick}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick={handleEditTemplateClick}
            template={template}
          />
        )}
      </div>


      
      <Modal
        title="Template Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {/* Step 1: Enter Number of Days */}
        {currentStep === 1 && (
          <Flex vertical align="center" gap={10}>
            <h3><strong>How soon should this land be cleared?</strong></h3>
            <InputNumber
              min={1}
              max={365}
              value={clearLandDays}
              onChange={(value) => setClearLandDays(value)}
              placeholder="Enter number of days"
              style={{ width: "100%" }}
            />
            <Flex gap={10}>
              <Button onClick={() => setIsModalVisible(false)}>Close</Button>
              <Button type="primary" onClick={handleAnalyzeLand}>Continue</Button>
            </Flex>
          </Flex>
        )}

        {/* Step 2: Loading Screen */}
        {currentStep === 2 && (
          <Flex vertical align="center" justify="center" gap={20} style={{ minHeight: 150 }}>
            <Spin size="large" />
            <h4>Analyzing the data...</h4>
          </Flex>
        )}

        {/* Step 3: Show API Response */}
        {currentStep === 3 && apiResponse && (
          <Flex vertical gap={10}>
            <h3>Land Analysis Results</h3>

            <p><strong>Tree Land Percentage:</strong> {apiResponse.Tree_Land_Percentage}%</p>
            <p><strong>Tree Land Area:</strong> {apiResponse.Tree_Land_Area} acres</p>

            <h4>Work Plan</h4>
            <p><strong>Daily Working Hours:</strong> {apiResponse.Work_Plan.Daily_Working_Hours} hrs</p>
            <p><strong>Days Given:</strong> {apiResponse.Work_Plan.Days_Given}</p>
            <p><strong>Feasibility Status:</strong> {apiResponse.Work_Plan.Feasibility_Status}</p>
            <p><strong>Total Human Workers Needed:</strong> {apiResponse.Work_Plan.Total_Human_Workers_Needed}</p>

            {/* Work Plan Table */}
            <Table
              columns={[
                { title: "Equipment", dataIndex: "Equipment", key: "Equipment" },
                { title: "Usage Hours", dataIndex: "Usage_Hours", key: "Usage_Hours" },
                { title: "Workers Required", dataIndex: "Workers_Required", key: "Workers_Required" }
              ]}
              dataSource={apiResponse.Work_Plan.Work_Plan}
              pagination={false}
              bordered
            />

            <Flex gap={10} justify="end">
              <Button onClick={() => setIsModalVisible(false)}>Close</Button>
            </Flex>
          </Flex>
        )}
      </Modal>

      <Modal
    title="Crop Analysis"
    open={isModalVisible2}
    onCancel={() => setIsModalVisible2(false)}
    footer={null}
    width={700}
>
    {/* Crop Selection */}
    <Flex vertical align="center" gap={15}>
        <h3>Select a Crop for Analysis</h3>
        <select
            value={selectedCrop || ""}
            onChange={(e) => setSelectedCrop(e.target.value)}
            style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                fontSize: "16px",
            }}
        >
            <option value="" disabled>Select a crop...</option>
            <option value="Carrot">Carrot</option>
            <option value="Cabbage">Cabbage</option>
            <option value="Tomato">Tomato</option>
            <option value="Okra">Okra</option>
            <option value="Brinjal">Brinjal</option>
            <option value="Chili">Chili</option>
            <option value="Rice">Rice</option>
            <option value="Pumpkin">Pumpkin</option>
            <option value="Potatoes">Potatoes</option>
        </select>

        <Flex gap={10}>
            <Button onClick={() => setIsModalVisible2(false)}>Close</Button>
            <Button type="primary" onClick={handleAnalyzeCrop}>Analyze</Button>
        </Flex>
    </Flex>

    {/* Loading Spinner */}
    {isLoadingCropAnalysis && (
        <Flex vertical align="center" justify="center" gap={20} style={{ minHeight: 150 }}>
            <Spin size="large" />
            <h4>Analyzing Plant Data...</h4>
        </Flex>
    )}

    {/* Display Crop Analysis Results */}
    {cropAnalysis && (
        <Flex vertical gap={15} style={{ marginTop: "20px" }}>
            <h3>Crop Analysis Results</h3>

            <h4>🌱 Best Fertilizers</h4>
            <p><strong>1st Best:</strong> {cropAnalysis["Best fertilizers"]["1st best one"]}</p>
            <p><strong>2nd Best:</strong> {cropAnalysis["Best fertilizers"]["2nd best one"]}</p>

            <h4>🌿 Crop Companion</h4>
            <ul>
                <li>{cropAnalysis["crop companion"]["Companion Crop 1"]}</li>
                <li>{cropAnalysis["crop companion"]["Companion Crop 2"]}</li>
                <li>{cropAnalysis["crop companion"]["Companion Crop 3"]}</li>
            </ul>

            <h4>🔄 Crop Rotation</h4>
            <ul>
                <li>{cropAnalysis["crop rotation"]["Rotation Crop 1"]}</li>
                <li>{cropAnalysis["crop rotation"]["Rotation Crop 2"]}</li>
                <li>{cropAnalysis["crop rotation"]["Rotation Crop 3"]}</li>
            </ul>

            <h4>🌞 Optimal Conditions</h4>
            <p>{cropAnalysis.optimal_conditions}</p>

            <h4>💧 Watering Instructions</h4>
            <p>{cropAnalysis["watering instructions"]}</p>

            <Flex justify="end">
                <Button onClick={() => setIsModalVisible2(false)}>Close</Button>
            </Flex>
        </Flex>
    )}
</Modal>


<Modal
    title="Crop Suggestion"
    open={isModalVisible3}
    onCancel={() => setIsModalVisible3(false)}
    footer={null}
    width={700}
>
    {/* Upload Image */}
    <Flex vertical align="center" gap={15}>
        <h3>Upload Soil Image</h3>
        
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files.length > 0) {
                    setUploadedImage(e.target.files[0]);
                    uploadToImgbb(e.target.files[0]);
                }
            }}
        />

        {/* Show Uploaded Image Preview */}
        {uploadedImageUrl && (
            <img
                src={uploadedImageUrl}
                alt="Uploaded Soil"
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px" }}
            />
        )}

        {/* Uploading Spinner */}
        {isUploading && <Spin size="large" />}

        {/* Analyze Button */}
        <Flex gap={10}>
            <Button onClick={() => setIsModalVisible3(false)}>Close</Button>
            <Button type="primary" onClick={handleAnalyzeSoil} disabled={!uploadedImageUrl}>
                Analyze
            </Button>
        </Flex>
    </Flex>

    {/* Loading Spinner for Analysis */}
    {isLoadingSoilAnalysis && (
        <Flex vertical align="center" justify="center" gap={20} style={{ minHeight: 150 }}>
            <Spin size="large" />
            <h4>Analyzing Soil and Weather Data...</h4>
        </Flex>
    )}

    {/* Display Soil Analysis Results */}
    {soilAnalysis && (
        <Flex vertical gap={15} style={{ marginTop: "20px" }}>
            <h3>Soil & Weather Analysis</h3>

            <p><strong>🌧️ Average Rainfall:</strong> {soilAnalysis.average_rainfall}</p>
            <p><strong>💦 Average Humidity:</strong> {soilAnalysis.average_humidity}</p>
            <p><strong>🌱 Soil Type:</strong> {soilAnalysis.soil_type}</p>
            <p><strong>🌤️ Season:</strong> {soilAnalysis.season}</p>

            <h4>🌾 Suggested Crops</h4>
            <ul>
                {soilAnalysis.suggested_crops.map((crop, index) => (
                    <li key={index}>{crop}</li>
                ))}
            </ul>

            <Flex justify="end">
                <Button onClick={() => setIsModalVisible3(false)}>Close</Button>
            </Flex>
        </Flex>
    )}
</Modal>



    </div>
  );
};

export default TemplateDetails;