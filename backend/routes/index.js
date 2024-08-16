const express = require("express");
const { stripePaymentController } = require("../controllers/stripePaymentController");

const router = express.Router();

router.post('/checkout', stripePaymentController)

module.exports = router;
