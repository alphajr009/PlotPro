const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

const dbconfig = require("./db");
const userRoute = require("./routes/usersRoute");

app.use(helmet());
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "cross-origin-opener-policy": [
        "same-origin",
        "allow-popups",
        "strict-origin",
      ],
      "cross-origin-embedder-policy": ["require-corp"],
    },
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/api/users", userRoute);


const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("<h3>Server Running</h3>");
});

app.listen(port, () => console.log("Node Server Started using Nodemon!"));
