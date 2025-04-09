import React, { useState, useEffect } from "react";
import { styles } from "./InputControlStyles";
import { Button, Form, Input, Select, List, message } from "antd";
import AxiosInstance from "../../AxiosInstance";
import { DeleteOutlined } from '@ant-design/icons';

const InputControl = () => {
  const [form] = Form.useForm();
  const [plants, setPlants] = useState([]);
  const [machines, setMachines] = useState([]);
  const [fenceTypes, setFenceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [plantSearch, setPlantSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");
  const [fenceTypeSearch, setFenceTypeSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const filterItems = (items, searchTerm) => {
    return items.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [plantsResponse, machinesResponse, fenceTypesResponse] =
        await Promise.all([
          AxiosInstance.get("/api/auth/inputControl/getItems/Plants"),
          AxiosInstance.get("/api/auth/inputControl/getItems/Machines"),
          AxiosInstance.get("/api/auth/inputControl/getItems/FenceTypes"),
        ]);
      setPlants(plantsResponse.data);
      setMachines(machinesResponse.data);
      setFenceTypes(fenceTypesResponse.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      message.error("Failed to fetch items");
    }
    setLoading(false);
  };

  const onFinish = async (values) => {
    try {
      await AxiosInstance.post("/api/auth/inputControl/addItem", values);
      message.success(`${values.Type} added successfully`);
      form.resetFields();
      fetchItems();
    } catch (error) {
      console.error("Failed to add item:", error);
      message.error("Failed to add item");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await AxiosInstance.delete(`/api/auth/inputControl/deleteItem/${id}`);
      message.success(`${type} deleted successfully`);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
      message.error("Failed to delete item");
    }
  };

  const renderList = (items, type, searchTerm, setSearchTerm) => (
    <div>
      <Input.Search
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 8, marginTop: 1}}
      />
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={filterItems(items, searchTerm)}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
              onClick={() => handleDelete(item._id, type)}
              style={{ fontSize: 16, color: '#ff4d4f' }}
            />
            ]}
          >
            <List.Item.Meta title={item.Name} style={styles.plantNameMeta} />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <h5 style={styles.headertxt}>Manage Input Types</h5>
      </div>

      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <div style={styles.leftHeader}>
            <h6>Add New Data</h6>
          </div>
          <div>
            <p style={styles.formheader}>Add new input types here</p>
          </div>
          <div style={styles.form}>
            <Form form={form} onFinish={onFinish}>
              <Form.Item name="Type" label="Type">
                <Select placeholder="Select Type">
                  <Select.Option value="Plants">Plants</Select.Option>
                  <Select.Option value="Machines">Machines</Select.Option>
                  <Select.Option value="FenceTypes">Fence Types</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="Name" label="Name">
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item>
                <Button
                  style={styles.submitBtn}
                  type="primary"
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.rightInnerLeft}>
            <div style={styles.InnerHeader}>
              <h6>Plants</h6>
            </div>
            <div style={styles.listWrapper}>
              {renderList(plants, "Plants", plantSearch, setPlantSearch)}
            </div>
          </div>
          <div style={styles.rightInnerRight}>
            <div style={styles.InnerHeader}>
              <h6>Machines</h6>
            </div>
            <div style={styles.listWrapper}>
              {renderList(
                machines,
                "Machines",
                machineSearch,
                setMachineSearch
              )}
            </div>
          </div>
          <div style={styles.rightInnerRight}>
            <div style={styles.InnerHeader}>
              <h6>Fence Types</h6>
            </div>
            <div style={styles.listWrapper}>
              {renderList(
                fenceTypes,
                "Fence Types",
                fenceTypeSearch,
                setFenceTypeSearch
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputControl;
