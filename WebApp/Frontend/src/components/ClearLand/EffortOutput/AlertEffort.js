import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from 'react-icons/fa'; // Import the alert icon

const handleAlert = () => {
  toast.info(
    <div style={{ marginLeft: '20px' }}>
      <p><strong>Calculation happens based on those assumptions:</strong></p>
      <p>For <strong>High</strong> weed types a <strong>backhoe</strong> is added if not added by user.</p>
      <p>For <strong>tress</strong> a <strong>chainsaw</strong> is added if not added by user.</p>
      <p>For <strong>stones</strong> a <strong>excavator breaker</strong> is added if not added by user.</p>
      
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
