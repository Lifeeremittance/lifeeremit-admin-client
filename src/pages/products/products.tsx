import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Modal,
  Card,
  Form,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Products: React.FC<Props> = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

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
      <Dropdown.Item eventKey="1">Edit OEM</Dropdown.Item>
      <Dropdown.Item eventKey="2" className="text-theme">
        Edit Rate
      </Dropdown.Item>
    </Dropdown.Menu>
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
            <span className="fs-6 text-theme">Products</span>

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
            <Container fluid>
              <b className="fs-3">Service Providers</b>

              <div className="grid-4">
                <div className="grid-item" id="1">
                  <Dropdown className="dropdown-absolute">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                      split
                    >
                      <div className="d-flex align-items-center justify-content-center pencil_icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.0396041 16.3069L0 20.7822C0 21.0198 0.0792082 21.297 0.277228 21.4554C0.475248 21.6139 0.712871 21.7327 0.950495 21.7327L5.42574 21.6931C5.66337 21.6931 5.90099 21.5743 6.09901 21.4158L21.4653 6.0495C21.8218 5.69307 21.8218 5.05941 21.4653 4.70297L17.0297 0.267327C16.6733 -0.0891089 16.0396 -0.0891089 15.6832 0.267327L12.5941 3.35644L0.316832 15.6337C0.118812 15.8317 0.0396041 16.0693 0.0396041 16.3069ZM19.4455 5.37624L17.703 7.11881L14.6139 4.0297L16.3564 2.28713L19.4455 5.37624ZM1.94059 16.703L13.2673 5.37624L16.3564 8.46535L5.0297 19.7921H1.94059V16.703Z"
                            fill="#263238"
                          />
                        </svg>
                      </div>
                    </Dropdown.Toggle>
                    {menu}
                  </Dropdown>

                  <div
                    className="providers_list d-flex align-items-center justify-content-center bg-white"
                    onClick={() => navigate("/products/1")}
                  >
                    <img
                      src="https://download.logo.wine/logo/Sage_Group/Sage_Group-Logo.wine.png"
                      alt=""
                      width="116px"
                      height="75px"
                    />
                  </div>
                </div>
                <div className="grid-item" id="2">
                  <Dropdown className="dropdown-absolute">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                      split
                    >
                      <div className="d-flex align-items-center justify-content-center pencil_icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.0396041 16.3069L0 20.7822C0 21.0198 0.0792082 21.297 0.277228 21.4554C0.475248 21.6139 0.712871 21.7327 0.950495 21.7327L5.42574 21.6931C5.66337 21.6931 5.90099 21.5743 6.09901 21.4158L21.4653 6.0495C21.8218 5.69307 21.8218 5.05941 21.4653 4.70297L17.0297 0.267327C16.6733 -0.0891089 16.0396 -0.0891089 15.6832 0.267327L12.5941 3.35644L0.316832 15.6337C0.118812 15.8317 0.0396041 16.0693 0.0396041 16.3069ZM19.4455 5.37624L17.703 7.11881L14.6139 4.0297L16.3564 2.28713L19.4455 5.37624ZM1.94059 16.703L13.2673 5.37624L16.3564 8.46535L5.0297 19.7921H1.94059V16.703Z"
                            fill="#263238"
                          />
                        </svg>
                      </div>
                    </Dropdown.Toggle>
                    {menu}
                  </Dropdown>
                  <div
                    className="providers_list d-flex align-items-center justify-content-center bg-white"
                    onClick={() => navigate("/products/2")}
                  >
                    <img
                      src="https://logos-world.net/wp-content/uploads/2022/02/SAP-Symbol.png"
                      alt=""
                      width="116px"
                      height="45px"
                    />
                  </div>
                </div>
                <div className="grid-item" id="3">
                  <Dropdown className="dropdown-absolute">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                      split
                    >
                      <div className="d-flex align-items-center justify-content-center pencil_icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.0396041 16.3069L0 20.7822C0 21.0198 0.0792082 21.297 0.277228 21.4554C0.475248 21.6139 0.712871 21.7327 0.950495 21.7327L5.42574 21.6931C5.66337 21.6931 5.90099 21.5743 6.09901 21.4158L21.4653 6.0495C21.8218 5.69307 21.8218 5.05941 21.4653 4.70297L17.0297 0.267327C16.6733 -0.0891089 16.0396 -0.0891089 15.6832 0.267327L12.5941 3.35644L0.316832 15.6337C0.118812 15.8317 0.0396041 16.0693 0.0396041 16.3069ZM19.4455 5.37624L17.703 7.11881L14.6139 4.0297L16.3564 2.28713L19.4455 5.37624ZM1.94059 16.703L13.2673 5.37624L16.3564 8.46535L5.0297 19.7921H1.94059V16.703Z"
                            fill="#263238"
                          />
                        </svg>
                      </div>
                    </Dropdown.Toggle>
                    {menu}
                  </Dropdown>
                  <div
                    className="providers_list d-flex align-items-center justify-content-center bg-white"
                    onClick={() => navigate("/products/3")}
                  >
                    <img
                      src="https://cdn.vox-cdn.com/thumbor/VSSwGPlTwiV0AY5zL9Afu7KGpno=/0x28:640x388/1600x900/cdn.vox-cdn.com/assets/1311169/mslogo.jpg"
                      alt=""
                      width="136px"
                      height="85px"
                    />
                  </div>
                </div>
                <div className="grid-item" id="4">
                  <Dropdown className="dropdown-absolute">
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                      split
                    >
                      <div className="d-flex align-items-center justify-content-center pencil_icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.0396041 16.3069L0 20.7822C0 21.0198 0.0792082 21.297 0.277228 21.4554C0.475248 21.6139 0.712871 21.7327 0.950495 21.7327L5.42574 21.6931C5.66337 21.6931 5.90099 21.5743 6.09901 21.4158L21.4653 6.0495C21.8218 5.69307 21.8218 5.05941 21.4653 4.70297L17.0297 0.267327C16.6733 -0.0891089 16.0396 -0.0891089 15.6832 0.267327L12.5941 3.35644L0.316832 15.6337C0.118812 15.8317 0.0396041 16.0693 0.0396041 16.3069ZM19.4455 5.37624L17.703 7.11881L14.6139 4.0297L16.3564 2.28713L19.4455 5.37624ZM1.94059 16.703L13.2673 5.37624L16.3564 8.46535L5.0297 19.7921H1.94059V16.703Z"
                            fill="#263238"
                          />
                        </svg>
                      </div>
                    </Dropdown.Toggle>
                    {menu}
                  </Dropdown>
                  <div
                    className="providers_list d-flex align-items-center justify-content-center bg-white"
                    onClick={() => navigate("/products/4")}
                  >
                    <img
                      src="https://1000logos.net/wp-content/uploads/2021/04/Oracle-logo.png"
                      alt=""
                      width="116px"
                      height="75px"
                    />
                  </div>
                </div>
                <div
                  className="grid-item providers_list d-flex align-items-center justify-content-center bg-white flex-column text-theme"
                  id="5"
                  onClick={() => setShow(true)}
                >
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.2915 17.9583H23.0415V2.70834C23.0415 2.03425 22.7737 1.38776 22.2971 0.911109C21.8204 0.434454 21.1739 0.166672 20.4998 0.166672C19.8257 0.166672 19.1793 0.434454 18.7026 0.911109C18.226 1.38776 17.9582 2.03425 17.9582 2.70834V17.9583H2.70817C2.03408 17.9583 1.3876 18.2261 0.910941 18.7028C0.434286 19.1794 0.166504 19.8259 0.166504 20.5C0.166504 21.1741 0.434286 21.8206 0.910941 22.2972C1.3876 22.7739 2.03408 23.0417 2.70817 23.0417H17.9582V38.2917C17.9582 38.9658 18.226 39.6123 18.7026 40.0889C19.1793 40.5656 19.8257 40.8333 20.4998 40.8333C21.1739 40.8333 21.8204 40.5656 22.2971 40.0889C22.7737 39.6123 23.0415 38.9658 23.0415 38.2917V23.0417H38.2915C38.9656 23.0417 39.6121 22.7739 40.0887 22.2972C40.5654 21.8206 40.8332 21.1741 40.8332 20.5C40.8332 19.8259 40.5654 19.1794 40.0887 18.7028C39.6121 18.2261 38.9656 17.9583 38.2915 17.9583Z"
                      fill="#6246EA"
                    />
                  </svg>
                  <span className="mt-3">Add Provider</span>
                </div>
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
                  <b>OEM</b>
                </Form.Label>
                <Form.Control type="text" className="form_inputs mb-3 w-100" />
                <Form.Label>
                  <b>OEM Logo</b>
                </Form.Label>
                <div className="d-flex align-items-center justify-content-center to_upload">
                  <span className="d-flex flex-column align-items-center">
                    <svg
                      width="50"
                      height="34"
                      viewBox="0 0 50 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.3125 12.5833C38.8958 5.39583 32.5833 0 25 0C18.9792 0 13.75 3.41667 11.1458 8.41667C4.875 9.08333 0 14.3958 0 20.8333C0 27.7292 5.60417 33.3333 12.5 33.3333H39.5833C45.3333 33.3333 50 28.6667 50 22.9167C50 17.4167 45.7292 12.9583 40.3125 12.5833ZM39.5833 29.1667H12.5C7.89583 29.1667 4.16667 25.4375 4.16667 20.8333C4.16667 16.5625 7.35417 13 11.5833 12.5625L13.8125 12.3333L14.8542 10.3542C16.8333 6.54167 20.7083 4.16667 25 4.16667C30.4583 4.16667 35.1667 8.04167 36.2292 13.3958L36.8542 16.5208L40.0417 16.75C43.2917 16.9583 45.8333 19.6875 45.8333 22.9167C45.8333 26.3542 43.0208 29.1667 39.5833 29.1667ZM16.6667 18.75H21.9792V25H28.0208V18.75H33.3333L25 10.4167L16.6667 18.75Z"
                        fill="#C7C7CC"
                      />
                    </svg>
                    <span className="text-small">Upload Logo</span>
                  </span>
                </div>
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setShow(false)}
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
