import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from 'react-icons/fa'; // Import the alert icon

const handleAlert = () => {
  toast.info(
    <div style={{ marginLeft: '20px' }}>
      <p><strong>Select to calculate effort for cutting trees</strong></p>
      <p><strong>Low:</strong>Tree with 0.5m average circumference. Enter tree count as well.</p>
      <p><strong>Medium</strong>Tree with 1m average circumference. Enter tree count as well.</p>
      <p><strong>High</strong>Tree with 2m average circumference. Enter tree count as well.</p>
      <p><strong>Note : If you only want to cut trees in your land choose only "Plants" options.</strong></p>
      
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
