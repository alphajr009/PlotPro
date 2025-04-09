import React from 'react';
import { Modal } from 'antd';
import phone from '../../images/phone.png';

const MobileOnlyModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Only for mobile app"
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
      style={{ left: "-21%", top:125, textAlign: 'justify'}}
      width={240} // Set your desired width here
      bodyStyle={{ height: 230 }}
      footer={null} // This will remove the OK and Cancel buttons
      closable={true} 
    >
    <p style={{color:"gray"}}>If you want to access for this feature you need to download FeildMaster mobile application</p>
    <img
    src={phone}
    alt="Mobile App"
    style={{width: 180, marginTop:15, height: 150, marginLeft: 6}}
    />
    </Modal>
  );
};

export default MobileOnlyModal;