const express = require('express');
const app = express();
require('dotenv').config();
const dbconfig = require('./dbconfig');
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

require('./Models/user-model');
require('./Models/portfolio-model');

app.use(express.json());
// ✅ Move CORS Middleware Before Any Routes
const allowedOrigins = ["http://localhost:3000", "https://varisrajak.netlify.app/"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api", require("./Routes/portfolioRoutes"));

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
