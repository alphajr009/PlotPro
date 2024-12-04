import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import axios from 'axios';

const Plants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Fetch plant data from the backend (Assuming the route is '/api/plants/all')
    axios.get('/api/plants/all')
      .then(response => {
        if (Array.isArray(response.data.plants)) {
          setPlants(response.data.plants); // Ensure it's an array before setting it to state
        } else {
          console.error('Data is not an array!', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the plant data!', error);
      });
  }, []);

  // Columns definition for Ant Design Table
  const columns = [
    {
      title: 'Plant Name',
      dataIndex: 'plant_name',
      key: 'plant_name',
    },
    {
      title: 'Scientific Name',
      dataIndex: 'scientific_name',
      key: 'scientific_name',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Days to Yield',
      dataIndex: 'days_to_yield',
      key: 'days_to_yield',
    },
    {
      title: 'Temperature Range (°C)',
      render: (text, record) => `${record.optimal_conditions.temperature_range.min} - ${record.optimal_conditions.temperature_range.max}`,
      key: 'temperature_range',
    },
    {
      title: 'Soil pH',
      render: (text, record) => record.optimal_conditions.soil_conditions.pH,
      key: 'soil_pH',
    },
    {
      title: 'Soil Type',
      render: (text, record) => record.optimal_conditions.soil_conditions.soil_type,
      key: 'soil_type',
    },
    {
      title: 'Watering Instructions',
      render: (text, record) => {
        return record.watering_instructions.map((instruction, index) => (
          <div key={index}>
            {instruction.water_amount} ({instruction.frequency}) - {instruction.seasonal_adjustment}
          </div>
        ));
      },
      key: 'watering_instructions',
    },
    {
      title: 'Fertilizers',
      render: (text, record) => {
        return record.fertilizers.map((fertilizer, index) => (
          <div key={index}>
            {fertilizer.amount} of {fertilizer.type} ({fertilizer.application_frequency})
          </div>
        ));
      },
      key: 'fertilizers',
    },
    {
      title: 'Pests and Diseases',
      render: (text, record) => {
        return record.pests_and_diseases.map((pest, index) => (
          <div key={index}>
            {pest.name}: {pest.treatment}
          </div>
        ));
      },
      key: 'pests_and_diseases',
    },
    {
      title: 'Companion Crops',
      render: (text, record) => {
        return record.crop_companion.map((companion, index) => (
          <div key={index}>
            {companion.companion_crop_name} - Compatibility: {companion.compatibility} - Reason: {companion.reason}
          </div>
        ));
      },
      key: 'crop_companion',
    },
    {
      title: 'Crop Rotation',
      render: (text, record) => {
        return record.crop_rotations.map((rotation, index) => (
          <div key={index}>
            {rotation.next_crop} - Soil Improvement: {rotation.soil_improvement}
          </div>
        ));
      },
      key: 'crop_rotations',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm 
            title="Are you sure you want to delete this plant?" 
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Function to handle the delete operation
  const handleDelete = (id) => {
    axios.delete(`/api/plants/${id}`)
      .then(() => {
        setPlants(plants.filter(plant => plant._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the plant!', error);
      });
  };

  // Function to handle the edit operation (You can implement modal to update plant details)
  const handleEdit = (record) => {
    // Logic for editing plant (e.g., open a modal or navigate to an edit page)
    console.log('Editing plant:', record);
  };

  return (
    <div>
      <h2>Plants</h2>
      <Table
        columns={columns}
        dataSource={plants}
        rowKey="_id" // assuming the plant's unique identifier is `_id`
      />
    </div>
  );
};

export default Plants;
