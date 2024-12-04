const express = require("express");

require("dotenv").config();

const app = express();

const dbconfig = require("./db");
const plantRoute = require("./routes/plantsRoute");
const fertilizerRoute = require("./routes/fertilizerRoute");


app.use(express.json());

app.use("/api/plants", plantRoute);
app.use("/api/fertilizer",fertilizerRoute );

const port = process.env.DATA_C_PORT;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("Node Server Started using Nodemon!"));