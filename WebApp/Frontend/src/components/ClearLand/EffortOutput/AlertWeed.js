import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from 'react-icons/fa'; // Import the alert icon

const handleAlert = () => {
  toast.info(
    <div style={{ marginLeft: '20px' }}>
      <p><strong>Select to calculate effort for removing weeds</strong></p>
      <p><strong>Low:</strong>Distributed all over the land in a height below 50cm. Can be removed by laborers. No need machines.</p>
      <p><strong>Medium</strong>Distributed all over the land in a height below 75cm. Can be removed by laborers. No need machines.</p>
      <p><strong>High</strong>Distributed all over the land. Can't be removed by laborers.There can be small plants as well.Need machines (Backhoe, Excavator).</p>
      <p><strong>Note : If you only want to remove weeds or small plants in your land choose only "Weeds" options.</strong></p>
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
