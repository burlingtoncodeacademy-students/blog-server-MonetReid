// Access Express & it's methods
const express = require("express");

// simple variable to call on express
const app = express();

// PORT Key for server w/in localhost.
const PORT = 4005;


//--------------------- Required File Paths------------------------------


// Importing in the auth controller routes for the apps  to use/ reference
//* CONTROLLERS
const auth = require("./controller/auth.controller");
const routes= require("./controller/routes.controller");

//* MIDDLEWARE
// Call app var, then use() method
app.use(express.static(`${__dirname}/public`));
console.log("pathways:", __dirname);


// parses the body(of the req) from our browser so it can display(see) the response
app.use(express.urlencoded());

//* ROUTES
app.use("/routes", routes);
app.use("/auth", auth);

// Require in the index.js from helpers(./helpers) w/ object destructuring
//const {logTime} = require("./helpers");

// Create a variable to require in and have CORS dependency accessible 
// import npm i cors---- DONE
const cors = require("cors");

//------------------App Functionality / What it does next------------------
// To affirm it's running
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
// Telling the express app to first use this middleware function

//app.use(logTime);








app.use(express.json());