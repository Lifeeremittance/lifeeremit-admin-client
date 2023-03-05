/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Modal, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProviderById } from "../../services/providers";
import { getCountries } from "../../services/country";
import { getCurrencies } from "../../services/currency";
import { editRate, getRates } from "../../services/rates";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Provider: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [provider, setProvider] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [currencies, setCurrencies] = useState<any>([]);
  const [rates, setRates] = useState<any>([]);

  const [show, setShow] = useState(false);
  const [country, setCountry] = useState<any>({});
  const [values, setValues] = useState<any>([]);

  const [reRender, setReRender] = useState<string | undefined>(undefined);

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

                getRates(id)
                  .then((rates) => {
                    setRates(rates);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reRender]);

  const handleRateChange = (e: any, currency: string, country: string) => {
    e.preventDefault();
    // check whether an object with the same provider, currency and country already exists in values
    const index = values.findIndex(
      (value: any) =>
        value.provider === provider._id &&
        value.currency === currency &&
        value.country === country
    );

    if (index === -1)
      setValues([
        ...values,
        {
          provider: provider._id,
          country,
          currency,
          value: e.target.value,
        },
      ]);
    else {
      const newValues = [...values];
      newValues[index].value = e.target.value;
      setValues(newValues);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = values.map((value: any) => {
      if (value) {
        editRate(value)
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    });

    // generate a new reRender value to trigger useEffect
    setReRender(Math.random().toString(36).substring(7));
    console.log(response);
    setShow(false);
  };

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title={provider.name} />

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
                <Col md={3}>
                  <img src={provider.logo} alt="" width="116px" height="40px" />
                </Col>
                <Col md={9}>
                  <div className="text-center d-flex align-items-center h-100 justify-content-around">
                    {currencies.length > 0
                      ? currencies.map((currency: any, index: any) => (
                          <div className="fw-bold fs-5" key={index}>
                            {currency.currencyCode}
                          </div>
                        ))
                      : null}
                  </div>
                </Col>
              </Row>

              {countries.length > 0
                ? countries.map((country: any, index: any) => (
                    <Row className="mt-4" key={index}>
                      <Col md={3} className="d-flex align-items-center">
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
                      <Col md={9} className="position-relative">
                        <div
                          className="d-flex align-items-center justify-content-center pencil_icon position-absolute cursor-pointer"
                          style={{
                            height: "28px",
                            width: "28px",
                            right: "0px",
                            top: "-10px",
                          }}
                          onClick={() => {
                            setShow(true);
                            setCountry(country);
                          }}
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
                        <div className="bg-white py-3 text-center rate_card d-flex align-items-center justify-content-around">
                          {currencies.length > 0
                            ? currencies.map((currency: any) => {
                                return (
                                  <div className="fs-6" key={currency._id}>
                                    {/* get the value from rates which aligns with currency and country */}
                                    {rates.length > 0
                                      ? // loop through rates and get the value which aligns with currency and country and "-" if not found
                                        rates.map((rate: any) => {
                                          if (
                                            rate.currency?._id !== currency._id
                                          )
                                            return;
                                          if (rate.country?._id !== country._id)
                                            return;
                                          if (
                                            rate.currency?._id ===
                                              currency._id &&
                                            rate.country?._id === country._id
                                          )
                                            return rate.value;
                                        })
                                      : "-"}
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </Col>
                    </Row>
                  ))
                : null}
            </Container>
          </div>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="border-0"
      >
        <Card>
          <Card.Body className="p-5">
            <Row className="mt-5">
              <Col md={3}>
                <img src={provider.logo} alt="" width="116px" height="40px" />
              </Col>
              <Col md={9}>
                <div className="text-center d-flex align-items-center h-100 justify-content-around">
                  {currencies.length > 0
                    ? currencies.map((currency: any, index: any) => (
                        <div className="fw-bold fs-5" key={index}>
                          {currency.currencyCode}
                        </div>
                      ))
                    : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={3} className="d-flex align-items-center">
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
              <Col md={9} className="position-relative">
                <Form>
                  <Form.Group controlId="formForPayment">
                    <div className="bg-white py-3 text-center rate_card d-flex align-items-center justify-content-around">
                      {currencies.length > 0
                        ? currencies.map((currency: any, index: any) => {
                            // find the rate which aligns with currency and country
                            let rate = rates.find(
                              (rate: any) =>
                                rate.currency?._id === currency?._id &&
                                rate.country?._id === country?._id
                            );
                            const value = rate ? rate.value : "";
                            return (
                              <div className="fs-6 mx-2" key={index}>
                                <Form.Control
                                  type="number"
                                  className="w-100 border-0 border-bottom border-radius-0"
                                  defaultValue={value}
                                  onChange={(e) =>
                                    handleRateChange(
                                      e,
                                      currency?._id,
                                      country?._id
                                    )
                                  }
                                />
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <div className="text-right">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5 mt-5"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
