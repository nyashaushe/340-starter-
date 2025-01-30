// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../middleware/validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildByVehicleId));

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// Route to process add classification
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Route to process add inventory
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// trigger route
router.get("/triggerError", utilities.handleErrors(invController.triggerError));

// Classification routes
// router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
// router.post("/add-classification", 
//   validate.classificationRules(),
//   validate.checkClassificationData,
//   utilities.handleErrors(invController.addClassification))

// Inventory routes  
// router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
// router.post("/add-inventory",
//   validate.inventoryRules(),
//   validate.checkInventoryData, 
//   utilities.handleErrors(invController.addInventory))

module.exports = router