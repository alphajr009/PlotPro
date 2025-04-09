import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from 'react-icons/fa'; // Import the alert icon

const handleAlert = () => {
  toast.info(
    <div style={{ marginLeft: '20px' }}>
      <p><strong>Select to calculate effort for breaking large stones</strong></p>
      <p><strong>Small:</strong>0.5m³ stone. Enter stone count as well.</p>
      <p><strong>Large</strong>1m³ stone. Enter stone count as well.</p>
      <p><strong>Note : If you only want to break stones in your land choose only "Stones" options.</strong></p>
      
    </div>,
    {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};

const AlertButton = () => {
  return (
    <div>
      <FaExclamationCircle
        onClick={handleAlert}
        style={{ cursor: 'pointer', color: '#007BFF', fontSize: '12px' }} // Adjust icon size and color as needed
      />
      <ToastContainer />
    </div>
  );
};

export default AlertButton;
