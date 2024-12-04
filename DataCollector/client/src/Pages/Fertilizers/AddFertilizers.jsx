import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, Tag, Modal, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './fertilizers.css';

const { Option } = Select;

function AddFertilizers() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  // Submit function
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/fertilizer/add', [values]);
      if (response.status === 201) {
        setModalMessage('Fertilizer added successfully');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error adding fertilizer:', error);
      setModalMessage('Failed to add fertilizer');
      setModalVisible(true);
    }
  };

  // Close modal and refresh the page
  const handleOk = () => {
    setModalVisible(false);
    navigate('/fertilizers'); 
  };

  return (
    <div className="add-fertilizer-container" >
            <Button onClick={() => navigate('/home')}>Home</Button>
      <div className="header-fertilizer">
      <h2>Add New Fertilizer</h2>
        <Button onClick={() => navigate('/fertilizers')}>Fertilizer</Button>
      </div>
      <Form
        form={form}
        name="add_fertilizer"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ fertilizer_type: 'Solid', toxicity_level: 'Low', light_conditions: 'Indirect light' }}
      >
        {/* Fertilizer Name */}
        <Form.Item
          label="Fertilizer Name"
          name="fertilizer_name"
          rules={[{ required: true, message: 'Please enter the fertilizer name!' }]}
        >
          <Input />
        </Form.Item>

        {/* Fertilizer Type */}
        <Form.Item
          label="Fertilizer Type"
          name="fertilizer_type"
          rules={[{ required: true, message: 'Please select the fertilizer type!' }]}
        >
          <Select>
            <Option value="Solid">Solid</Option>
            <Option value="Liquid">Liquid</Option>
            <Option value="Dust">Dust</Option>
          </Select>
        </Form.Item>

        {/* Unit */}
        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: 'Please enter the unit!' }]}
        >
          <Input />
        </Form.Item>

        {/* Price per Unit */}
        <Form.Item
          label="Price per Unit"
          name={['price_per_unit', 'price']}
          rules={[{ required: true, message: 'Please enter the price per unit!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Currency Code"
          name={['price_per_unit', 'currency_code']}
          rules={[{ required: true, message: 'Please enter the currency code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
  label="Currency Code"
  name={['price_per_unit', 'currency_code']}
  rules={[{ required: true, message: 'Please select the currency code!' }]}
>
      <Select>
        <Option value="LKR">Sri Lankan Rupee (LKR)</Option>
        <Option value="INR">Indian Rupee (INR)</Option>
        <Option Option value="USD">US Dollar (USD)</Option>
        <Option value="GBP">British Pound (GBP)</Option>
        <Option value="EUR">Euro (EUR)</Option>
      </Select>
    </Form.Item>


 
        <Form.List
          name="ingredients"
          initialValue={['']}
          rules={[
            {
              validator: async (_, ingredients) => {
                if (!ingredients || ingredients.length < 1) {
                  return Promise.reject(new Error('At least one ingredient is required'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, fieldKey, name, fieldData, fieldLabels }) => (
                <Row key={key} gutter={16}>
                  <Col span={10}>
                    <Form.Item
                      label="Ingredient Name"
                      name={[name, 'ingredient_name']}
                      fieldKey={[fieldKey, 'ingredient_name']}
                      rules={[{ required: true, message: 'Ingredient name is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Percentage"
                      name={[name, 'percentage']}
                      fieldKey={[fieldKey, 'percentage']}
                      rules={[{ required: true, message: 'Percentage is required' }]}
                    >
                      <InputNumber min={0} max={100} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button type="danger" onClick={() => remove(name)} block>
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Ingredient
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Storage Instructions */}
        <Form.Item
          label="Storage Temperature Range"
          name={['storage_instructions', 'temperature_range']}
          rules={[{ required: true, message: 'Please provide the storage temperature range!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Storage Humidity Range"
          name={['storage_instructions', 'humidity_range']}
          rules={[{ required: true, message: 'Please provide the storage humidity range!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Light Conditions"
          name={['storage_instructions', 'light_conditions']}
          rules={[{ required: true, message: 'Please select light conditions for storage!' }]}
        >
          <Select>
            <Option value="Low light">Low light</Option>
            <Option value="No light">No light</Option>
            <Option value="Indirect light">Indirect light</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="LC Description"
          name={['storage_instructions', 'description']}
          rules={[{ required: true, message: 'Please enter the storage description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        {/* Toxicity Level */}
        <Form.Item
          label="Toxicity Level"
          name="toxicity_level"
          rules={[{ required: true, message: 'Please select the toxicity level!' }]}
        >
          <Select>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>

        {/* Safety Instructions */}
        <Form.Item
          label="Safety Instructions"
          name="safety_instructions"
          rules={[{ required: true, message: 'Please enter the safety instructions!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Fertilizer
          </Button>
        </Form.Item>
      </Form>

      {/* Success Modal */}
      <Modal
        title="Success"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default AddFertilizers;
