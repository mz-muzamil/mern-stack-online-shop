import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTocart } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const notify = () =>
    toast.success(`Product "${product.title}" added to cart!`);

  const handleAddToCart = (item) => {
    dispatch(addTocart(item));
    notify();
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  return (
    <Container>
      <Row>
        {loading ? (
          <>
            <Col xs={12} md={9} sm={9}>
              <Skeleton height={20} />
              <Card className="p-4">
                <Row>
                  <Col xs={12} md={4} sm={4}>
                    <Skeleton height={300} />
                  </Col>
                  <Col xs={12} md={8} sm={8}>
                    <Skeleton height={20} />
                    <Skeleton count={10} height={10} />
                    <Skeleton height={40} width={100} />
                  </Col>
                </Row>
                <ToastContainer />
              </Card>
            </Col>
            <Col xs={12} md={3} sm={3}>
              <Skeleton height={20} />
              <Card className="p-4">
                <Skeleton height={20} />
                <Skeleton height={10} />
              </Card>
            </Col>
          </>
        ) : (
          <>
            <Col xxl={8} xl={8} lg={8} md={12} sm={12} className="mb-4">
              <h2>Product Detail</h2>
              <Card className="p-4">
                <Row>
                  <Col xs={12} md={4} sm={4}>
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.title}
                    />
                  </Col>
                  <Col xs={12} md={8} sm={8}>
                    <h3>{product.title}</h3>
                    <Card.Text>{product.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center gap-3">
                      <span>Quantity</span>
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          id="quantity1"
                          value="1"
                          min="1"
                          className="qty-control-number roboto-medium text-center"
                          readonly=""
                        />
                        <div className="qty-control-reduce">-</div>
                        <div className="qty-control-increase">+</div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Col>
                </Row>
                <ToastContainer />
              </Card>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
              <h3>Product Price</h3>
              <Card className="p-4">
                <Card.Text className="mb-0 fs-2 fw-bold">
                  ${product.price}
                </Card.Text>
                <p>
                  <strong>Category</strong>: {product.category}
                </p>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetail;
