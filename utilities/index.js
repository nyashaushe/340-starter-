const invModel = require('../models/inventory-model');
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next ) {
    let data = await invModel.getClassifications();
    let list = '<ul>';
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
        list += '<li>';
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            '</a>';
        list += '</li>';
    });
    list += '</ul>';
    return list;
};

module.exports = Util;


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleDetail = async function (data) {
  let drill 
  if (data.length > 0) {
    drill = '<div id="vehicle-display">';
    data.forEach((vehicle => {
      drill += `
      <div id="vehicle-image">
         <img src="${vehicle.inv_image}" alt="vehicle image">
      </div>
      <div class="vehicle-display">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)} miles</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>`
    }))

    drill += "</div>"
  } else {
    drill = '<p class="notice">Sorry, no matching vehicle could be found.</p>';
   }
  console.log(drill);
  return drill
};

/* **************************************
  * Build account view HTML
  * ************************************ */

// Util.buildlogin = async function (data) {
//   let accountDisplay;
//   if (data.length > 0) {
//     accountDisplay = '<div id="account-display">';
//     data.forEach((account) => {
//       accountDisplay += `
//       <div class="account-display">
//         <h2>${account.account_name}</h2>
//         <p><strong>Email:</strong> ${account.account_email}</p>
//         <p><strong>Address:</strong> ${account.account_address}</p>
//         <p><strong>City:</strong> ${account.account_city}</p>
//         <p><strong>State:</strong> ${account.account_state}</p>
//         <p><strong>Zip:</strong> ${account.account_zip}</p>
//       </div>`;
//     });
//     accountDisplay += '</div>';
//   } else {
//     accountDisplay = '<p class="notice">Sorry, no matching account could be found.</p>';
//   }
//   return accountDisplay;
// }



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* **************************************
* Build the classification select list
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

module.exports = Util