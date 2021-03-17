const express = require('express');
const router = express.Router();

// MIDDLEWARE
const CHECK_AUTHORIZATION = require('../middlewares/check_authorization')


// List Products
const LISTPRODUCTS = require('../api_functions/products/list_products')
router.get('/products',CHECK_AUTHORIZATION,LISTPRODUCTS.list_products)

// List Transactions
const LISTTRANSACTIONS = require('../api_functions/transactions/transactions')
router.get('/transactions',CHECK_AUTHORIZATION,LISTTRANSACTIONS.list_of_transactions)

// List Plans
const LISTPLANS = require("../api_functions/plans/list_plans");
router.get('/subscription_plans',CHECK_AUTHORIZATION,LISTPLANS.list_of_subscriptions)

// List Subscribers
const LISTSUBSCRIBER = require('../api_functions/subscribers/subscribers');
router.get('/subscribers',CHECK_AUTHORIZATION,LISTSUBSCRIBER.list_of_subscribers)

// Specific Subscriber 
const SUBSCRIBER = require('../api_functions/subscribers/subscriber')
router.get('/subscriber/:email',CHECK_AUTHORIZATION,SUBSCRIBER.subscriber)

// Coupons
const LISTCOUPONS = require('../api_functions/coupons/list_of_coupons');
router.get('/coupons',CHECK_AUTHORIZATION,LISTCOUPONS.list_coupons)

module.exports = router;