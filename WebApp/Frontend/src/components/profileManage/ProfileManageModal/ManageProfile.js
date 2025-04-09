import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Divider, Form, Input, Button, Upload, message, Modal } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import Avatar from "./Avatar";
import AxiosInstance from "../../../AxiosInstance";
import { useNavigate } from 'react-router-dom';

const ManageProfileModal = ({
  isOpen,
  onRequestClose,
  onBack,
  user,
  onUpdate,
}) => {
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (info) => {
    console.log("Upload event:", info);
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImage({ file: file, preview: previewURL });
        console.log("Image selected:", file);
      } else {
        console.log("No file selected");
      }
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await AxiosInstance.post("/api/mail/otp", {
        email: user.email,
      });

      if (response.data.success) {
        message.success("OTP sent successfully");
        navigate(`/enter-otp/${user.email}`);
      } else {
        message.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("An error occurred while sending OTP. Please try again.");
    }
  };

  const handleRemoveImage = async () => {
    if (!user.imageUrl && !image) {
      message.info("No profile picture to remove");
      return;
    }
  
    try {
      const response = await AxiosInstance.post(
        "/api/users/removeProfilePicture"
      );
      if (response.data.success) {
        if (image && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
        setImage(null);
        message.success("Profile picture removed successfully");
        onUpdate({ ...user, imageUrl: null });
        Modal.destroyAll(); // Add this line to close the modal
      } else {
        message.error("Failed to remove profile picture");
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
      message.error("An error occurred while removing the profile picture");
    }
  };

  const handleUpdateAndClose = async () => {
    setIsLoading(true); // Step 2: Set loading to true
    await handleUpdate();
    onRequestClose();
    setIsLoading(false); // Reset loading to false here if you want the modal to close regardless of update success
  };
  const showImageOptions = () => {
    if (user.imageUrl || (image && image.preview)) {
      Modal.info({
        title: "Profile Picture",
        content: "What would you like to do?",
        icon: null,
        okText: null,
        footer: [
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button 
            key="close" 
            onClick={() => Modal.destroyAll()}
            style={buttonStyle}
          >
            Close
          </Button>
            <Button 
              key="remove" 
              onClick={handleRemoveImage}
              style={buttonStyle}
            >
              Remove
            </Button>
            <Button
              key="choose"
              type="primary"
              onClick={() => {
                document.getElementById("profile-picture-upload").click();
                Modal.destroyAll();
              }}
              style={buttonStyle}
            >
              Choose from Device
            </Button>
          </div>
        ],
      });
    } else {
      document.getElementById("profile-picture-upload").click();
    }

  };
  const buttonStyle = {
    flex: 1,
    margin: '7px',
    height: '32px',
    fontSize: '14px',
  };

  useEffect(() => {
    console.log("Image state updated:", image);
  }, [image]);

  const handleUpdate = async () => {
    setIsLoading(true); // Ensure loading is true at the start
    const formData = new FormData();
    formData.append("user", JSON.stringify({ fname, lname, email }));

    console.log("Image state:", image);

    if (image && image.file) {
      formData.append("photo", image.file, image.file.name);
      console.log("Image file appended:", image.file);
    } else {
      console.log("No image file to append");
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log("Sending request to update profile");
      const response = await AxiosInstance.post(
        "/api/users/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.data.success) {
        message.success("Profile updated successfully");
        onUpdate({
          ...response.data.user,
          imageUrl:
            response.data.user.imageUrl || (image ? image.preview : null),
        });
        onRequestClose();
      } else {
        message.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("An error occurred while updating the profile");
    } finally {
      setIsLoading(false); // Step 3: Reset loading to false upon completion
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalContent}>
      <button style={styles.closeButton} onClick={onRequestClose}>
        ×
      </button>
      <div style={styles.headerContainer}>
        <ArrowLeftOutlined style={styles.backicon} onClick={onBack} />
        <p style={styles.headertxt}>Manage Your Profile</p>
      </div>
      <Divider style={styles.divider} />
      <div style={styles.content}>
        <div style={styles.avatarContainer}>
          <Upload
            id="profile-picture-upload"
            accept="image/*"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            onChange={handleImageChange}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                showImageOptions();
              }}
            >
              <Avatar
                userData={user}
                image={image ? image.preview : user.imageUrl}
                size={150}
              />
              <EditOutlined style={styles.editIcon} />
            </div>
          </Upload>
        </div>
        <div style={styles.userInfo}>
          <h5>
            {user.fname} {user.lname}
          </h5>
          <p style={styles.emailtxt}>{user.email}</p>
        </div>
        <Box component="form" style={styles.form}>
          <Form layout="vertical" style={{ width: "100%" }}>
            <Form.Item label="First Name" style={styles.formfeild}>
              <Input
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item label="Last Name" style={styles.formfeild}>
              <Input
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item label="Email" style={styles.formfeild}>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={styles.input}
              />
            </Form.Item>
          </Form>
        </Box>

        <Button 
        style={{ marginTop: "10px" }}
        onClick={handleChangePassword}
        >
        Change Password
        </Button>
        <Button
          type="primary"
          onClick={handleUpdateAndClose}
          loading={isLoading} // Control loading indicator with isLoading state
          style={{ marginTop: "20px", width: "70%" }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const styles = {
  modalContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  emailtxt: {
    color: "#777",
    fontSize: "12px",
    marginTop: "-10px",
  },
  backicon: {
    position: "absolute",
    left: "10px",
    fontSize: "15px",
    top: "25px",
    cursor: "pointer",
  },
  headertxt: {
    fontSize: "15px",
    marginTop: "3px",
  },
  editIcon: {
    position: "absolute",
    top: "33%",
    right: "34%",
    fontSize: "1.2rem",
    color: "gray",
  },
  headtxt: {
    fontSize: "1rem",
    marginBottom: "-20px",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    fontSize: "14px",
    marginTop: "20px",
  },
  formfeild: {
    alignItems: "left",
    marginBottom: "8px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2px",
  },
  userInfo: {
    marginBottom: "-80px",
    textAlign: "center",
  },
  form: {
    width: "180%",
    marginTop: "110px",
  },
  input: {
    height: "35px",
    padding: "10px",
    width: "100%",
  },
};

export default ManageProfileModal;
