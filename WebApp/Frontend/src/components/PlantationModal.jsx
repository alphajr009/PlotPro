import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';

const PlantationModal = ({ isOpen, toggleModal }) => {
    const [visible, setVisible] = useState(true);

    const closeModal = () => {
        setVisible(false);
        toggleModal();
    };

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            width: '350px',
            height: '900px',
            borderRadius: '10px',
            outline: 'none',
            border: 'none',
            padding: '20px',
            position: 'relative',
            background: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column'
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
            <div style={topDivStyles}>
                <div style={backArrowStyles} onClick={closeModal}>
                    <AiOutlineArrowLeft size={24} color="#000" />
                </div>
                <h4>Plantation</h4>
                <div style={closeIconStyles} onClick={closeModal}>
                    <AiOutlineClose size={24} color="#000" />
                </div>
            </div>
            <div style={contentContainerStyles}>
                <div style={contentDiv1Styles}></div>
                <div style={contentDiv2Styles}></div>
            </div>
        </Modal>
    );
};

const topDivStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
};

const backArrowStyles = {
    cursor: 'pointer'
};

const closeIconStyles = {
    cursor: 'pointer'
};

const contentContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
};

const contentDiv1Styles = {
    height: '60px',
    borderRadius: '10px',
    background: 'white',
    marginBottom: '20px'
};

const contentDiv2Styles = {
    height: '150px',
    borderRadius: '10px',
    background: 'white'
};

export default PlantationModal;
