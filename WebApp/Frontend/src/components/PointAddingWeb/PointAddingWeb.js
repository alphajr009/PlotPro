import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import { MdLocationOn, MdSearch } from "react-icons/md";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import { styles, containerStyle, center } from "./PointAddingWebStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Modal, Input, Button, Select } from "antd";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";
import AxiosInstance from "../../AxiosInstance";
import * as turf from "@turf/turf";
import html2canvas from "html2canvas";
import axios from "axios";

const { Option } = Select;

const SavePopup = ({ isOpen, onClose, onSave, calculatedData }) => {
  const [templateName, setTemplateName] = useState("");
  const [measureName, setMeasureName] = useState("");
  const [landType, setLandType] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState(calculatedData.area);
  const [perimeter, setPerimeter] = useState(calculatedData.perimeter);
  const [location, setLocation] = useState(calculatedData.location);
  const [screenshot, setScreenshot] = useState(calculatedData.screenshot);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setArea(calculatedData.area);
    setPerimeter(calculatedData.perimeter);
    if (calculatedData.location) {
      setLocation(calculatedData.location);
    }
    setScreenshot(calculatedData.screenshot);
  }, [calculatedData]);

  useEffect(() => {
    const isValid =
      templateName.trim() !== "" &&
      measureName.trim() !== "" &&
      landType !== "" &&
      description.trim() !== "" &&
      area.trim() !== "" &&
      perimeter.trim() !== "" &&
      location.trim() !== "";
    setIsFormValid(isValid);
  }, [
    templateName,
    measureName,
    landType,
    description,
    area,
    perimeter,
    location,
  ]);

  const handleSave = () => {
    onSave({
      templateName,
      measureName,
      landType,
      description,
      area,
      perimeter,
      location,
      screenshot,
    });
    onClose();
  };

  const inputStyle = {
    width: "100%",
    height: "32px",
  };

  const labelStyle = {
    display: "inline-block",
    width: "120px",
    textAlign: "left",
    marginRight: "10px",
  };

  const rowStyle = {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <Modal
      title="Save Details"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save
        </Button>,
      ]}
      width={800}
    >
      <div style={rowStyle}>
        <label style={labelStyle}>Perimeter (km):</label>
        <Input
          value={perimeter}
          onChange={(e) => setPerimeter(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Area (perches):</label>
        <Input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Template Name:</label>
        <Input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Measure Name:</label>
        <Input
          value={measureName}
          onChange={(e) => setMeasureName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Land Type:</label>
        <Select
          value={landType}
          onChange={(value) => setLandType(value)}
          style={{ ...inputStyle, width: "100%" }}
        >
          <Option value="agricultural">Agricultural</Option>
          <Option value="residential">Residential</Option>
          <Option value="commercial">Commercial</Option>
          <Option value="industrial">Industrial</Option>
        </Select>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Location:</label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Description:</label>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, height: "auto" }}
        />
      </div>
    </Modal>
  );
};

