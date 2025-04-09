export const getPlantationDetailsHtml = (PlantDensity, numberOfPlants, textPlant, textRowspace, textplantspace, perimeter, area) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Details</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
          }
          .container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .logo-container {
              display: flex;
              align-items: center;
              background-color: #007BFF;
              padding: 20px;
              border-radius: 8px 8px 0 0;
          }
          .App-logo {
              max-width: 100px;
              margin-right: 20px;
          }
          .logo-text {
              color: #fff;
              font-size: 36px;
              font-family: 'Product Sans', sans-serif; /* You may need to import Product Sans */
          }
          .description-text1 {
              margin-top: 20px;
              color: #333;
              font-size: 24px;
              border-bottom: 2px solid #007BFF;
              padding-bottom: 10px;
              padding: 10px;
              margin: 5px 0;
          }
          .description-text {
              background: #f1f1f1;
              margin: 5px 0;
              padding: 10px;
              border-radius: 4px;
          }
          h1, h2, p {
              margin: 10px 0;
          }
          h2 {
              color: #007BFF;
          }
          ul {
              list-style-type: none;
              padding: 0;
          }
          ul li {
              background: #f1f1f1;
              margin: 5px 0;
              padding: 10px;
              border-radius: 4px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo-container">
              <h1 class="logo-text">Field Master</h1>
          </div>
          <h2 class="description-text1">Description</h2>
          <div class="description-text">
              <p>Welcome to PlotPro, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
          </div>
          <h2>Map Information</h2>
          <ul>
            <li>Perimeter = ${parseFloat(perimeter).toFixed(2)} km</li>
            <li>Area = ${parseFloat(area).toFixed(2)} perches</li>
          </ul>
          <h2>Plantation Details</h2>
          <ul>
              <li>Plant Type = ${textPlant}</li>
              <li>Total Plants = ${numberOfPlants} plants</li>
              <li>Row Space = ${textRowspace} m</li>
              <li>Plant Space = ${textplantspace} m</li>
              <li>Plant Density = ${PlantDensity}/m<sup>2</sup></li>
          </ul>
      </div>
  </body>
  </html>
`;