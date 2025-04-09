import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { RiWalkFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { FaCalculator } from 'react-icons/fa6';
import { useState } from 'react';
import Calculator from '../Calculator/calculator';
import { useNavigate } from 'react-router-dom';

export default function StartMeasurePage({ onBackToSidebar, onMobileOnlyFeature }) {
  const [hoveredOption, setHoveredOption] = useState(null);
  const navigate = useNavigate();


  const handleWalkAroundClick = () => {
    onMobileOnlyFeature();
  };

  const handleOptionHover = (option) => {
    setHoveredOption(option);
  };

  const handlePointEdgesClick = () => {
    navigate('/pointAddingWeb');
  };

  const handleOptionLeave = () => {
    setHoveredOption(null);
  };

  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  const handlemanualCalculatorClik = () => {
    setCurrentPage('Calculator');
    setAnimatePage(true);
  };

  return (
    <div>
      {!currentPage && (
        <div>
          <div style={styles.header}>
            <MdArrowBack
              onClick={onBackToSidebar}
              style={styles.backButton}
              fontSize={20}
            />{' '}
          </div>

          <div style={styles.selectionModel}>
            <div
              style={{
                ...styles.options,
                ...(hoveredOption === 'walkAround'),
                backgroundColor: '#9e95d6',
                cursor: 'pointer'
              }}
              onMouseEnter={() => handleOptionHover('walkAround')}
              onMouseLeave={handleOptionLeave}
              onClick={handleWalkAroundClick}
            >
              <div style={styles.iconContainer}>
                <RiWalkFill
                  fontSize={32}
                  style={{ marginLeft: '10px', marginTop: '10px' }}
                  color='#fff'
                />
              </div>
              <div style={styles.textContainer}>
                <div>
                  <h7 style={styles.text}>Walk around the land</h7>
                </div>
                <div style={{ marginTop: '5px', width: '85%' }}>
                  <p style={styles.innerText}>
                    Click on Start button and it will track your phone's live
                    position.
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                ...styles.options,
                ...(hoveredOption === 'pointEdges' && styles.hoverEffect),
              }}
              onMouseEnter={() => handleOptionHover('pointEdges')}
              onMouseLeave={handleOptionLeave}
              onClick={handlePointEdgesClick}
            >
              <div style={styles.iconContainer}>
                <MdLocationOn
                  fontSize={27}
                  style={{ marginLeft: '10px', marginTop: '10px' }}
                  color='#fff'
                />
              </div>
              <div style={styles.textContainer}>
                <div>
                  <h7 style={styles.text}>Point edges on map</h7>
                </div>
                <div style={{ marginTop: '5px', width: '88%' }}>
                  <p style={styles.innerText}>
                    Add points to map manually, drag and drop to specific place.
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                ...styles.options,
                ...(hoveredOption === 'manualCalculator' && styles.hoverEffect),
              }}
              onMouseEnter={() => handleOptionHover('manualCalculator')}
              onMouseLeave={handleOptionLeave}
              onClick={handlemanualCalculatorClik}
            >
              <div style={styles.iconContainer}>
                <FaCalculator
                  fontSize={22}
                  style={{ marginLeft: '10px', marginTop: '12px' }}
                  color='#fff'
                />
              </div>
              <div style={styles.textContainer}>
                <div>
                  <h7 style={styles.text}>Manual Calculator</h7>
                </div>
                <div style={{ marginTop: '5px', width: '85%' }}>
                  <p style={styles.innerText}>
                    Manually add area and perimeter for the calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          transform: animatePage ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: 'whitesmoke',
          overflow: 'auto', // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === 'Calculator' && (
          <Calculator onBackToSidebar={handleBackClick} />
        )}
      </div>
    </div>
  );
}

const styles = {
  hoverEffect: {
    backgroundColor: '#0D2B7A',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    marginTop: '-5%',
    marginLeft: '-5%',
    padding: '18px',
  },
  backButton: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  selectionModel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: '90px',
    marginBottom: '20px',
    backgroundColor: '#1640D6',
    borderRadius: '11px',
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px',
    marginLeft: '10px',
    flex: 1,
  },
  text: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
  },
  innerText: {
    color: '#fff',
    fontSize: '11px',
  },
};
