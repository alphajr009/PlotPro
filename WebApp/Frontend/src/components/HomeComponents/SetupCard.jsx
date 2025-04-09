import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import "./SetupCard.css"; // Assuming you have a CSS file for additional styling

const SetupCard = () => {
  return (
    <div className="setup-card">
      <h2 className="setup-card-title">
      PlotPro Setup Instructions
      </h2>
      <div className="setup-card-container">
        {/* Using CSS Grid for responsive layout */}
        <div className="card-grid">
          {/* Card 1 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Walk around the Land"
              src="https://thumbs.dreamstime.com/b/young-red-haired-man-glasses-backpack-traveling-alone-smiling-guy-walking-road-background-green-hills-bushes-191902309.jpg"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Walk around the Land</MDBCardTitle>
              <MDBCardText>
                Explore the area by walking around with your device. The app will
                measure the land based on your movement.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  Tap "Walk around the Land" on the page.
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Follow on-screen instructions to start and stop measurements.
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Ensure a clear line of sight for accurate results.
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Card 2 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Point edges on map"
              src="https://previews.123rf.com/images/tonsnoei/tonsnoei1506/tonsnoei150600064/41781231-pin-points-on-a-map-a-map-with-the-place-holiday-pin-pointed-on-a-map.jpg"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Point edges on map</MDBCardTitle>
              <MDBCardText>
                Pinpoint specific edges on a map for precise measurements. Use the
                map interface to mark key points and define the area.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  Select "Point Edges on Map" from the page.
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Pinpoint edges on the map by tapping or dragging markers.
                </MDBListGroupItem>
                <MDBListGroupItem>Confirm and save your measurements.</MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Card 3 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Manual Calculator"
              src="https://img.freepik.com/premium-vector/analytics-data-results-mobile-phone-screen-vector_101884-195.jpg"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Manual Calculator</MDBCardTitle>
              <MDBCardText>
                Enter Area and Perimeter and tap “Calculate” to get results. You
                can view all the results by giving the correct input.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>Clear Land</MDBListGroupItem>
                <MDBListGroupItem>Plantation</MDBListGroupItem>
                <MDBListGroupItem>Fence Setup</MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Card 4 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Clear Land"
              src="https://img.freepik.com/free-vector/scene-with-truck-driving-along-industrial-zone_1308-37622.jpg?semt=ais_user"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Clear Land</MDBCardTitle>
              <MDBCardText>
                Select density of weed (Low/Medium/High), Plants type, Stones
                type. Choose a clearing method.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  Enter the number of labors/ Machine type and number of machines
                  based on the clearing method you entered.
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Then you can calculate the effort and estimated time to clear your
                  land.
                </MDBListGroupItem>
                <MDBListGroupItem>You can get the details as a PDF file.</MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Card 5 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Plantation"
              src="https://img.freepik.com/free-vector/hand-drawn-flat-design-tree-planting-illustration_23-2149203319.jpg?semt=ais_user"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Plantation</MDBCardTitle>
              <MDBCardText>
                Enter plant type, space between two plants and space between two
                rows as your preference.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  App will calculate the number of plants you need and the plant
                  density.
                </MDBListGroupItem>
                <MDBListGroupItem>You can save details as a PDF.</MDBListGroupItem>
                <MDBListGroupItem>
                  To calculate the fertilization amount need for a month, use the
                  “Fertilization” feature.
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Card 6 */}
          <MDBCard className="setup-card-item">
            <MDBCardImage
              position="top"
              alt="Fence Setup"
              src="https://img.freepik.com/free-vector/training-park-dogs-design_24640-46691.jpg?semt=ais_user"
              style={{ height: "16rem", objectFit: "cover" }}
            />
            <MDBCardBody className="setup-card-text">
              <MDBCardTitle>Fence Setup</MDBCardTitle>
              <MDBCardText>
                Use this feature to calculate effort for setting up the fence on
                your land.
              </MDBCardText>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  You can estimate the cost for setting up the fence.
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Can include the details about Gates as well.
                </MDBListGroupItem>
                <MDBListGroupItem>You can get the details as a PDF file.</MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          {/* Repeat similar structure for other cards */}
        </div>
      </div>
    </div>
  );
};

export default SetupCard;
