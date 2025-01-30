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

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationSelect,
    errors: null,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Process Add Classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  
  const regResult = await invModel.addClassification(classification_name)
  
  if (regResult) {
    req.flash(
      "notice",
      `The ${classification_name} classification was successfully added.`
    )
    let nav = await utilities.getNav()
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, adding the classification failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Process Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { 
    inv_make, 
    inv_model, 
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id 
  } = req.body

  const regResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (regResult) {
    req.flash(
      "notice",
      `The ${inv_make} ${inv_model} was successfully added.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, adding the vehicle failed.")
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}

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