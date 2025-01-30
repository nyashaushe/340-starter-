//imports express and creates a new router object to handle the routes for the account controller and utility functions   
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


// Route to build account view 
// This route will call the buildAccount function from the accountController when a get request is made to the /account path.
router.get("/account", utilities.handleErrors(accountController.buildAccount));

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to register a new account verify that (.registerAccount function is correct)
//router.post('/register', utilities.handleErrors(accountController.registerAccount)) 

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )



// export the router object to be used in the main server.js file
module.exports = router;
