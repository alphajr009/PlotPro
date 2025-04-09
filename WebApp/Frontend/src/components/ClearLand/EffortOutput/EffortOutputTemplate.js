export const getClearLandDetailsHtml = (
  Perimeter,
  Area,
  data1,
  effortOutput,
  workDays,
  weedEffort,
  plantEffort,
  stoneEffort
) => `
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
              margin: 10px auto;
              padding: 20px;
              border: 5px solid #ccc;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .logo-container {
              display: flex;
              align-items: center;
              background-color: #fff;
              padding: 20px;
          }
          .App-logo {
              max-width: 130px;
              margin-right: 20px;
          }
          .logo-text {
              color: #007BFF;
              font-size: 40px;
              font-family: sans-serif;
          }
          .Description-text1 {
              margin-top: 20px;
              color: #333;
              font-size: 24px;
              border-bottom: 2px solid #007BFF;
              padding-bottom: 10px;
              padding: 10px;
              margin: 5px 0;
          }
          .Description-text {
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
              padding: 5px;
              border-radius: 4px;
          }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <h1 class="logo-text">Field Master</h1>
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

        <h2>Clear land Details</h2>

        <ul>
        <li> Total Effort Count= ${effortOutput} hours</li>
        <li>Weed Effort = ${weedEffort.toFixed(2)} hrs</li>
        <li>Plant Effort = ${plantEffort.toFixed(2)} hrs</li>
        <li>Stone Effort = ${stoneEffort.toFixed(2)} hrs</li>
        <li>Total number of days = ${workDays} </li>
        <li>Machine details = <ul>
        ${data1.map((value) => `<li>${value}</li>`).join("")}
        </ul></li>
        
        </ul>

    </div>
</body>
</html>

`;
