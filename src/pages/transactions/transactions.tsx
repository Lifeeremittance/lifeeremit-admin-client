import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  InputGroup,
  Form,
  Table,
  Modal,
  Card,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getOrders } from "../../services/order";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Transactions: React.FC<Props> = () => {
  const [detailsModal, setDetailsModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const [tempKeyModal, setTempKeyModal] = useState(false);
  const [licenseKeyModal, setLicenseKeyModal] = useState(false);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const CustomToggle2 = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
      <span
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
        className="cursor-pointer d-flex align-items-center"
      >
        {props.children}
      </span>
    )
  );

  const menu = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu">
      <Dropdown.Item
        eventKey="1"
        className="text-success"
        onClick={() => setReceiptModal(true)}
      >
        View Receipt
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">Contact OEM</Dropdown.Item>
      <Dropdown.Item eventKey="3" onClick={() => setDetailsModal(true)}>
        View Details
      </Dropdown.Item>
      <Dropdown.Item eventKey="4">View Invoice</Dropdown.Item>
      <Dropdown.Item
        eventKey="5"
        className="text-theme"
        onClick={() => setTempKeyModal(true)}
      >
        Temp Key
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="6"
        className="text-theme"
        onClick={() => setLicenseKeyModal(true)}
      >
        License Key
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  const statusMenu = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu right-dropdown">
      <Dropdown.Item eventKey="1">Paid</Dropdown.Item>
      <Dropdown.Item eventKey="2">Awaiting key</Dropdown.Item>
      <Dropdown.Item eventKey="3">Temp key</Dropdown.Item>
      <Dropdown.Item eventKey="4">Licensed</Dropdown.Item>
    </Dropdown.Menu>
  );

  const providerMenu = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu right-dropdown">
      <Dropdown.Item eventKey="1">Sage</Dropdown.Item>
      <Dropdown.Item eventKey="2">Oracle</Dropdown.Item>
      <Dropdown.Item eventKey="3">SAP</Dropdown.Item>
      <Dropdown.Item eventKey="4">Microsoft</Dropdown.Item>
    </Dropdown.Menu>
  );

  const productMenu = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu right-dropdown">
      <Dropdown.Item eventKey="1">Sage Business Cloud</Dropdown.Item>
      <Dropdown.Item eventKey="2">Data and Analytics</Dropdown.Item>
      <Dropdown.Item eventKey="3">Sage X3</Dropdown.Item>
      <Dropdown.Item eventKey="4">Sage 200 Evolution</Dropdown.Item>
      <Dropdown.Item eventKey="4">Sage 300 Cloud</Dropdown.Item>
    </Dropdown.Menu>
  );

  const menu2 = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu">
      <Dropdown.Item
        eventKey="1"
        className="d-flex align-items-center justify-content-between"
      >
        Date <i className="fa fa-angle-right" aria-hidden="true"></i>
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">
        <Dropdown autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside dropdown-custom-components"
            as={CustomToggle2}
            split
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              Provider <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </Dropdown.Toggle>
          {providerMenu}
        </Dropdown>
      </Dropdown.Item>
      <Dropdown.Item eventKey="3">
        <Dropdown autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside dropdown-custom-components"
            as={CustomToggle2}
            split
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              Product <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </Dropdown.Toggle>
          {productMenu}
        </Dropdown>
      </Dropdown.Item>
      <Dropdown.Item eventKey="4">
        <Dropdown autoClose="outside">
          <Dropdown.Toggle
            id="dropdown-autoclose-outside dropdown-custom-components"
            as={CustomToggle2}
            split
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              Status <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </Dropdown.Toggle>
          {statusMenu}
        </Dropdown>
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  const licensed = (
    <div className="body-bg text-theme py-2 px-3 status_border_radius w-fit-content">
      Licensed
    </div>
  );

  const tempKey = (
    <div className="grey-bg text-dark py-2 px-3 status_border_radius w-fit-content">
      Temp Key
    </div>
  );

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Col md={4} lg={3} className="p-0 vh-100">
          <div className="sidebar_menu bg-white text-center border shadow-sm d-flex justify-content-between flex-column">
            <div>
              <h4 className="fw-bold pt-5">Paymit</h4>

              <ul className="nav flex-column pt-4 px-3 justify-content-between side-specific-height text-left">
                <li className="nav-item mb-4">
                  <NavLink
                    to="/overview"
                    className="nav-link text-grey"
                    aria-current="page"
                  >
                    <i
                      className={`fa fa-th-large icli fs-5 align-middle me-4`}
                    ></i>
                    <span className="align-middle fs-6">Overview</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-4">
                  <NavLink
                    to="/transactions"
                    className="nav-link text-grey"
                    aria-current="page"
                  >
                    <i
                      className={`fa fa-bar-chart icli fs-5 align-middle me-4`}
                    ></i>
                    <span className="align-middle fs-6">Transactions</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-4">
                  <NavLink
                    to="/customers"
                    className="nav-link text-grey"
                    aria-current="page"
                  >
                    <i
                      className={`fa fa-users icli fs-5 align-middle me-4`}
                    ></i>
                    <span className="align-middle fs-6">Customers</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-4">
                  <NavLink
                    to="/products"
                    className="nav-link text-grey"
                    aria-current="page"
                  >
                    <i
                      className={`fa fa-briefcase icli fs-5 align-middle me-4`}
                    ></i>
                    <span className="align-middle fs-6">Products</span>
                  </NavLink>
                </li>
                <li className="nav-item mb-4">
                  <NavLink
                    to="/currencies"
                    className="nav-link text-grey"
                    aria-current="page"
                  >
                    <i
                      className={`fa fa-money icli fs-5 align-middle me-4`}
                    ></i>
                    <span className="align-middle fs-6">Currencies</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="p-3 border-top border-bottom mb-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.207 11.2935L18.207 8.29346C18.1144 8.19966 18.0041 8.1251 17.8825 8.07407C17.761 8.02305 17.6305 7.99657 17.4987 7.99616C17.3668 7.99575 17.2362 8.02141 17.1143 8.07167C16.9925 8.12194 16.8817 8.19581 16.7885 8.28903C16.6953 8.38226 16.6214 8.493 16.5712 8.61488C16.5209 8.73676 16.4952 8.86738 16.4957 8.99921C16.4961 9.13105 16.5226 9.2615 16.5736 9.38306C16.6246 9.50462 16.6992 9.61489 16.793 9.70752L18.086 11.0005H12.5C12.2348 11.0005 11.9804 11.1059 11.7929 11.2934C11.6054 11.481 11.5 11.7353 11.5 12.0005C11.5 12.2657 11.6054 12.5201 11.7929 12.7076C11.9804 12.8952 12.2348 13.0005 12.5 13.0005H18.0859L16.7929 14.2935C16.6991 14.3862 16.6246 14.4964 16.5736 14.618C16.5225 14.7396 16.496 14.87 16.4956 15.0018C16.4952 15.1337 16.5209 15.2643 16.5711 15.3862C16.6214 15.5081 16.6953 15.6188 16.7885 15.712C16.8817 15.8052 16.9925 15.8791 17.1144 15.9294C17.2362 15.9796 17.3669 16.0053 17.4987 16.0049C17.6305 16.0044 17.761 15.978 17.8825 15.9269C18.0041 15.8759 18.1144 15.8013 18.207 15.7075L21.207 12.7075C21.2999 12.6147 21.3736 12.5045 21.4238 12.3832C21.4741 12.2618 21.5 12.1318 21.5 12.0005C21.5 11.8692 21.4741 11.7391 21.4238 11.6178C21.3736 11.4965 21.2999 11.3863 21.207 11.2935Z"
                  fill="#6563FF"
                />
                <path
                  d="M12.5 13.0005C12.2348 13.0005 11.9804 12.8951 11.7929 12.7076C11.6054 12.5201 11.5 12.2657 11.5 12.0005C11.5 11.7353 11.6054 11.4809 11.7929 11.2934C11.9804 11.1058 12.2348 11.0005 12.5 11.0005H16.5V5C16.4991 4.20462 16.1828 3.44206 15.6204 2.87964C15.0579 2.31722 14.2954 2.00087 13.5 2H5.5C4.70462 2.00087 3.94206 2.31722 3.37964 2.87964C2.81722 3.44206 2.50087 4.20462 2.5 5V19C2.50087 19.7954 2.81722 20.5579 3.37964 21.1204C3.94206 21.6828 4.70462 21.9991 5.5 22H13.5C14.2954 21.9991 15.0579 21.6828 15.6204 21.1204C16.1828 20.5579 16.4991 19.7954 16.5 19V13.0005H12.5Z"
                  fill="#A2A1FF"
                />
              </svg>
              <span className="ms-3">Logout</span>
            </div>
          </div>
        </Col>
        <Col md={8} lg={9} className="p-0 bg-white">
          <header className="d-flex align-items-center justify-content-between vh-10 body-bg p-3 border-bottom">
            <div></div>
            <span className="fs-6 text-theme">Transactions</span>

            <div className="d-flex align-items-center">
              <i className="fa fa-bell fs-3 me-3" aria-hidden="true"></i>
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                  split
                >
                  <div className="d-flex align-items-center">
                    <div className="header_profile_img me-2 d-flex align-items-center justify-content-center text-white fs-4">
                      A
                    </div>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">
                    <div className="d-flex align-items-center">
                      <i
                        className="fw-bold fa fa-user me-2"
                        aria-hidden="true"
                      ></i>
                      Edit Profile
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    <div className="d-flex align-items-center">
                      <i
                        className="fw-bold fa fa-sign-out me-2"
                        aria-hidden="true"
                      ></i>
                      <span className="text-red">Logout</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </header>

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <InputGroup className="search_group mb-4">
              <InputGroup.Text
                id="basic-addon1"
                className="bg-white border_left_search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7372 14.4753L12.7159 11.463C13.6907 10.2211 14.2196 8.68756 14.2176 7.10882C14.2176 5.70283 13.8007 4.32841 13.0196 3.15937C12.2385 1.99033 11.1282 1.07918 9.82925 0.54113C8.53028 0.00308012 7.10094 -0.137698 5.72196 0.136597C4.34299 0.410893 3.07631 1.08794 2.08213 2.08213C1.08794 3.07631 0.410893 4.34299 0.136597 5.72196C-0.137698 7.10094 0.00308012 8.53028 0.54113 9.82925C1.07918 11.1282 1.99033 12.2385 3.15937 13.0196C4.32841 13.8007 5.70283 14.2176 7.10882 14.2176C8.68756 14.2196 10.2211 13.6907 11.463 12.7159L14.4753 15.7372C14.5579 15.8204 14.6562 15.8865 14.7645 15.9317C14.8728 15.9768 14.9889 16 15.1062 16C15.2236 16 15.3397 15.9768 15.448 15.9317C15.5563 15.8865 15.6545 15.8204 15.7372 15.7372C15.8204 15.6545 15.8865 15.5563 15.9317 15.448C15.9768 15.3397 16 15.2236 16 15.1062C16 14.9889 15.9768 14.8728 15.9317 14.7645C15.8865 14.6562 15.8204 14.5579 15.7372 14.4753ZM1.77721 7.10882C1.77721 6.05433 2.0899 5.02352 2.67575 4.14674C3.26159 3.26996 4.09428 2.58659 5.0685 2.18305C6.04273 1.77952 7.11474 1.67393 8.14897 1.87965C9.1832 2.08538 10.1332 2.59316 10.8788 3.3388C11.6245 4.08444 12.1323 5.03444 12.338 6.06868C12.5437 7.10291 12.4381 8.17492 12.0346 9.14914C11.6311 10.1234 10.9477 10.9561 10.0709 11.5419C9.19413 12.1277 8.16332 12.4404 7.10882 12.4404C5.69479 12.4404 4.33867 11.8787 3.3388 10.8788C2.33893 9.87897 1.77721 8.52285 1.77721 7.10882Z"
                    fill="#263238"
                    fillOpacity="0.5"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                aria-label="search"
                aria-describedby="basic-addon1"
                className="border-start-0"
                placeholder="Search"
              />
              <InputGroup.Text
                id="basic-addon2"
                className="bg-white border_right_search text-grey"
              >
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle
                    as={CustomToggle2}
                    id="dropdown-custom-components"
                    split
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83322 14C5.71656 14 5.59989 13.9417 5.54156 13.9417C5.36656 13.825 5.24989 13.5917 5.24989 13.4167V8.34167L0.116555 0.933333C-0.000111183 0.758333 -0.0584445 0.525 0.0582222 0.291667C0.174889 0.116667 0.349889 0 0.583222 0H13.4166C13.6499 0 13.8249 0.116667 13.9416 0.291667C14.0582 0.466667 13.9999 0.7 13.8832 0.875L8.74989 8.34167V12.25C8.74989 12.4833 8.63322 12.6583 8.39989 12.775L6.06656 13.9417C6.00822 14 5.94989 14 5.83322 14ZM1.69156 1.16667L6.29989 7.81667C6.35822 7.93333 6.41656 8.05 6.41656 8.16667V12.4833L7.58322 11.9V8.16667C7.58322 8.05 7.64156 7.93333 7.69989 7.81667L12.3082 1.16667H1.69156Z"
                        fill="#263238"
                        fill-opacity="0.6"
                      />
                    </svg>
                    <span className="px-3">Filter</span>
                    <svg
                      width="13"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6352 0.325865C12.4042 0.11715 12.0916 0 11.7658 0C11.44 0 11.1274 0.11715 10.8964 0.325865L6.46917 4.29283L2.10361 0.325865C1.87255 0.11715 1.55999 0 1.23419 0C0.908398 0 0.595839 0.11715 0.364781 0.325865C0.249195 0.430041 0.15745 0.553981 0.0948421 0.690538C0.0322336 0.827095 0 0.973565 0 1.1215C0 1.26943 0.0322336 1.4159 0.0948421 1.55246C0.15745 1.68902 0.249195 1.81296 0.364781 1.91713L5.59359 6.66853C5.70823 6.77356 5.84463 6.85693 5.99491 6.91382C6.14518 6.97071 6.30637 7 6.46917 7C6.63197 7 6.79315 6.97071 6.94343 6.91382C7.09371 6.85693 7.2301 6.77356 7.34475 6.66853L12.6352 1.91713C12.7508 1.81296 12.8425 1.68902 12.9052 1.55246C12.9678 1.4159 13 1.26943 13 1.1215C13 0.973565 12.9678 0.827095 12.9052 0.690538C12.8425 0.553981 12.7508 0.430041 12.6352 0.325865Z"
                        fill="#263238"
                        fill-opacity="0.7"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  {menu2}
                </Dropdown>
              </InputGroup.Text>
            </InputGroup>

            <Table className="text-smaller">
              <thead>
                <tr className="text-muted">
                  <th>#</th>
                  <th>COMPANY NAME</th>
                  <th>PROVIDER</th>
                  <th>PRODUCT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>Tot. Value</th>
                  <th># RATE</th>
                  <th>AMOUNT PAID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0
                  ? orders.map((order: any, index: any) => {
                      let status;
                      switch (order.status[order.status.length - 1]) {
                        case "new_order":
                          status = "New Order";
                          break;
                        case "payment_successful":
                          status = "Payment Successful";
                          break;
                        case "payment_failed":
                          status = "Payment Failed";
                          break;
                        case "awaiting_key":
                          status = "Awaiting Key";
                          break;
                        case "temp_key":
                          status = tempKey;
                          break;
                        case "licensed":
                          status = licensed;
                          break;

                        default:
                          status = "Unknown status";
                          break;
                      }

                      const d = new Date(order.created_at);
                      const date = d.toLocaleString("en-US", {
                        day: "numeric",
                        year: "numeric",
                        month: "short",
                      });

                      return (
                        <>
                          <tr className="transaction_row" key={index}>
                            <td>PM00{index + 1}</td>
                            <td>{order.company_name}</td>
                            <td>{order.provider.name}</td>
                            <td>{order.product.name}</td>
                            <td>{date}</td>
                            <td>{status}</td>
                            <td>$200</td>
                            <td>#600</td>
                            <td>
                              {order.amount ? "#" + order.amount / 100 : "-"}
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="dropdown-custom-components"
                                  split
                                >
                                  ...
                                </Dropdown.Toggle>
                                {menu}
                              </Dropdown>
                            </td>
                          </tr>
                          <br />
                        </>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal
        show={detailsModal}
        onHide={() => setDetailsModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-6">DETAILS</b>
            </div>
            <hr className="mt-2 mb-3" />

            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Company Name</span>
              </Col>
              <Col xs={6}>
                <b>Business Name Plc</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Company Address</span>
              </Col>
              <Col xs={6}>
                <b>28, ayeni street, Lagos</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Product</span>
              </Col>
              <Col xs={6}>
                <b>Sage Business Cloud</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Provider</span>
              </Col>
              <Col xs={6}>
                <b>Sage</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Date</span>
              </Col>
              <Col xs={6}>
                <b>15-08-2022</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Status</span>
              </Col>
              <Col xs={6}>
                <span className="text-success">Success</span>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Total Value</span>
              </Col>
              <Col xs={6}>
                <b>$200</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Naira Rate</span>
              </Col>
              <Col xs={6}>
                <b>#600</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Amount Paid</span>
              </Col>
              <Col xs={6}>
                <b>#120,000</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Transaction No</span>
              </Col>
              <Col xs={6}>
                <b>PM001</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Reference No</span>
              </Col>
              <Col xs={6}>
                <b>3344224354527687</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Invoice No</span>
              </Col>
              <Col xs={6}>
                <b>-</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Reason</span>
              </Col>
              <Col xs={6}>
                <b>Software license</b>
              </Col>
            </Row>

            <div className="text-center mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setDetailsModal(false)}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={receiptModal}
        onHide={() => setReceiptModal(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="receipt-modal border-0"
      >
        <Card className="details_modal_card border-0">
          <div
            className="text-center bg-theme text-white p-3"
            style={{ borderRadius: "30px 30px 0px 0px" }}
          >
            <b className="fs-5">Paymit</b>
          </div>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <b className="fs-5">Receipt</b>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 16C25.9185 16 25.6005 16.1317 25.3661 16.3661C25.1317 16.6005 25 16.9185 25 17.25V22.25C25 22.5815 24.8683 22.8995 24.6339 23.1339C24.3995 23.3683 24.0815 23.5 23.75 23.5H6.25C5.91848 23.5 5.60054 23.3683 5.36612 23.1339C5.1317 22.8995 5 22.5815 5 22.25V17.25C5 16.9185 4.8683 16.6005 4.63388 16.3661C4.39946 16.1317 4.08152 16 3.75 16C3.41848 16 3.10054 16.1317 2.86612 16.3661C2.6317 16.6005 2.5 16.9185 2.5 17.25V22.25C2.5 23.2446 2.89509 24.1984 3.59835 24.9017C4.30161 25.6049 5.25544 26 6.25 26H23.75C24.7446 26 25.6984 25.6049 26.4017 24.9017C27.1049 24.1984 27.5 23.2446 27.5 22.25V17.25C27.5 16.9185 27.3683 16.6005 27.1339 16.3661C26.8995 16.1317 26.5815 16 26.25 16ZM14.1125 18.1375C14.2314 18.2513 14.3716 18.3405 14.525 18.4C14.6746 18.4661 14.8364 18.5003 15 18.5003C15.1636 18.5003 15.3254 18.4661 15.475 18.4C15.6284 18.3405 15.7686 18.2513 15.8875 18.1375L20.8875 13.1375C21.1229 12.9021 21.2551 12.5829 21.2551 12.25C21.2551 11.9171 21.1229 11.5979 20.8875 11.3625C20.6521 11.1271 20.3329 10.9949 20 10.9949C19.6671 10.9949 19.3479 11.1271 19.1125 11.3625L16.25 14.2375V2.25C16.25 1.91848 16.1183 1.60054 15.8839 1.36612C15.6495 1.1317 15.3315 1 15 1C14.6685 1 14.3505 1.1317 14.1161 1.36612C13.8817 1.60054 13.75 1.91848 13.75 2.25V14.2375L10.8875 11.3625C10.771 11.246 10.6326 11.1535 10.4803 11.0904C10.328 11.0273 10.1648 10.9949 10 10.9949C9.83518 10.9949 9.67197 11.0273 9.51969 11.0904C9.36741 11.1535 9.22905 11.246 9.1125 11.3625C8.99595 11.479 8.9035 11.6174 8.84043 11.7697C8.77735 11.922 8.74489 12.0852 8.74489 12.25C8.74489 12.4148 8.77735 12.578 8.84043 12.7303C8.9035 12.8826 8.99595 13.021 9.1125 13.1375L14.1125 18.1375Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="dotted my-3"></div>

            <b className="text-small">15 Aug, 2022 - 15:30</b>

            <Row className="mt-3">
              <Col xs={5}>
                <span className="text-muted">Product</span>
              </Col>
              <Col xs={7}>
                <b>Sage Business Cloud</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Name</span>
              </Col>
              <Col xs={7}>
                <b>Peter Tinubu</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Temp Key</span>
              </Col>
              <Col xs={7}>
                <b>KWYZ125VSY732NA</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">License Key</span>
              </Col>
              <Col xs={7}>
                <b>KWYZ125VSY732NA</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Transaction No</span>
              </Col>
              <Col xs={7}>
                <b>PM0001</b>
              </Col>
            </Row>

            <div className="dotted my-3"></div>

            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Total Amount</span>
              </Col>
              <Col xs={7}>
                <b>127,000 NGN</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Product Value</span>
              </Col>
              <Col xs={7}>
                <b>200 USD</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Exchange Rate</span>
              </Col>
              <Col xs={7}>
                <b>1 USD = 600NGN</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Service Charge</span>
              </Col>
              <Col xs={7}>
                <b>$10</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Interest Change</span>
              </Col>
              <Col xs={7}>
                <b>%1 = 2 USD</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Reason</span>
              </Col>
              <Col xs={7}>
                <b>Software Purchase</b>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <svg
                width="145"
                height="47"
                viewBox="0 0 145 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.09766 47H0V0H5.09766V47ZM10.1953 46.9666H7.60603V0H10.1953V46.9666ZM17.8013 46.9666H15.293V0H17.8013V46.9666ZM30.505 46.9666H27.9967V0H30.505V46.9666ZM43.2087 46.9666H38.192V0H43.2087V46.9666ZM53.404 46.9666H50.8956V0H53.404V46.9666ZM58.5017 46.9666H55.9933V0H58.5017V46.9666ZM63.5993 46.9666H61.091V0H63.5993V46.9666ZM76.303 46.9666H71.2054V0H76.303V46.9666ZM89.0067 46.9666H83.909V0H89.0067V46.9666ZM99.202 46.9666H94.1043V0H99.202V46.9666ZM109.397 46.9666H104.3V0H109.397V46.9666ZM117.003 46.9666H111.906V0H117.003V46.9666ZM132.296 46.9666H124.69V0H132.296V46.9666ZM137.394 46.9666H134.805V0H137.394V46.9666ZM145 47H139.902V0H145V47Z"
                  fill="black"
                />
              </svg>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={tempKeyModal}
        onHide={() => setTempKeyModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-6">TEMP KEY</b>
            </div>
            <hr className="mt-2 mb-3" />

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>TEMPORARY KEY</b>
                </Form.Label>
                <Form.Control type="text" className="form_inputs mb-3 w-100" />
                <Form.Label>
                  <b>EXPIRY DATE</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  placeholder="DD/MM/YYYY"
                />
              </Form.Group>
            </Form>

            <div className="text-right mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setTempKeyModal(false)}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={licenseKeyModal}
        onHide={() => setLicenseKeyModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-6">LICENSE KEY</b>
            </div>
            <hr className="mt-2 mb-3" />
            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>LICENSE KEY</b>
                </Form.Label>
                <Form.Control type="text" className="form_inputs mb-3 w-100" />
                <Form.Label>
                  <b>EXPIRY DATE</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  placeholder="DD/MM/YYYY"
                />
              </Form.Group>
            </Form>

            <div className="d-flex align-items-center mt-4">
              <div
                className="d-grid me-3 cursor-pointer"
                style={{
                  width: 40,
                  height: 40,
                  background: "#263238",
                  borderRadius: "10px",
                  placeContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0759 9.58066L8.44551 15.211C6.90171 16.7548 4.44979 16.7548 2.9968 15.211C1.45299 13.6672 1.45299 11.2153 2.9968 9.76229L10.2618 2.49733C11.1699 1.68002 12.5321 1.68002 13.4402 2.49733C14.3483 3.40545 14.3483 4.85844 13.4402 5.67575L7.17415 11.9418C6.90171 12.2142 6.44765 12.2142 6.17521 11.9418C5.90278 11.6693 5.90278 11.2153 6.17521 10.9428L10.8066 6.31143C11.1699 5.94818 11.1699 5.40331 10.8066 5.04006C10.4434 4.67682 9.8985 4.67682 9.53526 5.04006L4.90385 9.76229C3.90491 10.7612 3.90491 12.305 4.90385 13.304C5.90278 14.2121 7.44658 14.2121 8.44551 13.304L14.7115 7.03793C16.3462 5.40331 16.3462 2.86058 14.7115 1.22596C13.0769 -0.408654 10.5342 -0.408654 8.89957 1.22596L1.63462 8.49092C0.544872 9.58066 0 11.0337 0 12.4866C0 15.6651 2.54273 18.117 5.72115 18.117C7.26496 18.117 8.62714 17.4813 9.71688 16.4824L15.3472 10.852C15.7105 10.4888 15.7105 9.94391 15.3472 9.58066C14.984 9.21741 14.4391 9.21741 14.0759 9.58066Z"
                    fill="white"
                  />
                </svg>
              </div>
              Attach Invoice
            </div>
            <div className="text-right mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setLicenseKeyModal(false)}
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
