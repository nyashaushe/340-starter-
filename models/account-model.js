// account model for the account collection in the database 

const pool = require("../database/")

/* ***************************
    *  Get all accounts
    * ************************** */

async function getAccounts(){
  return await pool.query("SELECT * FROM public.account ORDER BY account_name")
}

/* ***************************

    *  Get account by account_id
    * ************************** */
    
async function getAccountById(account_id) {
    try {
        const data = await pool.query(
        `SELECT * FROM public.account WHERE account_id = $1`,
        [account_id]
        )
        return data.rows
    } catch (error) {
        console.error("getAccountById error " + error);
    }
}

/* *************************** 
    *  Get account by account_name
    * ************************** */ 
    
async function getAccountByName(account_name) {
    try {
        const data = await pool.query(
        `SELECT * FROM public.account WHERE account_name = $1`,
        [account_name]
        )
        return data.rows
    } catch (error) {
        console.error("getAccountByName error " + error);
    }
}

/* ***************************
    *  Get account by account_email
    * ************************** 
*/

async function getAccountByEmail(account_email) {
    try {
        const data = await pool.query(
        `SELECT * FROM public.account WHERE account_email = $1`,
        [account_email]
        )
        return data.rows
    } catch (error) {
        console.error("getAccountByEmail error " + error);
    }
}

/* ***************************
    *  Get account by account_phone
    * ************************** 
*/

async function getAccountByPhone(account_phone) {
    try {
        const data = await pool.query(
        `SELECT * FROM public.account WHERE account_phone = $1`,
        [account_phone]
        )
        return data.rows
    } catch (error) {
        console.error("getAccountByPhone error " + error);
    }
}
    
module.exports = {
    getAccounts,
    getAccountById,
    getAccountByName,
    getAccountByEmail,
    getAccountByPhone
}


