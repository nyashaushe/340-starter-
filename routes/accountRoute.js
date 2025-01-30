//imports express and creates a new router object to handle the routes for the account controller and utility functions   
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

// Route to build account view 
// This route will call the buildAccount function from the accountController when a get request is made to the /account path.
router.get("/account", utilities.handleErrors(accountController.buildAccount));

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// export the router object to be used in the main server.js file

module.exports = router;
