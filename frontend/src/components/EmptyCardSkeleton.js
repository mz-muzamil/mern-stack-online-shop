import React from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";

const EmptyCardSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Col xs={12} md={4} sm={6} key={index}>
          <Card className="p-0" key={index}>
            <Skeleton height={200} />
            <Card.Body>
              <div className="d-flex flex-column text-block text-hover-green">
                <div className="mb-3">
                  <h5 className="card-title text-hover-primary mb-0">
                    <Skeleton count={5} height={10} width={380} />
                  </h5>
                  <div className="card-text text-muted fs-7 mt-4 d-flex justify-content-between align-items-center bottom-0 w-100 left-0">
                    <Skeleton height={30} width={100} />
                    <Skeleton height={30} width={100} />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default EmptyCardSkeleton;
