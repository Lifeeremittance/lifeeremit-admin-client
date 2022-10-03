import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProviderById } from "../../services/providers";
import { getCountries } from "../../services/country";
import { getCurrencies } from "../../services/currency";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Provider: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [provider, setProvider] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [currencies, setCurrencies] = useState<any>([]);

  useEffect(() => {
    getProviderById(id)
      .then((provider) => {
        setProvider(provider);

        getCountries()
          .then((countries) => {
            setCountries(countries);

            getCurrencies()
              .then((currencies) => {
                setCurrencies(currencies);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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
              <div
                className="d-flex align-items-center mt-3 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <i
                  className="fa fa-angle-left fs-4 me-2"
                  aria-hidden="true"
                ></i>
                <span className="fs-6">Back</span>
              </div>

              <Row className="mt-5">
                <Col md={4}>
                  <img src={provider.logo} alt="" width="116px" height="40px" />
                </Col>
                <Col md={8}>
                  <Row className="text-center d-flex align-items-center h-100">
                    {currencies.length > 0
                      ? currencies.map((currency: any, index: any) => (
                          <Col xs={3} className="fw-bold fs-5" key={index}>
                            {currency.currencyCode}
                          </Col>
                        ))
                      : null}
                  </Row>
                </Col>
              </Row>

              {countries.length > 0
                ? countries.map((country: any, index: any) => (
                    <Row className="mt-4" key={index}>
                      <Col md={4} className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src={country.countryFlag}
                            alt="country"
                            width="38"
                            height="27"
                          />
                          <span className="ms-3">
                            {country.countryName} ({country.countryCode})
                          </span>
                        </div>
                      </Col>
                      <Col md={8} className="position-relative">
                        <div
                          className="d-flex align-items-center justify-content-center pencil_icon position-absolute"
                          style={{
                            height: "28px",
                            width: "28px",
                            right: "-10px",
                            top: "-10px",
                          }}
                          // onClick={() => setProviderId(provider._id)}
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
                        </div>
                        <Row className="bg-white py-3 text-center rate_card">
                          <Col xs={3} className="fs-6">
                            -
                          </Col>
                          <Col xs={3} className="fs-6">
                            -
                          </Col>
                          <Col xs={3} className="fs-6">
                            -
                          </Col>
                          <Col xs={3} className="fs-6">
                            -
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))
                : null}
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
