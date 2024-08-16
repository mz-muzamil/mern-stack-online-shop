import { Button, Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const totalAmount = useSelector((store) => store.cart.totalAmount);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleRemoveCartItem = (item) => {
    dispatch(removeItem(item));
  };

  const paymentCheckout = async () => {
    setIsProcessing(true);
    const stripe = await loadStripe(
      "pk_test_51Po1XSP9KX5dgx6UXqN6eCINivZ8UFPDfpgA2OIUBNt8IEd8sgFQgb3k1DraptBUkWRtRuN1emfxaasWNhDjVPYF00o0G57iWZ"
    );
    if (!stripe) {
      console.error("Stripe failed to load.");
      setIsProcessing(false);
      return;
    }

    const body = {
      products: cartItems,
    };

    try {
      const response = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe checkout session.");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={12} sm={12}>
            {cartItems.length > 0 ? (
              <>
                <h2 className="d-flex justify-content-between align-items-center mb-4 fw-bold">
                  <span>Shopping Cart </span>
                  <Button
                    variant="link"
                    className="p-0 fw-bold text-black"
                    onClick={() => handleClearCart()}
                  >
                    Clear Cart
                  </Button>
                </h2>
                <Row>
                  <Col xxl={8} xl={8} lg={8} md={12} sm={12} className="mb-3">
                    <div className="border border-bottom-0">
                      <Table responsive className="mb-0">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center" colSpan={2}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((singleCartItem) => {
                            return (
                              <tr key={singleCartItem.id}>
                                <td>
                                  <img
                                    src={singleCartItem.image}
                                    alt="cart item"
                                    style={{ width: 60, height: 60 }}
                                  />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {singleCartItem.title}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  ${singleCartItem.price}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <div className="qty-control position-relative">
                                    <input
                                      type="number"
                                      name="quantity"
                                      id="quantity1"
                                      value={singleCartItem.quantity}
                                      min="1"
                                      className="qty-control-number roboto-medium text-center"
                                      readonly=""
                                    />
                                    <div className="qty-control-reduce">-</div>
                                    <div className="qty-control-increase">
                                      +
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className="text-center"
                                  style={{
                                    verticalAlign: "middle",
                                  }}
                                >
                                  ${singleCartItem.total_price}{" "}
                                </td>
                                <td
                                  className="text-center"
                                  style={{
                                    verticalAlign: "middle",
                                    width: "40px",
                                  }}
                                >
                                  <span
                                    onClick={() =>
                                      handleRemoveCartItem(singleCartItem)
                                    }
                                    className="bg-black text-white rounded"
                                    style={{
                                      display: "inline-block",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "25px",
                                      height: "25px",
                                      lineHeight: "22px",
                                    }}
                                  >
                                    x
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
                    <Card className="p-4 rounded-0">
                      <h2 className="d-flex justify-content-between align-items-center fw-bold">
                        Cart Total
                      </h2>
                      <table>
                        <tbody>
                          <tr>
                            <th className="pb-2">Subtotal</th>
                            <td className="text-end">${totalAmount}</td>
                          </tr>
                          <tr>
                            <th className="pb-2">Shipping</th>
                            <td className="text-end">Free</td>
                          </tr>
                          <tr className="border-top">
                            <th className="pt-2 border-bottom-0">Total</th>
                            <td className="text-end border-bottom-0">
                              ${totalAmount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        onClick={() => paymentCheckout()}
                        disabled={isProcessing}
                        className="mt-4 btn-lg"
                      >
                        {isProcessing ? "Processing..." : "Proceed to Checkout"}
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <div className="text-center mt-5">
                  <p className="fs-1 fw-bold">Cart is empty!</p>
                  <Link to="/">Back to Shop</Link>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
