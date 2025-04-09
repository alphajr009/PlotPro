import React, { useState } from 'react';
import "./contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import video3 from "../../../assets/contact_video.mp4";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://field-master-backen.vercel.app";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${API_URL}/api/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      
      if (response.ok) {
        setStatus('Message Sent!');
        // Clear input fields
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatus('Error sending message');
      }
    } catch (error) {
      setStatus('Error sending message');
    }
  };

  return (
    <div className="contact">
      <div style={{ textAlign: "center", color: "#007BFF", margin: "2rem" }}>
        <h2>Contact Us</h2>
      </div>

      <footer className='footer-container'>
        <div className="top">
          <div className="pages">
            <div className="contact-video-container">
              <div className="contact-video" style={{ borderRadius: "0.5rem" }}>
                <video height="390rem" autoPlay loop muted style={{ borderRadius: "0.5rem" }}>
                  <source src={video3} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="contactForm">
            <div className="contactSupport">Stay In Touch</div>
            <form onSubmit={handleSubmit}>
              <div className="inputName">
                <label htmlFor="contact_name">Name: </label>
              </div>
              <div className='contactInput'>
                <input
                  className="input1"
                  type="text"
                  name="name"
                  id="contact_name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="inputName">
                <label htmlFor="contact_email">Email: </label>
              </div>
              <div className='contactInput'>
                <input
                  className="input1"
                  type="email"
                  name="email"
                  id="contact_email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doe@gmail.com"
                  required
                />
              </div>
              <div className="inputName">
                <label htmlFor="contact_message">Message: </label>
              </div>
              <div className='contactInput'>
                <textarea
                  rows={3}
                  cols={30}
                  name="message"
                  id="contact_message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  required
                ></textarea>
              </div>

              <input type="submit" value="Submit" className="submit-button" />
            </form>
            {status && <p>{status}</p>}
          </div>
        </div>

        <div className="info">
          <div className="copyright">
            <button onClick={() => window.location.href = "/terms"} style={{ color: "white", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Terms & Conditions</button> / <button onClick={() => window.location.href = "/privacy"} style={{ color: "white", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</button>
          </div>
          <div className="social-icon">
            <FontAwesomeIcon icon={faLinkedin} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faGithub} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faFacebook} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faInstagram} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faTwitter} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faYoutube} style={{ color: "white", height: "2rem", width: "2rem" }} />&nbsp;&nbsp;&nbsp;
          </div>

          <div className="copyright">2021 Copyright &copy; PlotPro</div>
        </div>
      </footer>
    </div>
  );
}

export default ContactForm;
