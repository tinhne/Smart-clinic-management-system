const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

// Define the route for getting the medication sales report
router.get('/medication-sales-report', authenticate, authorize(['admin']), medicationController.getMedicationSalesReport);

module.exports = router;