import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Modal,
  Card,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import {
  createCurrency,
  getCurrencies,
  updateCurrency,
} from "../../services/currency";
import {
  createCountry,
  getCountries,
  updateCountry,
} from "../../services/country";
import { editCharge, getCharges } from "../../services/charges";
import { storage } from "../../services/firebase";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Currencies: React.FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);
  const [show4, setShow4] = useState<boolean>(false);
  const [show5, setShow5] = useState<boolean>(false);
  const [show6, setShow6] = useState<boolean>(false);

  const [image, setImage] = useState<any>({
    preview: "",
    raw: "",
  });
  const [image2, setImage2] = useState<any>({
    preview: "",
    raw: "",
  });
  const [image3, setImage3] = useState<any>({
    preview: "",
    raw: "",
  });

  const [currencyName, setCurrencyName] = useState<string>("");
  const [currencyCode, setCurrencyCode] = useState<string>("");

  const [countryName, setCountryName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const [serviceCharge, setServiceCharge] = useState<string>("");
  const [productInterest, setProductInterest] = useState<string>("");
  const [dollarRate, setDollarRate] = useState<string>("");

  const [currencyName2, setCurrencyName2] = useState<string>("");
  const [countryName2, setCountryName2] = useState<string>("");
  const [currencyCode2, setCurrencyCode2] = useState<string>("");
  const [countryCode2, setCountryCode2] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<any>({});

  const [currencies, setCurrencies] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);

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
              setDollarRate(res[0].dollarRate);

              getCountries()
                .then((res) => {
                  setCountries(res);
                })
                .catch((err) => {
                  console.log(err);
                });
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
        onClick={() => setShow5(true)}
      >
        Edit Country
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="3"
        className="text-danger"
        onClick={() => setShow6(true)}
      >
        Delete Country
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  const menu2 = (
    <Dropdown.Menu className="fs-6 border-0 drop-down-menu">
      <Dropdown.Item
        eventKey="1"
        className="text-theme"
        onClick={() => setShow3(true)}
      >
        Edit Currency
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="3"
        className="text-danger"
        onClick={() => setShow4(true)}
      >
        Delete Currency
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChange2 = (e: any) => {
    if (e.target.files.length) {
      setImage2({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChange3 = (e: any) => {
    if (e.target.files.length) {
      setImage3({
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
      setCountries([...countries, response.data.data]);
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

    const response = await editCharge(
      serviceCharge,
      productInterest,
      dollarRate
    );
    console.log(response);
    if (response.status === 200) toast.success("Charges updated successfully");
    else toast.error(response);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const storageRef = ref(storage, currencyName2);
    const uploadTask = uploadBytesResumable(storageRef, image2.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await updateCurrency(selectedCurrency._id, {
      currencyName: currencyName2,
      currencyCode: currencyCode2,
      currencyImage: photoUrl,
    });
    console.log(response);
    if (response.status === 200) {
      const newCurrencies = currencies.map((currency: any) => {
        const { currencyName, currencyImage, ...rest } = currency;
        if (currency._id === selectedCurrency._id)
          return {
            ...rest,
            currencyName: currencyName2,
            currencyCode: currencyCode2,
            currencyImage: photoUrl,
          };
        else return currency;
      });
      setCurrencies(newCurrencies);

      toast.success("Currency edited successfully");
      setShow3(false);
      setSelectedCurrency({});
      setImage2({
        preview: "",
        raw: "",
      });
    } else toast.error(response);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    const response = await updateCurrency(selectedCurrency._id, {
      is_active: false,
    });
    console.log(response);
    if (response.status === 200) {
      const newCurrencies = currencies.filter((currency: any) => {
        return currency._id !== selectedCurrency._id;
      });
      setCurrencies(newCurrencies);

      toast.success("Currency deleted successfully");
      setShow4(false);
    } else toast.error(response);
  };

  const handleEdit2 = async (e: any) => {
    e.preventDefault();
    const storageRef = ref(storage, countryName2);
    const uploadTask = uploadBytesResumable(storageRef, image3.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await updateCountry(selectedCountry._id, {
      countryName: countryName2,
      countryCode: countryCode2,
      countryFlag: photoUrl,
    });
    console.log(response);
    if (response.status === 200) {
      const newCountries = countries.map((country: any) => {
        const { countryName, countryImage, ...rest } = country;
        if (country._id === selectedCountry._id)
          return {
            ...rest,
            countryName: countryName2,
            countryCode: countryCode2,
            countryFlag: photoUrl,
          };
        else return country;
      });
      setCountries(newCountries);

      toast.success("Country edited successfully");
      setShow5(false);
      setSelectedCountry({});
      setImage3({
        preview: "",
        raw: "",
      });
    } else toast.error(response);
  };

  const handleDelete2 = async (e: any) => {
    e.preventDefault();

    const response = await updateCountry(selectedCountry._id, {
      is_active: false,
    });
    console.log(response);
    if (response.status === 200) {
      const newCountries = countries.filter((country: any) => {
        return country._id !== selectedCountry._id;
      });
      setCountries(newCountries);

      toast.success("Country deleted successfully");
      setShow6(false);
    } else toast.error(response);
  };

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title="Currencies" />

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <Container fluid className="special-height">
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
                    selected === "countries" ? "selected_nav" : ""
                  }`}
                  onClick={() => setSelected("countries")}
                >
                  Countries
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
                  <div className="grid-4 mb-4">
                    {currencies.length > 0
                      ? currencies.map(
                          (
                            currency: any,
                            index: React.Key | null | undefined
                          ) => (
                            <div
                              className="currency_card position-relative"
                              key={index}
                            >
                              <img
                                src={currency.currencyImage}
                                className="w-100"
                                alt="money"
                                height="150px"
                                style={{ borderRadius: "16.35px" }}
                              />
                              <div
                                className="d-flex align-items-center justify-content-center pencil_icon position-absolute cursor-pointer"
                                style={{
                                  height: "28px",
                                  width: "28px",
                                  right: "-10px",
                                  top: "-10px",
                                }}
                                onClick={() => setSelectedCurrency(currency)}
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
                                  {menu2}
                                </Dropdown>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>

                  <div className="d-flex align-items-center">
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
                </>
              ) : selected === "charges" ? (
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

                    <Form.Label className="fw-bold">Dollar Rate</Form.Label>
                    <InputGroup
                      style={{ height: "54px", width: "328px" }}
                      className="mb-5"
                    >
                      <Form.Control
                        type="number"
                        aria-label="Dollar rate"
                        aria-describedby="basic-addon1"
                        className="bg-white border_left_country fw-bold ps-4"
                        value={dollarRate}
                        onChange={(e) => setDollarRate(e.target.value)}
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
              ) : (
                <>
                  {countries.length > 0
                    ? countries.map(
                        (country: any, index: React.Key | null | undefined) => (
                          <div className="position-relative w-75" key={index}>
                            <div
                              className="d-flex align-items-center justify-content-center pencil_icon position-absolute cursor-pointer"
                              style={{
                                height: "28px",
                                width: "28px",
                                right: "-10px",
                                top: "-10px",
                              }}
                              onClick={() => setSelectedCountry(country)}
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
                              <img
                                src={country.countryFlag}
                                alt=""
                                height="27"
                                width="38"
                                className="me-3"
                              />
                              {country.countryName}
                            </div>
                          </div>
                        )
                      )
                    : null}

                  <div className="d-flex align-items-center mt-5">
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
                </>
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

      <Modal
        show={show3}
        onHide={() => setShow3(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="small-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center mb-3">
              <b className="fs-5">Edit Currency</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Currency Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={selectedCurrency.currencyName}
                  onChange={(e) => setCurrencyName2(e.target.value)}
                />
                <Form.Label>
                  <b>Currency Short Code</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={selectedCurrency.currencyCode}
                  onChange={(e) => setCurrencyCode2(e.target.value)}
                />
                <Form.Label>
                  <b>Currency Code</b>
                </Form.Label>
                <div
                  className="d-flex align-items-center justify-content-center to_upload cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="d-flex flex-column align-items-center w-100">
                    {image2.preview ? (
                      <img
                        src={image2.preview}
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
                        <span className="text-small">Upload Logo</span>
                      </>
                    )}
                  </span>
                </div>
                <input
                  type="file"
                  id="upload-button"
                  className="d-none"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange2}
                />
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleEdit}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={show4}
        onHide={() => setShow4(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-5">
                Are you sure you want to delete this Currency?
              </b>
            </div>
            <hr className="mt-2 mb-3" />

            <span className="fs-6">
              Note: Deleting this Currency is an action that cannot be undone
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

      <Modal
        show={show5}
        onHide={() => setShow5(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="small-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center mb-3">
              <b className="fs-5">Edit Country</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>Country Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={selectedCountry.countryName}
                  onChange={(e) => setCountryName2(e.target.value)}
                />
                <Form.Label>
                  <b>Country Code</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={selectedCountry.countryCode}
                  onChange={(e) => setCountryCode2(e.target.value)}
                />
                <Form.Label>
                  <b>Country Flag</b>
                </Form.Label>
                <div
                  className="d-flex align-items-center justify-content-center to_upload cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <span className="d-flex flex-column align-items-center w-100">
                    {image3.preview ? (
                      <img
                        src={image3.preview}
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
                  onChange={handleChange3}
                />
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleEdit2}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={show6}
        onHide={() => setShow6(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-5">
                Are you sure you want to delete this Country?
              </b>
            </div>
            <hr className="mt-2 mb-3" />

            <span className="fs-6">
              Note: Deleting this Country is an action that cannot be undone
            </span>

            <div className="text-right mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={handleDelete2}
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
