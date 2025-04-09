// TemplateDataModal.js
import React from 'react';
import { Modal, Button, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const TemplateDataModal = ({ visible, onClose, data }) => {
  if (!data) return null;

  return (
    <Modal
      title={<Title level={4}>Template Data</Title>}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>
      ]}
      bodyStyle={{ padding: '20px' }}
      width={600}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>Template Name:</Text> <Text>{data.templateName}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Measure Name:</Text> <Text>{data.measureName}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Land Type:</Text> <Text>{data.landType}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Location:</Text> <Text>{data.location}</Text>
        </Col>
        <Col span={24}>
          <Text strong>Description:</Text> <Text>{data.description}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Date:</Text> <Text>{data.date}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Time:</Text> <Text>{data.time}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Perimeter:</Text> <Text>{data.perimeter} km</Text>
        </Col>
        <Col span={12}>
          <Text strong>Area:</Text> <Text>{data.area} perch</Text>
        </Col>
      </Row>
    </Modal>
  );
};

export default TemplateDataModal;
