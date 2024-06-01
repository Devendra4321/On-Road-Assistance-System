const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const cors = require("cors");

const fs = require("fs").promises;
const path = require("path");
const configPath = path.resolve(__dirname, "helpers", "config.json");

const machineId = require("node-machine-id");
let machineID; // Declare machineID variable
let license = "u3Y65£,;7Y#I";

// Get the machine ID
machineId
  .machineId()
  .then((id) => {
    machineID = id;
    // console.log("Machine ID:", id);
    //console.log('license ID:', license);
  })
  .catch((error) => {
    console.error("Error getting machine ID:", error);
  });

// Middleware to check for a valid license
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (
      storedLicense.licenseCode === license &&
      storedLicense.deviceId === machineID
    ) {
      //console.log("Valid license");
      next();
      // Send a success response
      //return res.json({ message: 'Valid license' });
    }
  } catch (error) {
    console.error(
      "Invalid or missing license information. Please verify the license."
    );
    process.exit(1); // Exit the application if the license is not valid
  }
});

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes

const feedbackRoutes = require("./routes/feedback");
const locationRoutes = require("./routes/location");
const businessRoutes = require("./routes/business");
const usersRoutes = require("./routes/users");
const vendorRoutes = require("./routes/vendor");
const adminRoutes = require("./routes/admin");

const api = process.env.API_URL;

app.use(`${api}/business`, businessRoutes);
app.use(`${api}/location`, locationRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/vendor`, vendorRoutes);

//Database
mongoose
  .connect("mongodb://127.0.0.1:27017/onroad", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add this line
    dbName: "onroad",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});
