const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Automatically scan and add routes
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
    const route = require(path.join(routesPath, file));
    app.use("/api", route);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
