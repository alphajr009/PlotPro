import React, { useState, useEffect } from "react";
import { Button, Divider } from "antd";
import { BeatLoader } from "react-spinners";
import ManageProfileModal from "../ProfileManageModal/ManageProfile";
import AxiosInstance from "../../../AxiosInstance";
import { useNavigate } from "react-router-dom";
import Avatar from "../ProfileManageModal/Avatar";


const ProfileModal = ({ isOpen, onRequestClose, user: initialUser}) => {
  const [showManageProfileModal, setShowManageProfileModal] = useState(false);
  const [user, setUserState] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchUser(); // Call the function to fetch user details only when modal is open
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUserState(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUserState(updatedUser);
    fetchUser();  // Refresh user data
  };

  const handleManageProfileClick = () => {
    setShowManageProfileModal(true);
  };

  const handleCloseManageProfileModal = () => {
    setShowManageProfileModal(false);
  };

  const handleCloseModal = () => {
    onRequestClose(user);  // Pass the updated user data back to Home
  };

  if (!isOpen) return null;

  const handleSignOut = async () => {

    if (localStorage.getItem('AdminToken')){
      localStorage.removeItem('AdminToken');
    }
    localStorage.removeItem('UserToken');
    navigate('/login');
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {!showManageProfileModal && (
          <>
            <button style={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <div style={styles.content}>
              {isLoading ? (
                <div style={styles.loader}>
                  <BeatLoader color="#007BFF" />
                </div>
              ) : (
                <>
                  <h7>{user.email}</h7>
                  <Divider style={styles.divider} />
                  <Avatar
                    userData={user}
                    size={130}
                    style={styles.avatar}
                  />
                  <h4 style={styles.hellotxt}>Hi, {user.fname}!</h4>
                  <Button
                    type="primary"
                    style={{
                      marginTop: "30px",
                      padding: "18px",
                      width: "70%",
                      borderRadius: 20,
                    }}
                    onClick={handleManageProfileClick}
                  >
                    Manage Your Profile
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    style={{
                      marginTop: "20px",
                      padding: "18px",
                      width: "70%",
                      borderRadius: 20,
                      marginBottom: "20px",
                    }}
                  >
                    Sign Out From Your Account
                  </Button>
                  <Divider />
                  <p style={styles.bottomtxt}>
                    Privacy Policy . Terms of Services
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div
        style={
          showManageProfileModal
            ? { ...styles.manageModal, ...styles.modalSlideIn }
            : { ...styles.manageModal, ...styles.modalSlideOut }
        }
      >
        {showManageProfileModal && (
          <ManageProfileModal
            isOpen={showManageProfileModal}
            onRequestClose={handleCloseManageProfileModal}
            onBack={handleCloseManageProfileModal}
            user={user}
            onUpdate={updateUser} // Add this line
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
  },
  loader: {
    marginTop: "65%",
  },
  modal: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: "25%", // Adjust the width as needed
    height: "70%",
    padding: "20px",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(0)",
  },
  modalSlideOut: {
    transform: "translateX(100vw)",
  },
  divider: {
    marginTop: "20px",
  },
  manageModal: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: "30%", // Increase the width for the ManageProfileModal
    height: "90%",
    padding: "20px",
    position: "absolute",
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(-100vw)",
  },
  modalSlideIn: {
    transform: "translateX(0)",
  },
  hellotxt: {
    marginTop: "20px",
    fontSize: "1.5rem",
  },
  bottomtxt: {
    position: "absolute",
    bottom: "20px",
    fontSize: "0.8rem",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {},
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default ProfileModal;