export default function PointAddingWeb() {
  const location = useLocation();
  const navigate = useNavigate();
  const messageShownRef = useRef(false);
  const [user, setUser] = useState({});
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);
  const [paths, setPaths] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [calculatedData, setCalculatedData] = useState({
    perimeter: "",
    area: "",
    location: "",
  });
  const [isImageCaptureComplete, setIsImageCaptureComplete] = useState(false);
  const [searchMarker, setSearchMarker] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    setPaths(markers);
    if (markers.length < 3) {
      setIsPolygonComplete(false);
    }
    if (markers.length > 0) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markers[0] }, (results, status) => {
        if (status === "OK" && results[0]) {
          setCalculatedData((prevData) => ({
            ...prevData,
            location: results[0].formatted_address,
          }));
        } else {
          setCalculatedData((prevData) => ({
            ...prevData,
            location:
              prevData.location ||
              `${markers[0].lat.toFixed(6)}, ${markers[0].lng.toFixed(6)}`,
          }));
        }
      });
    }
  }, [markers]);

  const fetchUserDetails = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    if (location.state?.loginSuccess && !messageShownRef.current) {
      message.success("User logged in successfully!");
      messageShownRef.current = true;
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location, navigate]);

  const handlePlacesChanged = useCallback(() => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const selectedPlace = places[0];
    if (
      !selectedPlace ||
      !selectedPlace.geometry ||
      !selectedPlace.geometry.location
    )
      return;

    const location = selectedPlace.geometry.location.toJSON();
    setSearchMarker(location);
    setSelectedLocation(location);

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    if (mapRef.current && mapRef.current.state && mapRef.current.state.map) {
      mapRef.current.state.map.fitBounds(bounds);
      mapRef.current.state.map.setZoom(15);
    }
  }, []);
  const handleMapClick = useCallback(
    (e) => {
      if (!isPolygonComplete) {
        const newMarker = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      }
    },
    [isPolygonComplete]
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = event.target;
      input.blur();
    }
  };

  const onSearchBoxLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUserDetails();
  };

  const mapOptions = useCallback(() => {
    if (!window.google || typeof window.google === "undefined") return {};

    return {
      minZoom: 2,
      maxZoom: 40,
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

  const handleCancel = () => {
    setMarkers([]);
    setIsPolygonComplete(false);
    setCalculatedData({
      perimeter: "",
      area: "",
      location: "",
    });
    navigate("/home");
  };

  const handleUndo = () => {
    setMarkers((prevMarkers) => {
      const newMarkers = prevMarkers.slice(0, -1);
      if (newMarkers.length < 3) {
        setIsPolygonComplete(false);
      }
      return newMarkers;
    });
    setIsPolygonComplete(false);
  };

  const handleSave = () => {
    if (!isImageCaptureComplete) {
      message.warning("Please wait until the image is captured.");
      return;
    }
    if (markers.length < 3) {
      message.error("Please add at least 3 points to create a polygon.");
      return;
    }
    const polygon = turf.polygon([
      [...markers.map((m) => [m.lng, m.lat]), [markers[0].lng, markers[0].lat]],
    ]);
    const areaInSquareMeters = turf.area(polygon);
    const perimeterInMeters =
      turf.length(
        turf.lineString([
          ...markers.map((m) => [m.lng, m.lat]),
          [markers[0].lng, markers[0].lat],
        ])
      ) * 1000;

    const areaInPerches = areaInSquareMeters / 25.29285264;
    const perimeterInKilometers = perimeterInMeters / 1000;

    // Get location name using reverse geocoding
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: markers[0] }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          const cityComponent = addressComponents.find((component) =>
            component.types.includes("locality")
          );
          const stateComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );
          const countryComponent = addressComponents.find((component) =>
            component.types.includes("country")
          );

          const city = cityComponent ? cityComponent.long_name : "";
          const state = stateComponent ? stateComponent.long_name : "";
          const country = countryComponent ? countryComponent.long_name : "";

          let formattedLocation = "";
          if (city && country) {
            formattedLocation = `${city}, ${country}`;
          } else if (state && country) {
            formattedLocation = `${state}, ${country}`;
          } else if (country) {
            formattedLocation = country;
          } else {
            formattedLocation = "Unknown location";
          }

          setCalculatedData((prevData) => ({
            ...prevData,
            area: `${areaInPerches.toFixed(2)} perches`,
            perimeter: `${perimeterInKilometers.toFixed(2)} km`,
            location: formattedLocation,
          }));
        } else {
          console.error("No results found");
          setCalculatedData((prevData) => ({
            ...prevData,
            area: `${areaInPerches.toFixed(2)} perches`,
            perimeter: `${perimeterInKilometers.toFixed(2)} km`,
            location:
              prevData.location ||
              `${markers[0].lat.toFixed(6)}, ${markers[0].lng.toFixed(6)}`,
          }));
        }
      } else {
        console.error("Geocoder failed due to: " + status);
        setCalculatedData((prevData) => ({
          ...prevData,
          area: `${areaInPerches.toFixed(2)} perches`,
          perimeter: `${perimeterInKilometers.toFixed(2)} km`,
          location:
            prevData.location ||
            `${markers[0].lat.toFixed(6)}, ${markers[0].lng.toFixed(6)}`,
        }));
      }
      setIsPopupOpen(true);
    });
  };
  const handlePopupSave = async (data) => {
    try {
      // Convert area and perimeter to numbers
      const area = parseFloat(data.area.split(" ")[0]);
      const perimeter = parseFloat(data.perimeter.split(" ")[0]);

      // Prepare the data to be sent to the backend
      const templateData = {
        perimeter,
        area,
        templateName: data.templateName,
        measureName: data.measureName,
        landType: data.landType,
        location: data.location,
        description: data.description,
        imageUrl: data.screenshot,
        locationPoints: markers.map((marker) => ({
          longitude: marker.lng,
          latitude: marker.lat,
        })),
      };

      // Make the API call
      const response = await AxiosInstance.post(
        "/api/auth/mapTemplate/saveTemplate",
        templateData
      );

      console.log("Template saved successfully:", response.data);
      message.success("Template saved successfully!");
      setIsPopupOpen(false);
      handleCancel();
      navigate("/home");
    } catch (error) {
      console.error("Error saving template:", error);
      message.error("Failed to save template. Please try again.");
    }
  };
  const handleComplete = () => {
    if (markers.length > 2) {
      setIsPolygonComplete(true);
      setIsImageCaptureComplete(false);

      if (mapRef.current && mapRef.current.state.map) {
        const map = mapRef.current.state.map;

        // Hide UI elements
        map.setOptions({
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        // Calculate area and perimeter
        const polygon = turf.polygon([
          [
            ...markers.map((m) => [m.lng, m.lat]),
            [markers[0].lng, markers[0].lat],
          ],
        ]);
        const areaMeters = turf.area(polygon);
        const perimeterMeters =
          turf.length(
            turf.lineString([
              ...markers.map((m) => [m.lng, m.lat]),
              [markers[0].lng, markers[0].lat],
            ])
          ) * 1000;

        const areaPerches = areaMeters / 25.29285264;
        const perimeterKilometers = perimeterMeters / 1000;

        // Update calculated data
        setCalculatedData((prevData) => ({
          ...prevData,
          area: `${areaPerches.toFixed(2)} perches`,
          perimeter: `${perimeterKilometers.toFixed(2)} km`,
        }));

        // Show capturing alert
        message.loading({
          content: "Capturing map image...",
          key: "imgCapture",
        });

        // Wait for the next render cycle to ensure the polygon is drawn
        setTimeout(() => {
          const uploadToImgbb = async (imageBlob) => {
            const apiKey = "074328837193dc603f419619c5517209";
            const formData = new FormData();
            formData.append("image", imageBlob);

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
              return response.data.data.url;
            } catch (error) {
              console.error("Error uploading image to imgbb:", error);
              throw error;
            }
          };

          // Capture the map-outer-container
          const mapContainer = document.querySelector(".map-outer-container");

          html2canvas(mapContainer, {
            useCORS: true,
            allowTaint: true,
            scale: 0.5,
            ignoreElements: (element) => {
              return (
                element.tagName === "LINK" &&
                element.href.includes("fonts.googleapis.com")
              );
            },
          })
            .then(async (canvas) => {
              canvas.toBlob(
                async (blob) => {
                  try {
                    // Compress the image before uploading
                    const compressedBlob = await compressImage(blob, 0.7);

                    // Upload to imgbb
                    const imageUrl = await uploadToImgbb(compressedBlob);
                    console.log("Uploaded image URL:", imageUrl);

                    setCalculatedData((prevData) => ({
                      ...prevData,
                      screenshot: imageUrl,
                    }));

                    // Show success message
                    message.success({
                      content: "Map image captured successfully!",
                      key: "imgCapture",
                      duration: 2,
                    });
                    setIsImageCaptureComplete(true);
                  } catch (error) {
                    console.error("Error processing map:", error);
                    message.error(
                      "An error occurred while processing the map. Please try again."
                    );
                    setIsImageCaptureComplete(true);
                  } finally {
                    // Restore UI elements
                    map.setOptions({
                      disableDefaultUI: false,
                      zoomControl: true,
                      streetViewControl: true,
                      fullscreenControl: false,
                    });
                  }
                },
                "image/jpeg",
                0.7
              );
            })
            .catch((error) => {
              console.error("Error capturing map:", error);
              message.error(
                "An error occurred while capturing the map. Please try again."
              );
            });
        }, 100);
      }
    } else {
      message.error("Please add at least 3 points to complete the polygon.");
    }
  };
  // Helper function to compress the image
  const compressImage = (file, quality) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            quality
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };
  const buttonStyles = {
    buttonsContainer: {
      position: "absolute",
      bottom: "20px",
      right: "90px",
      zIndex: 1,
      display: "flex",
      gap: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      padding: "10px",
      borderRadius: "10px",
      width: isPolygonComplete ? "270px" : "360px", // Adjust these values as needed
      transition: "width 0.3s ease", // Add smooth transition
    },
    button: {
      padding: "8px 16px",
      fontSize: "14px",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      width: "80px",
      textAlign: "center",
    },
    cancelButton: {
      backgroundColor: "#dc3545",
    },
  };

  return (
    <div style={styles.container} className="map-outer-container">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={mapOptions()}
          onClick={handleMapClick}
        >
          <div style={buttonStyles.buttonsContainer}>
            <button
              style={{ ...buttonStyles.button, ...buttonStyles.cancelButton }}
              onClick={handleCancel}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#bd2130")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              Cancel
            </button>
            {!isPolygonComplete && (
              <button
                style={buttonStyles.button}
                onClick={handleUndo}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Undo
              </button>
            )}
            <button
              style={buttonStyles.button}
              onClick={handleSave}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Save
            </button>
            <button
              style={buttonStyles.button}
              onClick={handleComplete}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Fill
            </button>
          </div>

          {paths.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}

          {paths.length > 1 && (
            <Polyline
              path={paths}
              options={{
                strokeColor: "#000000",
                strokeOpacity: 0.8,
                strokeWeight: 0.5,
              }}
            />
          )}

          {isPolygonComplete && paths.length > 2 && (
            <Polygon
              paths={[...paths, paths[0]]}
              options={{
                fillColor: "transparent",
                fillOpacity: 0.35,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}

          <MdLocationOn
            fontSize={27}
            style={{ marginLeft: "10px", marginTop: "10px" }}
            color="#fff"
          />

          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <div style={styles.searchContainer}>
              <MdSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search location"
                style={styles.searchBox}
                onKeyDown={handleKeyDown}
              />
              <div style={styles.avatar} onClick={handleAvatarClick}>
                <Avatar userData={user} size={30} />
              </div>
            </div>
          </StandaloneSearchBox>

          {isModalOpen && (
            <ProfileModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              user={user}
              updateUserInHome={setUser}
            />
          )}
          {searchMarker && (
            <Marker
              position={searchMarker}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#ff6a6a",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#000000",
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <SavePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handlePopupSave}
        calculatedData={{
          ...calculatedData,
          screenshot: calculatedData.screenshot,
        }}
      />
    </div>
  );
}
