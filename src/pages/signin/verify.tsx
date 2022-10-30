import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import "react-phone-number-input/style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { validateToken } from "../../services/auth";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Verify: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState<string>("");

  const cookies = new Cookies();

  const search = useLocation().search;
  const email: any = new URLSearchParams(search).get("email");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await validateToken(passcode, email);
    console.log(response);
    if (response?.status === 200) {
      cookies.set("jwt", response.data.access_token, { path: "/" });
      toast.success(response.data.data);
      navigate("/overview");
    } else {
      toast.error(response);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center w-100 vh-100 body-bg position-relative"
    >
      <svg
        width="505"
        height="542"
        viewBox="0 0 505 542"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-1"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M733.48 -60.0636C878.093 62.7752 739.438 323.838 581.809 509.409C493.454 613.425 413.559 433.854 332.5 365C193.637 247.045 -109.654 228.823 41.7079 50.6307C241.585 -184.676 550.107 -215.826 733.48 -60.0636Z"
          fill="url(#paint0_linear_50_19)"
          fillOpacity="0.6"
        />
        <defs>
          <linearGradient
            id="paint0_linear_50_19"
            x1="656.313"
            y1="-125.611"
            x2="170.904"
            y2="593.816"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D1D1E9" />
            <stop offset="1" stopColor="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="331"
        height="589"
        viewBox="0 0 331 589"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-120.766 588.371C-320.009 600.807 -401.479 365.215 -414.098 163.046C-421.171 49.7251 -266.72 46.2394 -155.04 39.2686C36.2806 27.3269 317.915 -77.5319 330.033 116.599C346.034 372.953 131.877 572.602 -120.766 588.371Z"
          fill="url(#paint0_linear_50_20)"
          fillOpacity="0.3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_50_20"
            x1="-14.4496"
            y1="581.735"
            x2="-122.545"
            y2="-133.817"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D1D1E9" />
            <stop offset="1" stopColor="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      <b
        className="fs-3 paymit-logo cursor-pointer"
        onClick={() => navigate("/")}
      >
        Paymit
      </b>
      <Form className="signup_form d-flex align-items-center flex-column bg-white p-4">
        <div className="text-center mb-4">
          <b className="fs-5">Enter Passcode</b>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="fw-bold">Passcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Passcode"
            className="form_inputs mb-4"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            autoComplete="off"
          />

          <button className="btn btn_theme w-100 mb-4" onClick={handleSubmit}>
            Continue
          </button>
        </Form.Group>
      </Form>
    </Container>
  );
};
