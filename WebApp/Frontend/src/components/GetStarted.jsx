import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon from react-icons library
import logo from '../images/logo.png'; 
import MobileImage from '../images/MobileImage.png'; // Import MobileImage
import WebImage from '../images/WebImage.png'; // Import web image
import { useNavigate } from 'react-router-dom';


const GetStarted = ({ toggleModal }) => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    const closeModal = () => {
        setVisible(false);
        toggleModal(); // Call toggleModal to close the modal from the parent component
    };

    const navigateToRegister = () => {
        navigate('/login'); // Navigate to LoginPage
    };


    return (
        <Modal isOpen={visible} onRequestClose={closeModal} style={modalStyles}>
            <div style={headerStyles}>
                <div>
                    <img src={logo} alt="Logo" style={logoStyles} /> {/* Your logo */}
                </div>
                <h4>Continue With</h4>
                <div style={closeIconStyles} onClick={closeModal}>
                    <AiOutlineClose size={24} color="#000" />
                </div>
            </div>
            <div style={contentStyles}>
                <div style={leftContentStyles}>
                    <h3>Mobile App</h3>
                    <img src={MobileImage} alt="Mobile Image" style={imageStyles} />
                    <p style={paragraphStyles}>GeoMeasure, a user-friendly web app, simplifies complex geographical measurements, allowing users to effortlessly calculate distances, areas, and coordinates for enhanced spatial analysis and planning.</p>
                    <button style={buttonStyles}>Download Now</button>
                </div>
                <h5 style={orTextStyle}>or</h5>
                <div style={rightContentStyles}>
                <h3>Web App</h3>
                    <img src={WebImage} alt="Web Image" style={imageStyles} />
                    <p style={paragraphStyles}>This app empowers you to easily calculate and record accurate area measurements while on the move and at your convenience at your desired place anywhere at anytime with super realtime mapping of the area.</p>
                    <button style={buttonStyles} onClick={navigateToRegister}>Get Started</button>
                </div>
            </div>
        </Modal>
    );
};

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background for blur effect
        zIndex: 9999, // Ensure modal is above other content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '830px', 
        height: '520px', 
        borderRadius: '10px',
        outline: 'none', // Remove default outline
        border: 'none', // Remove border
        padding: '10px',
        position: 'relative', // Ensure close button is positioned correctly
        background: 'whitesmoke', // Set background to whitesmoke
        display: 'flex',
        boxShadow: '50px black',
        flexDirection: 'column'
    }
};

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
};

const logoStyles = {
    width: '100px',
    height: 'auto'
};

const closeIconStyles = {
    cursor: 'pointer',
    paddingRight: '20px'
};

const contentStyles = {
    display: 'flex',
    flex: 1,
    marginBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    
};

const leftContentStyles = {
    flex: 1,
    borderRadius: '10px',
    background: 'white',
    marginRight: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
};

const rightContentStyles = {
    flex: 1,
    borderRadius: '10px',
    background: 'white',
    marginLeft: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
};

const imageStyles = {
    width: 'auto',
    height: '200px'
};

const paragraphStyles = {
    fontSize: '12px',
    textAlign: 'center',
    margin: '10px 0'
};

const buttonStyles = {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '150px',
};

const orTextStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0'
};

export default GetStarted;
