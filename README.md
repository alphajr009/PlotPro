# PlotPro: Comprehensive Agricultural Land Management Tool

![PlotPro Logo](https://imgur.com/fCZOBk3)

## Project Overview

**PlotPro** is a cutting-edge agricultural land management tool designed to empower farmers and landowners with precise tools for land measurement, partitioning, clearing, plantation management, expense tracking, and revenue analysis. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js) and integrating advanced features like machine learning for plantation optimization, PlotPro aims to enhance productivity, sustainability, and profitability in agricultural operations.

## Features

### **User Registration and Onboarding**
- **Account Creation**: Sign up using email, phone number, or social media accounts.
- **Introduction and Instructions**: Interactive tutorials guiding users through key functionalities.

### **Land Management**
- **Land Measurement**:
  - **Walk Around the Land**: GPS-based path drawing to capture land boundaries accurately.
  - **Upload Shape File**: Import land boundaries via shape files (.shp, .kml).
  - **Point the Edges on Map**: Manually mark land boundaries on the interactive map.
- **Land Partitioning**: Divide land into labeled sections (e.g., A, B, C) with interactive tools to draw fences, roads, and adjust edges.
- **Land Clearing**:
  - **Effort Calculation**: Estimate labor, machinery, and costs based on land size and conditions.
  - **Expense Optimization**: Suggest cost-effective clearing methods and machinery based on budget and requirements.

### **Plantation Management**
- **Crop Planning**:
  - **Crop Selection**: Choose from a diverse list of crops with detailed growth information.
  - **Fertilization and Irrigation Scheduling**: Automated recommendations based on crop type and soil data.
- **Work Scheduling**: Task management with notifications for watering, fertilizing, and harvesting.
- **Growth Monitoring**:
  - **Photo Uploads & NDVI Analysis**: Track crop health and growth stages using image processing.
  - **Data Analytics**: Visual insights into growth trends, resource usage, and yield predictions.

### **Expense and Revenue Management**
- **Expense Tracking**: Log and categorize expenses related to land clearing, fertilization, labor, and machinery.
- **Revenue Projection**: Estimate potential income based on crop yields and current market prices.
- **Budget Planning**: Align agricultural activities with budget constraints and forecast future expenses.

### **Insight Analyzer**
- **Weather and Climate Analysis**: Integrate historical and forecasted weather data to optimize planting and harvesting schedules.
- **AI-Driven Recommendations**: Provide optimal planting schedules, crop suitability, and resource management strategies based on real-time data.
- **Dynamic Task Adjustments**: Update work schedules in real-time based on environmental conditions and predictive insights.

### **Monitoring and Alerts**
- **Crop Health Monitoring**:
  - **NDVI Analysis**: Assess plant health using satellite or drone imagery.
  - **AI-Based Disease Detection**: Identify signs of pests, diseases, or nutrient deficiencies through image analysis.
- **Environmental Monitoring**:
  - **Real-Time Weather Data**: Display current weather conditions and forecasts specific to the land’s location.
  - **Soil Moisture Sensors**: Monitor real-time soil moisture levels for optimal irrigation scheduling.
  - **Temperature and Humidity Tracking**: Track ambient temperature and humidity to predict crop stress conditions.
- **Pest and Disease Alerts**:
  - **Automated Notifications**: Receive alerts when pests or diseases are detected or conditions are favorable for their occurrence.
  - **Integrated Pest Management (IPM) Recommendations**: Sustainable pest control suggestions based on monitoring data.

### **Historical Data and Reporting**
- **Historical Monitoring Data Access**: Review past data to analyze trends and the effectiveness of farming strategies.
- **Custom Reports**: Generate comprehensive reports on crop health, resource usage, and environmental conditions for record-keeping and compliance.

### **Additional Features**
- **Export Shape Files**: Download land and partition maps in GIS-compatible formats.
- **Chat and Help Support**: Access in-app support center with FAQs, live chat, and community forums.
- **Collaboration Tools**: Share templates and collaborate with team members or agronomists.
- **Multilingual Support**: Accessible in multiple languages to cater to a diverse user base.
- **Offline Mode**: Limited functionality available without internet connectivity.

## Technology Stack

- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Geospatial Data**: GeoJSON, Leaflet.js, Mapbox
- **Machine Learning**: TensorFlow/PyTorch for AI-driven features
- **Cloud Services**: AWS/GCP for storage and deployment
- **Version Control**: Git, GitHub

## Architecture

![Architecture Diagram](https://imgur.com/sCRfQEy)

PlotPro follows a **MERN** architecture, ensuring a seamless and scalable environment for both mobile and web applications. The backend manages data storage, API endpoints, and business logic, while the frontend provides an intuitive user interface. Machine learning models are integrated into the backend to process and analyze data, delivering actionable insights to users.

## Installation

### Prerequisites

- **Node.js**: [Download and Install](https://nodejs.org/)
- **MongoDB**: [Download and Install](https://www.mongodb.com/)
- **Git**: [Download and Install](https://git-scm.com/)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/plotpro.git
   cd plotpro/backend

2. Install Dependencies
3. Configure Environment Variables
4. Run the Server

### Frontend Setup

1. Navigate to Frontend Directory
2. Install Dependencies
3. Configure Environment Variables
4. Run the Frontend

## Usage

### Register an Account

### Open the application in your browser.
 - Click on "Sign Up" and create a new account using your email, phone number, or social media accounts.
 - Create a Land Template

### After logging in, navigate to the dashboard.
 - Click on "Create a Template".
 - Choose one of the three methods to capture your land:
 - Walk Around the Land: Use GPS to trace the land boundaries.
 - Upload Shape File: Import existing shape files.
 - Point the Edges on Map: Manually mark land boundaries on the map.
 - Review and Save Land Details

### Review the calculated area, perimeter, and location.
 - Choose to "Cancel and Retake" or "Save" the template.
 - Provide additional details like name, description, and tags before saving.
 - Partition the Land

### After saving, choose to partition the land.
 - Use interactive tools to divide the land into labeled sections.
 - Assign crops, fertilization requirements, irrigation schedules, and harvesting dates to each partition.
 - Manage Plantation and Expenses

### Plan and manage your crops within each partition.
 - Track expenses related to land clearing, fertilization, labor, and machinery.
 - Monitor revenue projections based on crop yields and market prices.
 - Monitor and Analyze

### Use the Monitoring module to track crop health, environmental conditions, and resource usage.
 - Leverage the Insight Analyzer for AI-driven recommendations and budget planning.
 - Access historical data and generate custom reports for comprehensive analysis.
 - Export and Share

### Export shape files for GIS compatibility.
 - Share templates and collaborate with team members or agronomists.
 - Access support through in-app chat and help resources.

For any further assistance or inquiries, feel free to contact the development team at pasidurandika35@gmail.com
   
