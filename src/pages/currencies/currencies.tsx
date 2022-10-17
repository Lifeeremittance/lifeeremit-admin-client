import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Modal,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { createCurrency, getCurrencies } from "../../services/currency";
import { createCountry } from "../../services/country";
import { editCharge, getCharges } from "../../services/charges";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Currencies: React.FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);

  const [image, setImage] = useState<any>({
    preview: "",
    raw: "",
  });

  const [currencyName, setCurrencyName] = useState<string>("");
  const [currencyCode, setCurrencyCode] = useState<string>("");

  const [countryName, setCountryName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const [serviceCharge, setServiceCharge] = useState<string>("");
  const [productInterest, setProductInterest] = useState<string>("");

  const [currencies, setCurrencies] = useState<any>([]);

  const [selected, setSelected] = useState<string>("currencies");

  useEffect(() => {
    getCurrencies()
      .then((res) => {
        setCurrencies(res);

        getCharges()
          .then((res) => {
            if (res.length > 0) {
              setServiceCharge(res[0].serviceCharge);
              setProductInterest(res[0].productInterest);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const firebaseConfig = {
    // ...
    storageBucket: "gs://lifeeremit-e7281.appspot.com",
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const triggerFileInput = () => {
    const hold = document?.getElementById("upload-button");
    hold?.click();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const storageRef = ref(storage, currencyName);
    const uploadTask = uploadBytesResumable(storageRef, image.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await createCurrency(currencyName, currencyCode, photoUrl);
    console.log(response);
    if (response.status === 201) {
      setCurrencies([...currencies, response.data.data]);
      toast.success("Currency created successfully");
      setShow(false);
      setCurrencyName("");
      setCurrencyCode("");
      setImage({
        preview: "",
        raw: "",
      });
    } else {
      toast.error(response);
    }
  };

  const handleSubmit2 = async (e: any) => {
    e.preventDefault();

    const storageRef = ref(storage, countryName);
    const uploadTask = uploadBytesResumable(storageRef, image.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await createCountry(countryName, countryCode, photoUrl);
    console.log(response);
    if (response.status === 201) {
      toast.success("Country created successfully");
      setShow2(false);
      setCountryName("");
      setCountryCode("");
      setImage({
        preview: "",
        raw: "",
      });
    } else {
      toast.error(response);
    }
  };

  const handleChargeSubmit = async (e: any) => {
    e.preventDefault();

    const response = await editCharge(serviceCharge, productInterest);
    console.log(response);
    if (response.status === 200) toast.success("Charges updated successfully");
    else toast.error(response);
  };

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title="Currencies" />

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <Container fluid className="special-height">
              {/* <b className="fs-3">Rates</b> */}

              <div className="weird-nav">
                <span
                  className={`weird-nav-item cursor-pointer ${
                    selected === "currencies" ? "selected_nav" : ""
                  }`}
                  onClick={() => setSelected("currencies")}
                >
                  Currencies
                </span>
                <span
                  className={`weird-nav-item cursor-pointer ${
                    selected === "charges" ? "selected_nav" : ""
                  }`}
                  onClick={() => setSelected("charges")}
                >
                  Charges
                </span>
              </div>

              {selected === "currencies" ? (
                <>
                  <div className="grid-4">
                    {currencies.length > 0
                      ? currencies.map(
                          (
                            currency: { currencyImage: string | undefined },
                            index: React.Key | null | undefined
                          ) => (
                            <div className="currency_card" key={index}>
                              <img
                                src={currency.currencyImage}
                                className="w-100"
                                alt="money"
                                height="150px"
                                style={{ borderRadius: "16.35px" }}
                              />
                            </div>
                          )
                        )
                      : null}
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-5">
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
                      Add Currency
                    </div>

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
                        onClick={() => setShow2(true)}
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
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-between flex-column special-height2">
                  <Form>
                    <Form.Label className="fw-bold">Service Charge</Form.Label>
                    <InputGroup
                      style={{ height: "54px", width: "328px" }}
                      className="mb-5"
                    >
                      <Form.Control
                        type="number"
                        aria-label="Service Charge"
                        aria-describedby="basic-addon1"
                        className="bg-white border_left_country fw-bold ps-4"
                        value={serviceCharge}
                        onChange={(e) => setServiceCharge(e.target.value)}
                      />

                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-start-0 border_right_country bg-white pe-4"
                      >
                        $
                      </InputGroup.Text>
                    </InputGroup>

                    <Form.Label className="fw-bold">
                      Product Interest
                    </Form.Label>
                    <InputGroup style={{ height: "54px", width: "328px" }}>
                      <Form.Control
                        type="number"
                        aria-label="Product Interest"
                        aria-describedby="basic-addon1"
                        className="bg-white border_left_country fw-bold ps-4"
                        value={productInterest}
                        onChange={(e) => setProductInterest(e.target.value)}
                      />

                      <InputGroup.Text
                        id="basic-addon1"
                        className="border-start-0 border_right_country bg-white pe-4"
                      >
                        %
                      </InputGroup.Text>
                    </InputGroup>
                  </Form>

                  <div className="text-right mt-5">
                    <button
                      className="btn btn_theme btn_theme2 w-50"
                      onClick={handleChargeSubmit}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
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
              <b className="fs-5">Add Currency</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Currency Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={currencyName}
                  onChange={(e) => setCurrencyName(e.target.value)}
                />
                <Form.Label>
                  <b>Currency Short Code</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                />
                <Form.Label>
                  <b>Input Image</b>
                </Form.Label>
                <div
                  className="d-flex align-items-center justify-content-center to_upload cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="d-flex flex-column align-items-center w-100">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        height="98px"
                        width="98px"
                        alt="profile"
                        onClick={triggerFileInput}
                      />
                    ) : (
                      <>
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
                        <span className="text-small">
                          Upload Currency Image
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <input
                  type="file"
                  id="upload-button"
                  className="d-none"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
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
              <b className="fs-5">Add Country</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Country Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                />
                <Form.Label>
                  <b>Country Short Code</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <Form.Label>
                  <b>Input Flag</b>
                </Form.Label>
                <div
                  className="d-flex align-items-center justify-content-center to_upload cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="d-flex flex-column align-items-center w-100">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        height="98px"
                        width="98px"
                        alt="profile"
                        onClick={triggerFileInput}
                      />
                    ) : (
                      <>
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
                        <span className="text-small">Upload Flag</span>
                      </>
                    )}
                  </span>
                </div>
                <input
                  type="file"
                  id="upload-button"
                  className="d-none"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
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
    </Container>
  );
};
