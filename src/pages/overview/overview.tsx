import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Overview: React.FC<Props> = () => {
  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title="Overview" />

          <div className="body-bg vh-90 py-5 y-scroll"></div>
        </Col>
      </Row>
    </Container>
  );
};
