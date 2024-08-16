import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <Container>
        <div className="text-center mt-5">
          <p className="fs-1 fw-bold text-success">
            Payment Successfully Processed
          </p>
          <Link className="btn btn-primary" to="/">
            Back to Shopping
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Success;
