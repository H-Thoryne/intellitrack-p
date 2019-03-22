require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");

// Import routes
const users = require("./routes/api/users");
const assets = require("./routes/api/assets");
const locations = require("./routes/api/locations");
const projects = require("./routes/api/projects");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to db
const mongooseOptions = { useNewUrlParser: true };
mongoose
  .connect(keys.mongoURI, mongooseOptions)
  .then(() => console.log("MongoDB is connected!"))
  .catch(e => console.log(e));

//Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Test server
app.get("/api", (req, res) => {
  res.json({ message: "Server works!" });
});

//Routes
app.use("/api/users", users);
app.use("/api/assets", assets);
app.use("/api/locations", locations);
app.use("/api/projects", projects);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
