import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import './Home.css'; // Optional: for adding some styles

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h1>Welcome to Data Collector</h1>
        <p>Click on the links below to navigate to the respective pages</p>
      </div>
      
      <div className="home-content">
        <div className="home-links">
          <ul className="link-list">
            <li className="link-item">
              <Link to="/plants" className="home-link"> Plants</Link>
            </li>
            <li className="link-item">
              <Link to="/fertilizers" className="home-link"> Fertilizers</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
