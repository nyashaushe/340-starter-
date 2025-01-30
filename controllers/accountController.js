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


/* ****************************************
*  Deliver registration view
* *************************************** */
accCont.buildRegister = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
accCont.registerAccount= async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

module.exports = accCont

