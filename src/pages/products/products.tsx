import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createProduct, getProducts } from "../../services/products";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Products: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState<any>([]);
  //   const [providerId, setProviderId] = useState("");

  const { id, name } = useParams();

  useEffect(() => {
    getProducts(id)
      .then((res) => {
        setProducts(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await createProduct(productName, id);
    if (response.status === 201) {
      setProducts([...products, response.data.data]);
      toast.success("Product created successfully");
      setShow(false);
      setProductName("");
    } else {
      toast.error(response);
    }
  };

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title={name} />

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <Container fluid>
              <div className="fs-3 mb-5 fw-bold text-capitalize">
                {name} Products
              </div>

              {products.length > 0
                ? products.map(
                    (product: any, index: React.Key | null | undefined) => (
                      <div
                        className="bg-white p-3 rate_card w-75 text-capitalize mb-3"
                        key={index}
                      >
                        {product.name}
                      </div>
                    )
                  )
                : null}

              <div
                className="d-flex align-items-center mt-5"
                onClick={async () => setShow(true)}
              >
                <div
                  className="d-grid cursor-pointer"
                  style={{
                    width: 40,
                    height: 40,
                    background: "#263238",
                    borderRadius: "10px",
                    placeContent: "center",
                  }}
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6875 9.1875H11.8125V1.3125C11.8125 0.964403 11.6742 0.630564 11.4281 0.384423C11.1819 0.138281 10.8481 0 10.5 0C10.1519 0 9.81806 0.138281 9.57192 0.384423C9.32578 0.630564 9.1875 0.964403 9.1875 1.3125V9.1875H1.3125C0.964403 9.1875 0.630564 9.32578 0.384423 9.57192C0.138281 9.81806 0 10.1519 0 10.5C0 10.8481 0.138281 11.1819 0.384423 11.4281C0.630564 11.6742 0.964403 11.8125 1.3125 11.8125H9.1875V19.6875C9.1875 20.0356 9.32578 20.3694 9.57192 20.6156C9.81806 20.8617 10.1519 21 10.5 21C10.8481 21 11.1819 20.8617 11.4281 20.6156C11.6742 20.3694 11.8125 20.0356 11.8125 19.6875V11.8125H19.6875C20.0356 11.8125 20.3694 11.6742 20.6156 11.4281C20.8617 11.1819 21 10.8481 21 10.5C21 10.1519 20.8617 9.81806 20.6156 9.57192C20.3694 9.32578 20.0356 9.1875 19.6875 9.1875Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h5 className="mb-0 ms-3">Add New Product</h5>
              </div>
            </Container>
          </div>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="small-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center mb-3">
              <b className="fs-6">Add Service Provider</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Product</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleSubmit}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
