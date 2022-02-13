const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    //-1 returned if not found
    corsOptions = { origin: true }; //whitelisted and allow this origin
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors(); //returns middleware to allow cors header w/ wildcard as value, allowing all origins
exports.corsWithOptions = cors(corsOptionsDelegate); //allows cors per corsOptionsDelegate
