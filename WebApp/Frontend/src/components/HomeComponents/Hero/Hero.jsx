import React from "react";
import "./Hero.css";
import video1 from "../../../assets/home_video.mp4";
import GetStarted from "../../GetStarted";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section id="hero" className="hero-container">
      <div className="hero-content">
        <div className="hero-text-content">
          <h4>The Best Platform for Accurate measurements of your land</h4>
          <p>Trusted by beginners, marketers & professionals; Built with usability and performance in mind.</p>
          <div className="hero-btn">
            <button className="contact-btn" onClick={toggleModal}>
              Download Now
            </button>
          </div>
        </div>
      </div>

      <div className="hero-video">
        <video width="100%" height="100%" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
        </video>
      </div>

      {isModalOpen && <GetStarted toggleModal={toggleModal} />} 
    </section>
  );
};

export default Hero;
