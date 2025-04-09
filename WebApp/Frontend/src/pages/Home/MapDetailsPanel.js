import React from 'react';
import { Button, Collapse, Descriptions, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const MapDetailsPanel = ({ mapDetails, onClose }) => {
  if (!mapDetails) return null;

  const { mapDetails: map, fenceDetails, plantationDetails,clearLandDetails  } = mapDetails;

  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        top: "80px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        width: "300px",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <Title level={4} style={{ marginBottom: "16px" }}>{map.templateName}</Title>
      
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header="Map Details" key="1">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Area">{parseFloat(map.Area).toFixed(2)} perch</Descriptions.Item>
            <Descriptions.Item label="Perimeter">{parseFloat(map.Perimeter).toFixed(2)} km</Descriptions.Item>
            <Descriptions.Item label="Land Type">{map.landType}</Descriptions.Item>
            <Descriptions.Item label="Location">{map.location}</Descriptions.Item>
            <Descriptions.Item label="Description">{map.description}</Descriptions.Item>
          </Descriptions>
        </Panel>

        {fenceDetails && (
          <Panel header="Fence Details" key="2">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Post Space">{fenceDetails.postSpace} {fenceDetails.postSpaceUnit}</Descriptions.Item>
              <Descriptions.Item label="Number of Sticks">{fenceDetails.numberOfSticks}</Descriptions.Item>
              <Descriptions.Item label="Fence Type">{fenceDetails.fenceType}</Descriptions.Item>
              <Descriptions.Item label="Number of Gates">{fenceDetails.fenceAmount.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Gate Lengths">{fenceDetails.fenceLength.join(', ')}</Descriptions.Item>
            </Descriptions>
          </Panel>
        )}

        {plantationDetails && (
          <Panel header="Plantation Details" key="3">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Number of Plants">{plantationDetails.numberOfPlants}</Descriptions.Item>
              <Descriptions.Item label="Plant Type">{plantationDetails.plantType}</Descriptions.Item>
              <Descriptions.Item label="Plant Space">{plantationDetails.plantSpace} {plantationDetails.unit}</Descriptions.Item>
              <Descriptions.Item label="Row Space">{plantationDetails.rowSpace} {plantationDetails.unit}</Descriptions.Item>
              <Descriptions.Item label="Plant Density">{plantationDetails.plantDensity}</Descriptions.Item>
            </Descriptions>
          </Panel>
        )}
        {clearLandDetails && (
          <Panel header="Clear Land Details" key="4">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Weed Type">{clearLandDetails.weedType}</Descriptions.Item>
              <Descriptions.Item label="Total Effort">{clearLandDetails.effortOutput.toFixed(2)} hours</Descriptions.Item>
              <Descriptions.Item label="Weed Effort">{clearLandDetails.weedEffort.toFixed(2)} hours</Descriptions.Item>
              <Descriptions.Item label="Plant Effort">{clearLandDetails.plantEffort.toFixed(2)} hours</Descriptions.Item>
              <Descriptions.Item label="Stone Effort">{clearLandDetails.stoneEffort.toFixed(2)} hours</Descriptions.Item>
              <Descriptions.Item label="Work Days">{clearLandDetails.workDays}</Descriptions.Item>
              <Descriptions.Item label="Labor Count">{clearLandDetails.laborCount}</Descriptions.Item>
              <Descriptions.Item label="Work Hours">{clearLandDetails.workHours}</Descriptions.Item>
              <Descriptions.Item label="Plant Details">{clearLandDetails.plantDetails.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Stone Details">{clearLandDetails.stoneDetails.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Machine Details">{clearLandDetails.machineDetails.join(', ')}</Descriptions.Item>
            </Descriptions>
          </Panel>
        )}
      </Collapse>

      <Button 
        type="primary" 
        onClick={onClose}
        style={{
          marginTop: "16px",
          width: "100%",
        }}
        danger
      >
        Close
      </Button>
    </div>
  );
};

export default MapDetailsPanel;