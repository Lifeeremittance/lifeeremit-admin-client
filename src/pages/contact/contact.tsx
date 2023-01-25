import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/logo.png";
import phoneImage from "../../assets/img/phone.png";
// import locationImage from "../../assets/img/location.png";
import emailImage from "../../assets/img/email.png";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Contact: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className="vw-100 vh-100 body-bg y-scroll px-0 position-relative">
      <div className="vh-10 d-none d-md-flex align-items-center px-5">
        <Col md={4}>
          {/* <b className="fs-4">Lifee Remit</b> */}
          <img src={logoImage} alt="logo" className="logo img-fluid" />
        </Col>
        <Col
          md={4}
          className="justify-content-evenly align-items-center d-flex"
        >
          <a className="m-0 text-muted no-underline" href="/">
            Home
          </a>
          <a className="m-0 text-muted no-underline" href="/about">
            About Us
          </a>
          <a className="m-0 text-theme no-underline" href="/contact">
            Contact
          </a>
        </Col>
        <Col md={4} className="text-right">
          <button
            className="btn btn_theme w-auto px-4 rounded me-3"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className="btn btn_theme w-auto px-4 rounded"
            onClick={() => navigate("/signin")}
          >
            Log In
          </button>
        </Col>
      </div>

      <div className="py-5 px-4 px-md-5" id="contact">
        <Row>
          <Col md={6}>
            <h5
              className="text-theme mb-3"
              style={{ letterSpacing: "0.415em" }}
            >
              CONTACT US
            </h5>
            <h1
              style={{ letterSpacing: "0.125em", fontSize: 60 }}
              className="text-capitalize f-md-28"
            >
              Let's talk, Contact us now
            </h1>
            <h5 className="my-5">Fill out the form or use the details below</h5>

            <div className="d-flex align-items-center mb-3">
              <div className="icon-container d-flex align-items-center justify-content-center me-3">
                <img src={emailImage} alt="email" width={40} height={40} />
              </div>

              <div>
                <h6 className="fw-bold">Email</h6>
                <span>info@lifeeremit.com</span>
              </div>
            </div>

            {/* <div className="d-flex align-items-center mb-3">
              <div className="icon-container d-flex align-items-center justify-content-center me-3">
                <img src={locationImage} alt="email" width={40} height={40} />
              </div>

              <div>
                <h6 className="fw-bold">Address</h6>
                <span>Lagos, Nigeria</span>
              </div>
            </div> */}

            <div className="d-flex align-items-center mb-3">
              <div className="icon-container d-flex align-items-center justify-content-center me-3">
                <img src={phoneImage} alt="email" width={40} height={40} />
              </div>

              <div>
                <h6 className="fw-bold">Phone</h6>
                <span>+234 808 018 7158</span>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div
              className="bg-theme2 h-100 p-4 p-md-5 mt-3"
              style={{
                borderRadius: "10px",
              }}
            >
              <h2>Write your message</h2>

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-5 w-100"
                placeholder="Name"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="Company Name"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="Industry Name"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="email"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="Email"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="Phone Number"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="Reason for contact"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                type="text"
                className="form_inputs border-0 mt-4 w-100"
                placeholder="How can we help"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <Form.Control
                as="textarea"
                rows={5}
                className="form_inputs border-0 mt-4 w-100 h-auto"
                placeholder="Details"
                style={{
                  boxShadow: "0px 1px 20px rgba(0, 0, 0, 0.06)",
                  borderRadius: "10px",
                }}
                // onChange={(e) => setLicenseKey(e.target.value)}
              />

              <input
                type="submit"
                className="btn btn_theme mt-4 w-100 px-5"
                value="Submit"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
