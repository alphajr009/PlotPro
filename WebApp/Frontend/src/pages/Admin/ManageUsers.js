import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { BeatLoader } from "react-spinners";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Tag, Space, Table, Button, Modal, Input, Alert } from "antd";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import AxiosInstance from "../../AxiosInstance";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";
import { Input as AntInput } from "antd";

const { confirm } = Modal;

function ManageUsers() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addUser, setAddUser] = useState({});
  const [user, setUser] = useState({});
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    position: ["bottomCenter"],
  });
  const [locationAnalytics, setLocationAnalytics] = useState([]);
  const [isNewUserVerified, setIsNewUserVerified] = useState(false);
  const { Search } = AntInput;
  const [searchTerm, setSearchTerm] = useState("");
const [filteredUserList, setFilteredUserList] = useState([]);


useEffect(() => {
  const filtered = userList.filter(
    (user) =>
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredUserList(filtered);
}, [searchTerm, userList]);

const handleSearch = (value) => {
  setSearchTerm(value);
};

  const fetchLocationAnalytics = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/mapTemplate/getLocationAnalytics"
      );
      setLocationAnalytics(response.data);
      console.log("Location Analytics:", response.data);
    } catch (error) {
      console.error("Failed to fetch location analytics:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLocationAnalytics();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get("/api/users/getAllUsers");
      setUserList(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleVerifyToggle = () => {
    setEditUser((prevUser) => ({
      ...prevUser,
      isVerified: !prevUser.isVerified,
    }));
  };

  const handleEditOk = async () => {
    try {
      const response = await AxiosInstance.post(
        `/api/users/editUser/${editUser._id}`,
        {
          userId: editUser._id,
          fname: editUser.fname,
          lname: editUser.lname,
          email: editUser.email,
          isVerified: editUser.isVerified,
        }
      );
      console.log(response);
      fetchUsers();
      message.success("User updated successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to edit user:", error);
      message.error("Failed to edit user");
    }
  };

  const newUserVerified = () => {
    setAddUser((newUser) => ({
      ...newUser,
      isVerified: true,
    }));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const showModal = (record) => {
    setEditUser(record);
    console.log(record);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
    setAddUser({
      fname: "",
      lname: "",
      email: "",
    });
    setIsNewUserVerified(false);
  };

  const toggleNewUserVerification = () => {
    setIsNewUserVerified(!isNewUserVerified);
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleAddOk = async () => {
    console.log("Adding user:", addUser);
    const generatedPassword = generatePassword(8);
    try {
      const response = await AxiosInstance.post("/api/users/addUser", {
        fname: addUser.fname,
        lname: addUser.lname,
        email: addUser.email,
        password: generatedPassword,
        isVerified: isNewUserVerified,
      });
      console.log(response.data);
      fetchUsers();
      setIsAddModalOpen(false);

      message.success(
        `User added successfully. Login details sent to ${addUser.email}`,
        5
      );
    } catch (error) {
      console.error("Failed to add user:", error.response?.data);
      if (error.response?.data?.message === "User already exists") {
        message.error("User with this email already exists", 5);
      } else {
        message.error(
          "Failed to add user: " +
            (error.response?.data?.message || "Unknown error"),
          5
        );
      }
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Refresh user data when modal closes
  };

  const handleDeleteConfirmation = (id) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBooking(id);
      },
      onCancel() {
        message.info("User deletion cancelled");
      },
    });
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/users/deleteUser/${id}`
      );
      console.log(response);
      fetchUsers();
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "profileImage",
      key: "imageUrl",
      render: (_, record) => <Avatar size={35} userData={record} />,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Updated",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (updatedAt) => {
        const date = new Date(updatedAt);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    {
      title: "Status",
      key: "isVerified",
      dataIndex: "isVerified",
      render: (isVerified) => {
        let color = "green";
        let status = "Verified";
        if (!isVerified) {
          color = "red";
          status = "Unverified";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "User Type",
      key: "isAdmin",
      dataIndex: "isAdmin",
      render: (isAdmin) => {
        let color = "red";
        let status = "Admin";
        if (!isAdmin) {
          status = "User";
          color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              fontSize: "20px",
              color: "#9D9D9D",
              border: "none",
              background: "transparent",
            }}
            onClick={() => showModal(record)}
          >
            <Icon icon="uil:setting" />
          </button>
          <button
            style={{
              fontSize: "20px",
              color: "#757171",
              border: "none",
              background: "transparent",
            }}
            onClick={() => handleDeleteConfirmation(record._id)}
          >
            <Icon icon="material-symbols:delete-outline" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <>
        {isModalOpen && (
          <ProfileModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            user={user}
            updateUserInHome={setUser}
          />
        )}
        <div className="admin-dashboard-body">
          <div className="tableHeaderContainer">
            <h1>Manage Users</h1>
            <button onClick={showAddModal}>Add New</button>
          </div>
          <Search
  placeholder="Search users by name or email"
  onChange={(e) => handleSearch(e.target.value)}
  style={{ width: 300, marginBottom: 16 }}
/>
          <Modal
            title="Add User"
            visible={isAddModalOpen}
            onOk={handleAddOk}
            onCancel={handleAddCancel}
            width={450}
          >
            <div className="user_edit_model">
              <Input
                name="fname"
                placeholder="First Name"
                value={addUser.fname}
                onChange={(e) =>
                  setAddUser((newUser) => ({
                    ...newUser,
                    fname: e.target.value,
                  }))
                }
              />
              <Input
                name="lname"
                placeholder="Last Name"
                value={addUser.lname}
                onChange={(e) =>
                  setAddUser((newUser) => ({
                    ...newUser,
                    lname: e.target.value,
                  }))
                }
              />
              <Input
                name="email"
                placeholder="Email"
                value={addUser.email}
                onChange={(e) =>
                  setAddUser((newUser) => ({
                    ...newUser,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <span>User Verification Status: </span>
              <Button
                type={isNewUserVerified ? "primary" : "default"}
                onClick={toggleNewUserVerification}
              >
                {isNewUserVerified ? "Verified" : "Unverified"}
              </Button>
            </div>
          </Modal>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <BeatLoader color="#36D7B7" loading={isLoading} size={15} />
            </div>
          ) : (
            <Table
              className="user_table"
              columns={columns}
              dataSource={filteredUserList}
pagination={filteredUserList.length > 10 ? pagination : false}
              onChange={handleTableChange}
            />
          )}
        </div>
        <Modal
          title="Edit User"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          width={450}
        >
          <div>
            <div className="user_edit_model">
              <Input
                name="fname"
                placeholder="First Name"
                value={editUser.fname}
                onChange={handleEditUserChange}
              />
              <Input
                name="lname"
                placeholder="Last Name"
                value={editUser.lname}
                onChange={handleEditUserChange}
              />
              <Input
                name="email"
                placeholder="Email"
                value={editUser.email}
                onChange={handleEditUserChange}
              />
            </div>
            {editUser.isVerified ? (
              <Alert message="This user is verified" type="success" showIcon />
            ) : (
              <Alert
                message="Do you want to verify this user?"
                type="error"
                action={
                  <Button size="small" danger onClick={handleVerifyToggle}>
                    Verify
                  </Button>
                }
              />
            )}
          </div>
        </Modal>
      </>
    </div>
  );
}

export default ManageUsers;
