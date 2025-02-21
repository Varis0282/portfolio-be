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
app.use(require('./Routes/portfolioRoutes'));
app.use(cors({
  origin: '*'
}));
// deployment config
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
  });
}

const get = async () => {
  const result = await fetch('https://varisrajak.onrender.com/')
  // console.log(result);
}

setInterval(() => {
  get();
}, 590000);

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
