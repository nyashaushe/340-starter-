const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */

invCont.buildByVehicleId = async function (req, res, next) {
  const vehicleId = req.params.vehicleId;
  const data = await invModel.getVehicleById(vehicleId);
  const detail = await utilities.buildVehicleDetail(data);
  let nav = await utilities.getNav();
  const vehicleName = `${data[0].inv_make} ${data[0].inv_model}`;
  res.render("./inventory/vehicle-detail", {
    title: vehicleName + " vehicle detail",
    nav,
    detail,
    errors: null
  });
};

// Trigger route error and its function
invCont.triggerError = async function (req, res, next) {
  console.log("Causing an error...");
  try {
      let aNumber = 1 / 0; // Simulated error
      throw new Error("This is an intentional error.");
  } catch (error) {
      next(error); // Pass the error to the next middleware
  }
};

module.exports = invCont