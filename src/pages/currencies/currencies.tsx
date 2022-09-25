import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Modal,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Currencies: React.FC<Props> = () => {
  const [show, setShow] = useState(false);

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
            <span className="fs-6 text-theme">Currencies</span>

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
              <b className="fs-3">Rates</b>

              <Row className="mt-5">
                <Col md={{ span: 8, offset: 4 }}>
                  <Row className="text-center">
                    <Col xs={3} className="fw-bold fs-5">
                      USD
                    </Col>
                    <Col xs={3} className="fw-bold fs-5">
                      EUR
                    </Col>
                    <Col xs={3} className="fw-bold fs-5">
                      GBP
                    </Col>
                    <Col xs={3} className="fw-bold fs-5">
                      ZAR
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={4} className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <svg
                      width="38"
                      height="27"
                      viewBox="0 0 38 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.705882"
                        y="0.705882"
                        width="36.5882"
                        height="25.5882"
                        rx="4.94118"
                        fill="white"
                        stroke="#F5F5F5"
                        stroke-width="1.41176"
                      />
                      <mask
                        id="mask0_258_1774"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="38"
                        height="27"
                      >
                        <rect
                          x="0.705882"
                          y="0.705882"
                          width="36.5882"
                          height="25.5882"
                          rx="4.94118"
                          fill="white"
                          stroke="white"
                          stroke-width="1.41176"
                        />
                      </mask>
                      <g mask="url(#mask0_258_1774)">
                        <rect
                          x="25.334"
                          width="12.6667"
                          height="27"
                          fill="#189B62"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 27H12.6667V0H0V27Z"
                          fill="#189B62"
                        />
                      </g>
                    </svg>
                    <span className="ms-3">NIGERIA (NGN)</span>
                  </div>
                </Col>
                <Col md={8}>
                  <Row className="bg-white py-3 text-center rate_card">
                    <Col xs={3} className="fs-6">
                      610
                    </Col>
                    <Col xs={3} className="fs-6">
                      620
                    </Col>
                    <Col xs={3} className="fs-6">
                      740
                    </Col>
                    <Col xs={3} className="fs-6">
                      25
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4} className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <svg
                      width="38"
                      height="27"
                      viewBox="0 0 38 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="38" height="27" rx="4" fill="white" />
                      <mask
                        id="mask0_258_1798"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="38"
                        height="27"
                      >
                        <rect width="38" height="27" rx="4" fill="white" />
                      </mask>
                      <g mask="url(#mask0_258_1798)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 9H38V0H0V9Z"
                          fill="#E71F37"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 27H38V18H0V27Z"
                          fill="#118B56"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 18H38V9H0V18Z"
                          fill="#FDD64C"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.0006 15.6759L16.3416 17.5907L17.3506 14.4834L14.6982 12.5596L17.9809 12.5539L19.0006 9.45013L20.0204 12.5539L23.303 12.5596L20.6506 14.4834L21.6597 17.5907L19.0006 15.6759Z"
                          fill="#262626"
                        />
                      </g>
                    </svg>

                    <span className="ms-3">GHANA (GHS)</span>
                  </div>
                </Col>
                <Col md={8}>
                  <Row className="bg-white py-3 text-center rate_card">
                    <Col xs={3} className="fs-6">
                      9
                    </Col>
                    <Col xs={3} className="fs-6">
                      9
                    </Col>
                    <Col xs={3} className="fs-6">
                      10
                    </Col>
                    <Col xs={3} className="fs-6">
                      0.47
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4} className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <svg
                      width="38"
                      height="27"
                      viewBox="0 0 38 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="38" height="27" rx="4" fill="white" />
                      <mask
                        id="mask0_259_1817"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="38"
                        height="27"
                      >
                        <rect width="38" height="27" rx="4" fill="white" />
                      </mask>
                      <g mask="url(#mask0_259_1817)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 7.2H38V0H0V7.2Z"
                          fill="#262626"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 27H38V19.8H0V27Z"
                          fill="#018301"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 19.8H38V7.19997H0V19.8Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 18H38V9.00003H0V18Z"
                          fill="#DC0808"
                        />
                        <ellipse
                          cx="19.0004"
                          cy="13.5"
                          rx="4.52381"
                          ry="9"
                          fill="#BC0000"
                        />
                        <mask
                          id="mask1_259_1817"
                          maskUnits="userSpaceOnUse"
                          x="14"
                          y="4"
                          width="10"
                          height="19"
                        >
                          <ellipse
                            cx="19.0004"
                            cy="13.5"
                            rx="4.52381"
                            ry="9"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask1_259_1817)">
                          <ellipse
                            cx="11.7621"
                            cy="13.4999"
                            rx="4.52381"
                            ry="9.9"
                            fill="#262626"
                          />
                          <ellipse
                            cx="26.2387"
                            cy="13.4999"
                            rx="4.52381"
                            ry="9.9"
                            fill="#262626"
                          />
                          <g filter="url(#filter0_d_259_1817)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M19.9052 7.19991C19.9052 9.18293 19.5023 10.7915 19.0044 10.7999C19.5023 10.8062 19.9052 12.0126 19.9052 13.4999C19.9052 14.991 19.5002 16.1999 19.0005 16.1999C18.5008 16.1999 18.0957 14.991 18.0957 13.4999C18.0957 12.0126 18.4987 10.8062 18.9965 10.7999C18.4987 10.7915 18.0957 9.18293 18.0957 7.19991C18.0957 5.21169 18.5008 3.59991 19.0005 3.59991C19.5002 3.59991 19.9052 5.21169 19.9052 7.19991ZM19.0005 16.1999C19.5002 16.1999 19.9052 17.8116 19.9052 19.7999C19.9052 21.7881 19.5002 23.3999 19.0005 23.3999C18.5008 23.3999 18.0957 21.7881 18.0957 19.7999C18.0957 17.8116 18.5008 16.1999 19.0005 16.1999Z"
                              fill="url(#paint0_linear_259_1817)"
                            />
                          </g>
                        </g>
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_259_1817"
                          x="18.0957"
                          y="3.59991"
                          width="1.80957"
                          height="21.7999"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_259_1817"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_259_1817"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_259_1817"
                          x1="18.0957"
                          y1="3.59991"
                          x2="18.0957"
                          y2="23.3999"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#F0F0F0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span className="ms-3">KENYA (KSH)</span>
                  </div>
                </Col>
                <Col md={8}>
                  <Row className="bg-white py-3 text-center rate_card">
                    <Col xs={3} className="fs-6">
                      119
                    </Col>
                    <Col xs={3} className="fs-6">
                      120
                    </Col>
                    <Col xs={3} className="fs-6">
                      140
                    </Col>
                    <Col xs={3} className="fs-6">
                      7
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4} className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <svg
                      width="38"
                      height="27"
                      viewBox="0 0 38 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="38" height="27" rx="4" fill="#06A86E" />
                      <mask
                        id="mask0_259_1833"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="38"
                        height="27"
                      >
                        <rect width="38" height="27" rx="4" fill="white" />
                      </mask>
                      <g mask="url(#mask0_259_1833)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 3.60004L12.6667 13.5L0 23.4V3.60004Z"
                          fill="#FFBF2E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M-1.80957 4.04999L10.4047 13.5L-1.80957 22.95V4.04999Z"
                          fill="#262626"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.2858 10.8L3.61914 0H38.0001V10.8H16.2858Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.738 9L5.88086 0H37.9999V9H16.738Z"
                          fill="#F44E46"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.61914 27H38.0001V16.2H16.2858L3.61914 27Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.88086 27H37.9999V18H16.738L5.88086 27Z"
                          fill="#072CB4"
                        />
                      </g>
                    </svg>

                    <span className="ms-3">SOUTH AFRICA (ZAR)</span>
                  </div>
                </Col>
                <Col md={8}>
                  <Row className="bg-white py-3 text-center rate_card">
                    <Col xs={3} className="fs-6">
                      17
                    </Col>
                    <Col xs={3} className="fs-6">
                      18
                    </Col>
                    <Col xs={3} className="fs-6">
                      21
                    </Col>
                    <Col xs={3} className="fs-6">
                      -
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col md={4} className="d-flex align-items-center">
                  <div
                    className="d-grid me-3 cursor-pointer"
                    style={{
                      width: 40,
                      height: 40,
                      background: "#263238",
                      borderRadius: "10px",
                      placeContent: "center",
                    }}
                    onClick={() => setShow(true)}
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
                  Add Country
                </Col>
              </Row>
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
              <b className="fs-6">Add Country</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Country Name</b>
                </Form.Label>
                <Form.Control type="text" className="form_inputs mb-3 w-100" />
                <Form.Label>
                  <b>Select Flag</b>
                </Form.Label>
                <InputGroup className="country_group form_inputs d-flex align-items-center w-100">
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white border-0 h-0"
                  >
                    🇳🇬
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Country"
                    aria-describedby="basic-addon1"
                    className="border-0 h-0"
                  />
                  <InputGroup.Text
                    id="basic-addon2"
                    className="bg-white border-0 h-0"
                  >
                    <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
                  </InputGroup.Text>
                </InputGroup>
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
