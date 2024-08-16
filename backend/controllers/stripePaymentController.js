const stripePaymentController = (req, res) => {
  try {
    res.status(200).send({
      success: 'ok',
      result: "test data",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { stripePaymentController };
