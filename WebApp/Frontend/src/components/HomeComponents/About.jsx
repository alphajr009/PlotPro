import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import video1 from "../../assets/key_features_video.mp4";

const About = () => {
  return (
    <section
      id="about"
      className="about"
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", color: "#007BFF", padding: "1rem" }}>
          Our Vision
        </h2>
        <p style={{ textAlign: "center", fontSize: "1.3rem", padding: "2rem" }}>
          Welcome to PlotPro, your ultimate solution for accurately
          measuring, mapping, and managing land plots for various agricultural
          purposes. Our application is designed to assist plantation owners,
          farmers, and land surveyors in optimizing land utilization and
          planning agricultural activities with precision and ease.
        </p>
        <hr style={{ width: "100%" }} />
      </div>
      <div>
        <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
          At PlotPro, our mission is to provide a user-friendly,
          technologically advanced platform that empowers users to:{" "}
        </p>
        <MDBContainer>
          <MDBListGroup
            className="my-4 mx-4"
            style={{
              maxWidth: "90rem",
              padding: "0rem 2rem 5rem 2rem",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <MDBListGroupItem color="primary">
              • Measure land areas and perimeters effortlessly using mobile
              devices.
            </MDBListGroupItem>
            <MDBListGroupItem color="secondary">
              • Plan and estimate efforts required for land clearing, planting,
              fertilization, weeding, and fencing
            </MDBListGroupItem>
            <MDBListGroupItem color="danger">
              • Create, label, group, and subgroup maps for effective land
              management.
            </MDBListGroupItem>
            <MDBListGroupItem color="warning">
              • Determine suitable plant numbers and fertilization requirements
              based on mapped land data.
            </MDBListGroupItem>
            <MDBListGroupItem color="info">
              • Offer superior accuracy and user-friendliness compared to
              existing products in the market.
            </MDBListGroupItem>
            <MDBListGroupItem color="light">
              • Can enable the notifications to put fertilizer into your
              plantation periodicaly.
            </MDBListGroupItem>
            <MDBListGroupItem color="dark">
              • Use the manual calculator to get all the calculations when you
              previously know about the dimentions of the land
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBContainer>
        <h2 style={{ textAlign: "center", color: "#007BFF", padding: "1rem" }}>
          How we Stand Out
        </h2>
        <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
          We aim to exceed expectations by continuously enhancing the
          application's accuracy, usability, and functionalities. Our commitment
          to early validation against known fields ensures reliability and
          accuracy from the initial stages of your project.
        </p>
        <div style={{ alignContent: "center", textAlign: "center" }}></div>
      </div>

      <div
        className="hero-video"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={video1} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginBottom: 20,
  },
  visionContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "20px",
    borderRadius: 5,
    marginBottom: 20,
  },
  heading: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  paragraph: {
    color: "#333",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  visionContainer: {
    padding: "2rem 0 2rem 0",
    width: "80vw",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)",
    padding: "20px",
    borderRadius: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
  },
  visionHeading: {
    color: "#007BFF",

    textAlign: "center",
  },
  mobileAppImage: {
    width: "100%",
    borderRadius: 10,
  },
  visionList: {
    paddingLeft: 0,
  },
  keyFeaturesContainer: {
    width: "80vw",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)",
    padding: "1rem 0 1rem 0",
  },
  icon: {
    color: "#4CAF50",
    marginRight: 10,
  },
  featureText: {
    marginLeft: 10,
  },
};

export default About;
