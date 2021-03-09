const express = require('express');
const router = express.Router();

// CUSTOM CALLBACK FUNCTIONS
const DASHBOARD_PAGE = require('../administrator_functions/dashboard/dashboard_page')
const ADD_NEW_COMPANY = require('../administrator_functions/dashboard/add_new_company')
const SETTINGS_PAGE = require('../administrator_functions/settings/settings_page')
const ADD_NEW_CURRENCY = require('../administrator_functions/settings/add_new_currency')
const DELETE_CURRENCY = require('../administrator_functions/settings/delete_currency')

// MIDDLEWARE
const CHECK_USER = require('../middlewares/check_user')

// ROUTES

// DASHBOARD PAGE
router.get('/',CHECK_USER,DASHBOARD_PAGE.dashboard_page)
router.post('/add_new_company',CHECK_USER,ADD_NEW_COMPANY.add_new_company)


// SETTINGS
router.get('/settings',CHECK_USER,SETTINGS_PAGE.settings_page)
router.get('/delete_currency/:id',CHECK_USER,DELETE_CURRENCY.delete_currency)
router.post('/add_new_currency',CHECK_USER,ADD_NEW_CURRENCY.add_new_currency)

module.exports = router;