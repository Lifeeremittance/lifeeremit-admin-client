import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Modal,
  Card,
  Form,
  Dropdown,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../../services/products";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Products: React.FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);

  const [productName, setProductName] = useState<string>("");
  const [productName2, setProductName2] = useState<string>("");
  const [editedProductName, setEditedProductName] = useState<string>("");

  const [products, setProducts] = useState<any>([]);
  const [product, setProduct] = useState<any>({});

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

  type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: any) => {};
  };

  const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
      <b
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
        className="float-right cursor-pointer weird-margin"
      >
        {props.children}
      </b>
    )
  );

  const menu = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu">
      <Dropdown.Item
        eventKey="1"
        className="text-theme"
        onClick={() => setShow2(true)}
      >
        Edit Product
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="3"
        className="text-danger"
        onClick={() => setShow3(true)}
      >
        Delete Product
      </Dropdown.Item>
    </Dropdown.Menu>
  );

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

  const handleSubmit2 = async (e: any) => {
    e.preventDefault();
    const response = await updateProduct(product._id, {
      name: productName2,
    });
    if (response.status === 200) {
      const newProducts = products.map((p: any) => {
        const { name, ...rest } = p;
        if (p._id === product._id) {
          console.log("hi");
          return {
            ...rest,
            name: productName2,
          };
        } else {
          return p;
        }
      });
      setProducts(newProducts);

      toast.success("Product edit successfully");
      setShow2(false);
      setProductName2("");
    } else {
      toast.error(response);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    const response = await updateProduct(product._id, {
      is_active: false,
    });
    console.log(response);
    if (response.status === 200) {
      const newProducts = products.filter((p: any) => {
        return p._id !== product._id;
      });
      setProducts(newProducts);

      toast.success("Provider deleted successfully");
      setShow3(false);
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
                      <div className="position-relative w-75" key={index}>
                        <div
                          className="d-flex align-items-center justify-content-center pencil_icon position-absolute cursor-pointer"
                          style={{
                            height: "28px",
                            width: "28px",
                            right: "-10px",
                            top: "-10px",
                          }}
                          onClick={() => {
                            setProduct(product);
                            setEditedProductName(product.name);
                          }}
                        >
                          <Dropdown className="position-absolute">
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="dropdown-custom-components"
                              split
                            >
                              <svg
                                width="14"
                                height="13"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.862022 9.41188L0.839844 11.918C0.839844 12.0511 0.8842 12.2063 0.995091 12.295C1.10598 12.3838 1.23905 12.4503 1.37212 12.4503L3.87826 12.4281C4.01133 12.4281 4.1444 12.3616 4.25529 12.2729L12.8604 3.66772C13.06 3.46812 13.06 3.11327 12.8604 2.91366L10.3765 0.429703C10.1769 0.230099 9.82202 0.230099 9.62242 0.429703L7.89252 2.1596L1.01727 9.03485C0.906379 9.14574 0.862022 9.27881 0.862022 9.41188ZM11.7293 3.29069L10.7535 4.26653L9.02361 2.53663L9.99945 1.56079L11.7293 3.29069ZM1.92658 9.63366L8.26955 3.29069L9.99945 5.02059L3.65648 11.3636H1.92658V9.63366Z"
                                  fill="#263238"
                                />
                              </svg>
                            </Dropdown.Toggle>
                            {menu}
                          </Dropdown>
                        </div>
                        <div
                          className="bg-white p-3 rate_card text-capitalize mb-3"
                          key={index}
                        >
                          {product.name}
                        </div>
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
              <b className="fs-6">Add Product</b>
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

      <Modal
        show={show2}
        onHide={() => setShow2(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="small-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center mb-3">
              <b className="fs-6">Edit Product</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Product</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={editedProductName}
                  onChange={(e) => setProductName2(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleSubmit2}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={show3}
        onHide={() => setShow3(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-5">
                Are you sure you want to delete this Product?
              </b>
            </div>
            <hr className="mt-2 mb-3" />

            <span className="fs-6">
              Note: Deleting this Product is an action that cannot be undone
            </span>

            <div className="text-right mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
