import React, { useRef, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message} from "antd";
import { GoogleMap,StandaloneSearchBox, Marker, Polygon, OverlayView, LoadScript } from "@react-google-maps/api";
import { MdLocationOn, MdSearch, MdMyLocation } from "react-icons/md";
import AxiosInstance from "../../AxiosInstance";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";
import MapDetailsPanel from "./MapDetailsPanel";
import MobileOnlyModal from "./MobileOnlyModal";
import { styles, containerStyle, center } from "./HomeStyles";
import { BeatLoader } from "react-spinners";

const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

export default function Home() {
  // State
  const [user, setUser] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMaps, setUserMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [selectedMapDetails, setSelectedMapDetails] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [isMobileOnlyModalVisible, setIsMobileOnlyModalVisible] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserMapsLoading, setIsUserMapsLoading] = useState(true);
  const [isMapDetailsLoading, setIsMapDetailsLoading] = useState(false);
 
  // Constants
  const sriLankaCenter = { lat: 7.8731, lng: 80.7718 };
  const defaultZoom = 7;

  // Refs
  const messageShownRef = useRef(false);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    const adminToken = localStorage.getItem("AdminToken");
    setIsAdmin(!!adminToken);
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchUserMaps();
  }, []);

  useEffect(() => {
    if (location.state?.loginSuccess && !messageShownRef.current) {
      message.success("User logged in successfully!");
      messageShownRef.current = true;
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (mapRef.current && mapRef.current.state.map) {
      if (userMaps.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        if (selectedMapId) {
          const selectedMap = userMaps.find((map) => map._id === selectedMapId);
          if (selectedMap) {
            selectedMap.locationPoints.forEach((point) => {
              bounds.extend(new window.google.maps.LatLng(point.latitude, point.longitude));
            });
          }
        } else {
          userMaps.forEach((map) => {
            map.locationPoints.forEach((point) => {
              bounds.extend(new window.google.maps.LatLng(point.latitude, point.longitude));
            });
          });
        }
        mapRef.current.state.map.fitBounds(bounds);
        const padding = { top: 50, right: 50, bottom: 50, left: 50 };
        mapRef.current.state.map.fitBounds(bounds, padding);
        mapRef.current.state.map.setZoom(mapRef.current.state.map.getZoom());
      } else {
        mapRef.current.state.map.setCenter(sriLankaCenter);
        mapRef.current.state.map.setZoom(defaultZoom);
      }
    }
  }, [userMaps, selectedMapId]);

  // API Calls
  const fetchUserDetails = async () => {
    setIsUserLoading(true);
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setIsUserLoading(false);
    }
  };

  const fetchUserMaps = async () => {
    setIsUserMapsLoading(true);
    try {
      const response = await AxiosInstance.get("/api/auth/mapTemplate/getAllTemplates");
      console.log("User maps:", response.data);
      setUserMaps(response.data);
    } catch (error) {
      console.error("Failed to fetch user maps:", error);
    } finally {
      setIsUserMapsLoading(false);
    }
  };

  // Event Handlers
  const handleAdminClick = () => navigate("/admin");
  const showMobileOnlyModal = () => setIsMobileOnlyModalVisible(true);
  const handleMobileOnlyModalClose = () => setIsMobileOnlyModalVisible(false);
  const handleZoomChanged = () => {
    if (mapRef.current && mapRef.current.state.map) {
      setZoomLevel(mapRef.current.state.map.getZoom());
    }
  };


  const handleLabelClick = useCallback(
    async (mapId) => {
      if (mapId === selectedMapId) {
        setSelectedMapId(null);
        setSelectedMapDetails(null);
      } else {
        setSelectedMapId(mapId);
        setIsMapDetailsLoading(true);
        try {
          const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllmapData/${mapId}`);
          setSelectedMapDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch map details:", error);
        } finally {
          setIsMapDetailsLoading(false);
        }
      }
    },
    [selectedMapId]
  );
  const handlePlacesChanged = useCallback(() => {
    if (!searchBoxRef.current) return;
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;
    const selectedPlace = places[0];
    const location = selectedPlace.geometry.location.toJSON();
    setSelectedLocation(location);
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    if (mapRef.current && mapRef.current.state.map) {
      mapRef.current.state.map.fitBounds(bounds);
      mapRef.current.state.map.setZoom(15);
    }
  }, []);
  const handleMarkerClick = () => setSelectedLocation(null);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };
  const handleAvatarClick = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchUserDetails();
  };

  // Helper Functions
  const getCenterOfPolygon = (points) => {
    const latitudes = points.map((p) => p.latitude);
    const longitudes = points.map((p) => p.longitude);
    const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
    const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
    return { lat: centerLat, lng: centerLng };
  };

  const onSearchBoxLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const mapOptions = useCallback(() => {
    if (!window.google || typeof window.google === "undefined") return {};
    return {
      minZoom: 2,
      maxZoom: 40,
      mapTypeId: "satellite",
      restriction: {
        latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
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

  // Render Functions
  const renderMapContent = () => (
    <>
      {isMapLoading && (
        <div style={styles.loadingOverlay}>
          <p>Loading map...</p>
        </div>
      )}
      
      {userMaps.map((map, index) => (
        <React.Fragment key={map._id}>
          <Polygon
            paths={map.locationPoints.map((point) => ({
              lat: point.latitude,
              lng: point.longitude,
            }))}
            options={{
              fillColor: "white",
              fillOpacity: 0.1,
              strokeColor: "black",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
          <OverlayView
            position={getCenterOfPolygon(map.locationPoints)}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() => handleLabelClick(map._id)}
              style={{
                background: "black",
                color: "white",
                border: "1px solid #ccc",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              {index + 1}
            </div>
          </OverlayView>
        </React.Fragment>
      ))}
      {zoomLevel > 7 && selectedMapDetails && (
        <MapDetailsPanel
          mapDetails={selectedMapDetails}
          onClose={() => {
            setSelectedMapId(null);
            setSelectedMapDetails(null);
          }}
          isLoading={isMapDetailsLoading}
        />
      )}
      {selectedLocation && (
        <Marker position={selectedLocation} onClick={handleMarkerClick} />
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
      {isAdmin && (
        <button
          onClick={handleAdminClick}
          style={{
            ...styles.adminButton,
            ...styles.gradientButton,
          }}
        >
          Admin
        </button>
      )}
    </>
  );

// Main Render
return (
  <div style={styles.container}>
    <div style={styles.sidebar}>
      <SideNavbar onShowMobileOnlyModal={showMobileOnlyModal} />
    </div>
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        center={userMaps.length > 0 ? center : sriLankaCenter}
        zoom={userMaps.length > 0 ? 2 : defaultZoom}
        options={mapOptions()}
        onZoomChanged={handleZoomChanged}
        onLoad={() => setIsMapLoading(false)}
      >
        {!isUserLoading && !isUserMapsLoading && renderMapContent()}
      </GoogleMap>
    </LoadScript>

    {(isUserLoading || isUserMapsLoading) && (
      <div style={styles.loadingOverlay}>
        <BeatLoader color="#36D7B7" loading={true} size={15} />
        <p style={{ marginTop: '10px' }}>Loading user data...</p>
      </div>
    )}
    {isModalOpen && (
      <ProfileModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        user={user}
        updateUserInHome={setUser}
      />
    )}
    <MobileOnlyModal
      isVisible={isMobileOnlyModalVisible}
      onClose={handleMobileOnlyModalClose}
    />
  </div>
);
}