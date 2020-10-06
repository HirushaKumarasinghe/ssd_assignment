const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//import environment libraries
const { port } = require('./config/config');

//import routes
const google_drive_route = require("./app/routes");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("OAuth 2.0 back end is working"));

//use routes
app.use("/api/drive", google_drive_route);

app.listen(port, () => console.log(`server is running on port ${port}`));