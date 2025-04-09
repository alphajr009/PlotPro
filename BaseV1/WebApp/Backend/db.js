const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = mongoose;