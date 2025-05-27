export const getFenceDetailsHtml = (fenceType, numberOfSticks, postSpace, PostSpaceUnit, data1, Area, Perimeter) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Details</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Roboto', sans-serif;
              background-color: #f0f4f8;
              color: #333;
          }
          .container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 15px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              transition: transform 0.2s ease-in-out;
          }
          .container:hover {
              transform: scale(1.02);
          }
          .logo-container {
              display: flex;
              align-items: center;
              background-color: #007BFF;
              border-radius: 10px;
              padding: 10px 20px;
              color: #fff;
          }
          .App-logo {
              margin-right: 15px;
          }
          .logo-text {
              font-size: 28px;
              font-weight: 700;
          }
          .Description-text1 {
              margin-top: 20px;
              font-size: 24px;
              color: #007BFF;
              border-bottom: 3px solid #007BFF;
              display: inline-block;
              padding-bottom: 5px;
          }
          .Description-text {
              margin-top: 10px;
              font-size: 16px;
              line-height: 1.6;
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #ddd;
          }
          h2 {
              margin-top: 20px;
              font-size: 22px;
              color: #007BFF;
              border-bottom: 3px solid #007BFF;
              display: inline-block;
              padding-bottom: 5px;
          }
          ul {
              list-style-type: none;
              padding: 0;
              margin: 10px 0;
          }
          ul li {
              margin-bottom: 10px;
              font-size: 16px;
              background-color: #f9f9f9;
              padding: 10px;
              border-radius: 8px;
              border: 1px solid #ddd;
              transition: background-color 0.3s ease;
          }
          ul li:hover {
              background-color: #e9e9e9;
          }
          ul ul {
              margin-top: 10px;
              padding-left: 20px;
          }
          ul ul li {
              background-color: #e9e9e9;
              border-color: #ccc;
          }
          .footer {
              margin-top: 20px;
              font-size: 14px;
              text-align: center;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo-container">
              <h1 class="logo-text">PlotPro</h1>
          </div>
          <h2 class="Description-text1">Description</h2>
          <div class="Description-text">
              <p>Welcome to PlotPro, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
          </div>
          <h2>Map Information</h2>
          <ul>
              <li>Perimeter = ${parseFloat(Perimeter).toFixed(2)} km</li>
              <li>Area = ${parseFloat(Area).toFixed(2)} perches</li>
          </ul>

          <h2>Fence Details</h2>
          <ul>
              <li>Fence Type = ${fenceType}</li>
              <li>Total Stick Amount = ${numberOfSticks}</li>
              <li>Post Space = ${postSpace} ${PostSpaceUnit}</li>
              <li>Gate values
                  <ul>
                      ${data1.map((value) => `<li>${value}</li>`).join("")}
                  </ul>
              </li>
          </ul>
          <div class="footer">
              &copy; ${new Date().getFullYear()} PlotPro. All rights reserved.
          </div>
      </div>
  </body>
  </html>
`;
