import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <>
      <Container>
        <div className="text-center mt-5">
          <p className="fs-1 fw-bold text-danger">Payment has been Canceled</p>
          <Link className="btn btn-success" to="/">
            Continue Shopping
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Cancel;
