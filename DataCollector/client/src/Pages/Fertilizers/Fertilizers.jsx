import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './fertilizers.css';

function Fertilizers() {
  const [fertilizers, setFertilizers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get('/api/fertilizer/getall')
      .then((response) => {
        setFertilizers(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching fertilizers data:', error);
      });
  }, []);

  const columns = [

    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Fertilizer Name',
      dataIndex: 'fertilizer_name',
      key: 'fertilizer_name',
    },
    {
      title: 'Fertilizer Type',
      dataIndex: 'fertilizer_type',
      key: 'fertilizer_type',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Price per Unit',
      dataIndex: ['price_per_unit', 'price'],
      key: 'price_per_unit',
      render: (text, record) => `${text} ${record.price_per_unit.currency_code}`,
    },
    {
      title: 'Country',
      dataIndex: 'country_code',
      key: 'country_code',
    },
    {
      title: 'Ingredients',
      dataIndex: 'ingredients',
      key: 'ingredients',
      render: (ingredients) => (
        <Space>
          {ingredients.map((ingredient, index) => (
            <Tag key={index}>{`${ingredient.ingredient_name} (${ingredient.percentage}%)`}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Storage Conditions',
      dataIndex: 'storage_instructions',
      key: 'storage_instructions',
      render: (storage) => (
        <Space>
          <div>Temp: {storage.temperature_range.min}°C - {storage.temperature_range.max}°C</div>
          <div>Humidity: {storage.humidity_range.min}% - {storage.humidity_range.max}%</div>
          <div>Light: {storage.light_conditions}</div>
        </Space>
      ),
    },
    {
      title: 'Toxicity Level',
      dataIndex: 'toxicity_level',
      key: 'toxicity_level',
      render: (toxicity) => <Tag color={toxicity === 'Low' ? 'green' : toxicity === 'Medium' ? 'yellow' : 'red'}>{toxicity}</Tag>,
    },
    {
      title: 'Safety Instructions',
      dataIndex: 'safety_instructions',
      key: 'safety_instructions',
      render: (text) => <div>{text}</div>,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
            <Button onClick={() => navigate('/home')}>Home</Button>
      <div className="header-fertilizer">
        <h2>Fertilizer List</h2>

        <Button onClick={() => navigate('/fertilizers/add')}>Add Fertilizer</Button>
       
      </div>
      <Table
        columns={columns}
        dataSource={fertilizers}
        rowKey="_id"
        pagination={{ pageSize: 50 }} 
        bordered
      />
    </div>
  );
}

export default Fertilizers;
