// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utility = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utility.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail  view
router.get("/detail/:vehicleId", utility.handleErrors(invController.buildByVehicleId));


// trigger route
router.get("/triggerError", utility.handleErrors(invController.triggerError));
  

module.exports = router;