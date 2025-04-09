import React, { useEffect } from "react";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";
import AxiosInstance from "../../AxiosInstance";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUserDetails(); // Refresh user data when modal closes
  };

  const fetchUserDetails = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div style={{ marginLeft: 15, marginBottom: 10 }}>
      <div className="admin-dashboard-header">
        <div style={{ left: 350, marginTop: 12, color:"#dbdbdb" }}>
          <h4>PlotPro</h4>
        </div>
        <div className="avatar-container" onClick={handleAvatarClick}>
          <Avatar userData={user} size={50} />
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          user={user}
          updateUserInHome={setUser}
        />
      )}
    </div>
  );
};

export default NavBar;
