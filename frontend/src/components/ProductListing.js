import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setProducts } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import EmptyCardSkeleton from "./EmptyCardSkeleton";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((store) => store.products.items);
  const [loading, setLoading] = useState(true);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <Container>
        <h1 className="mb-3">Products</h1>
        <Row className="gy-4">
          {loading ? (
            <>
              <EmptyCardSkeleton count={6} />
            </>
          ) : (
            products.map((singleProd, index) => {
              return (
                <Col xs={12} xxl={4} xl={6} lg={4} md={6} sm={12} key={index}>
                  <Card
                    className="h-100 position-relative"
                    onClick={() => handleViewDetails(singleProd.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      className="object-fit-contain rounded-0"
                      style={{ height: 250 }}
                      src={singleProd.image}
                    />
                    <Card.Body>
                      <Card.Title>{singleProd.title}</Card.Title>
                    </Card.Body>
                    <div className="d-flex justify-content-between align-items-center bottom-0 w-100 left-0 p-3">
                      <Button variant="primary">View Detail</Button>
                      <Card.Text className="mb-0 fs-2 fw-bold">
                        ${singleProd.price}
                      </Card.Text>
                    </div>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
};

export default ProductListing;
