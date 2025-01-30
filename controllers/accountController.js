// defining the account controller in the controllers directory and requiring it in server.js allows for the separation of concerns. 
// The account controller is responsible for handling all account-related routes and logic. 
// This separation makes the codebase more organized and easier to maintain. 

// account model
const accountModel = require('../models/account-model')
const utilities = require('../utilities/') // utility functions

const accCont = {}

/* ****************************************
*  Deliver login view
* *************************************** */
accCont.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/login", {
    title: "Login",
    nav,
    errors: null
  })
}

module.exports = accCont
