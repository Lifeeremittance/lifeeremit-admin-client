import React, { useState } from "react";
import { Row, Col, Collapse, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { subscribeToNewsletter } from "../../services/auth";
import logoImage from "../../assets/img/logo.png";
import currencyImage from "../../assets/img/currency.png";
import ratesImage from "../../assets/img/rates.png";
import renewalImage from "../../assets/img/renewal.png";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Landing: React.FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);

  const [selected, setSelected] = useState<number>(1);

  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  let displayedImage = currencyImage;
  if (selected === 1) displayedImage = currencyImage;
  else if (selected === 2) displayedImage = renewalImage;
  else if (selected === 3) displayedImage = ratesImage;

  const signUpToNewsletter = async () => {
    const response = await subscribeToNewsletter(email);
    
    console.log(response);
    if (response?.status === 201) {
      setEmail("");
      toast.success(response.data.data);
    }
  };

  return (
    <div className="vw-100 vh-100 body-bg y-scroll px-0 position-relative">
      <svg
        width="308"
        height="589"
        viewBox="0 0 308 589"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-143.767 588.371C-343.009 600.807 -424.48 365.215 -437.099 163.046C-444.172 49.7251 -289.721 46.2394 -178.04 39.2686C13.2801 27.3269 294.915 -77.5319 307.032 116.599C323.033 372.953 108.877 572.602 -143.767 588.371Z"
          fill="url(#paint0_linear_22_206)"
          fill-opacity="0.3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_22_206"
            x1="-37.4501"
            y1="581.735"
            x2="-145.546"
            y2="-133.817"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#D1D1E9" />
            <stop offset="1" stop-color="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="vh-10 d-none d-md-flex align-items-center px-5">
        <Col md={4}>
          {/* <b className="fs-4">Lifee Remit</b> */}
          <img src={logoImage} alt="logo" className="logo img-fluid" />
        </Col>
        <Col
          md={4}
          className="justify-content-evenly align-items-center d-flex"
        >
          <a className="m-0 text-theme no-underline" href="/">
            Home
          </a>
          <a className="m-0 text-muted no-underline" href="/about">
            About Us
          </a>
          <a className="m-0 text-muted no-underline" href="/contact">
            Contact
          </a>
        </Col>
        <Col md={4} className="text-right">
          <button
            className="btn btn_theme w-auto px-4 rounded"
            onClick={() => navigate("/signin")}
          >
            Log In
          </button>
        </Col>
      </div>

      <div className="vh-10 d-flex d-md-none align-items-center justify-content-between px-3 mb-5">
        <Col md={6}>
          {/* <b className="fs-4">Lifee Remit</b> */}
          <img src={logoImage} alt="logo" className="logo img-fluid" />
        </Col>
      </div>

      <div className="d-flex align-items-center justify-content-center h-50 position-relative mt-4">
        <svg
          width="295"
          height="322"
          viewBox="0 0 295 322"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute-rocket d-none d-md-block"
        >
          <path
            d="M147.12 37.8313L146.42 37.2812C149.57 33.2812 152.88 29.5213 156.26 26.0013L156.89 26.6213C153.53 30.1113 150.24 33.8913 147.12 37.8313Z"
            fill="#6246EA"
          />
          <path
            d="M143.385 41.1159L140.16 45.1821L140.85 45.729L144.075 41.6627L143.385 41.1159Z"
            fill="#6246EA"
          />
          <path
            d="M212.771 84.2213C234.501 49.2913 237.461 14.8713 221.641 3.73126C205.82 -7.40874 174.411 6.97126 148.841 39.2013L75.7705 131.371L150.691 184.131L212.771 84.2213Z"
            fill="#6246EA"
          />
          <path
            opacity="0.1"
            d="M204.22 78.2012L140.62 177.071L132.84 162.201L196.01 72.0013C213.87 46.4913 223.88 23.1813 223.92 10.2013C223.918 9.95031 224.005 9.70679 224.166 9.51403C224.326 9.32126 224.55 9.19175 224.797 9.14855C225.045 9.10535 225.299 9.15126 225.516 9.2781C225.732 9.40495 225.897 9.60449 225.98 9.84125C230.48 22.7913 222.68 49.5112 204.22 78.2012Z"
            fill="white"
          />
          <path
            d="M150.645 184.108C160.76 169.743 152.185 146.288 131.494 131.719C110.803 117.15 85.8303 116.984 75.716 131.349C65.6016 145.713 74.1758 169.169 94.867 183.738C115.558 198.307 140.531 198.472 150.645 184.108Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M150.645 184.108C160.76 169.743 152.185 146.288 131.494 131.719C110.803 117.15 85.8303 116.984 75.716 131.349C65.6016 145.713 74.1758 169.169 94.867 183.738C115.558 198.307 140.531 198.472 150.645 184.108Z"
            fill="white"
          />
          <path
            opacity="0.1"
            d="M142.87 115.441C126.43 103.861 107.78 100.551 95.8703 105.961L77.3203 129.341C88.3203 117.061 111.83 117.901 131.49 131.741C151.15 145.581 159.88 167.471 152 181.941L167.57 156.941C168.91 143.811 159.49 127.141 142.87 115.441Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M169.2 40.0612C164.64 47.2812 161.2 60.7913 174.75 70.3213C188.3 79.8513 199.86 72.0813 205.11 65.3213L169.2 40.0612Z"
            fill="black"
          />
          <path
            d="M208.31 57.0012C206.76 69.9012 191.85 79.3112 176.2 68.2912C160.55 57.2712 164.38 40.0612 176 34.2912C183.16 30.7112 192.28 32.2913 198.52 36.6313C204.76 40.9713 209.27 49.0012 208.31 57.0012Z"
            fill="white"
          />
          <path
            d="M178.33 65.2413C172.24 60.9613 169.12 55.3613 169.56 49.5013C169.76 46.9721 170.611 44.5377 172.031 42.4349C173.45 40.3321 175.39 38.6325 177.66 37.5013C183.1 34.7813 190.8 35.6313 196.39 39.5613C201.98 43.4913 205.39 50.4713 204.64 56.5113C204.343 59.0235 203.401 61.4163 201.907 63.4575C200.412 65.4987 198.416 67.119 196.11 68.1613C190.77 70.5813 184.42 69.5313 178.33 65.2413Z"
            fill="#6246EA"
          />
          <path
            opacity="0.3"
            d="M178.33 65.2413C172.24 60.9613 169.12 55.3613 169.56 49.5013C169.76 46.9721 170.611 44.5377 172.031 42.4349C173.45 40.3321 175.39 38.6325 177.66 37.5013C183.1 34.7813 190.8 35.6313 196.39 39.5613C201.98 43.4913 205.39 50.4713 204.64 56.5113C204.343 59.0235 203.401 61.4163 201.907 63.4575C200.412 65.4987 198.416 67.119 196.11 68.1613C190.77 70.5813 184.42 69.5313 178.33 65.2413Z"
            fill="black"
          />
          <path
            d="M178.33 65.2413C172.24 60.9613 169.01 55.5213 169.25 49.9413C169.354 47.5689 170.111 45.2713 171.438 43.302C172.765 41.3327 174.61 39.7683 176.77 38.7813C182 36.3613 189.55 37.4213 195.14 41.3613C200.73 45.3013 204.27 52.0513 203.75 57.7913C203.548 60.1608 202.694 62.4282 201.281 64.3417C199.869 66.2552 197.955 67.7399 195.75 68.6313C190.62 70.7413 184.42 69.5313 178.33 65.2413Z"
            fill="#6246EA"
          />
          <path
            opacity="0.2"
            d="M178.33 65.2413C172.24 60.9613 169.01 55.5213 169.25 49.9413C169.354 47.5689 170.111 45.2713 171.438 43.302C172.765 41.3327 174.61 39.7683 176.77 38.7813C182 36.3613 189.55 37.4213 195.14 41.3613C200.73 45.3013 204.27 52.0513 203.75 57.7913C203.548 60.1608 202.694 62.4282 201.281 64.3417C199.869 66.2552 197.955 67.7399 195.75 68.6313C190.62 70.7413 184.42 69.5313 178.33 65.2413Z"
            fill="white"
          />
          <path
            opacity="0.3"
            d="M199.38 45.3113L171.23 57.7313C169.834 55.3785 169.14 52.6756 169.23 49.9413C169.284 48.6534 169.537 47.3815 169.98 46.1713L188.15 38.1713C192.56 39.2889 196.492 41.8 199.36 45.3313L199.38 45.3113Z"
            fill="white"
          />
          <path
            opacity="0.3"
            d="M203.42 53.3213L177.59 64.7012C176.037 63.5619 174.621 62.2465 173.37 60.7812L201.47 48.3813C202.348 49.9285 203.005 51.5914 203.42 53.3213Z"
            fill="white"
          />
          <path
            opacity="0.1"
            d="M231.58 31.0513C230.72 24.1513 225.42 16.1713 217.04 10.2713C208.66 4.37125 199.37 2.07126 192.58 3.58126C204.13 -1.12874 214.48 -1.30874 221.64 3.73126C228.8 8.77126 232.12 18.5913 231.58 31.0513Z"
            fill="black"
          />
          <path
            opacity="0.5"
            d="M131.479 155.98C134.63 151.505 132.077 144.281 125.778 139.846C119.478 135.41 111.817 135.442 108.666 139.917C105.515 144.392 108.068 151.616 114.367 156.051C120.667 160.487 128.328 160.455 131.479 155.98Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M101.77 151.781C98.6205 156.251 90.9605 156.291 84.6605 151.851C78.3605 147.411 75.8005 140.191 78.9505 135.721C82.1005 131.251 89.7705 131.211 96.0705 135.651C102.37 140.091 104.88 147.311 101.77 151.781Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M145.48 182.591C142.33 187.071 134.67 187.101 128.37 182.661C122.07 178.221 119.52 171.001 122.67 166.531C125.82 162.061 133.48 162.021 139.78 166.461C146.08 170.901 148.63 178.121 145.48 182.591Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M115.77 178.381C112.62 182.851 104.96 182.881 98.6603 178.451C92.3603 174.021 89.8103 166.791 92.9603 162.311C96.1103 157.831 103.77 157.811 110.07 162.241C116.37 166.671 118.88 173.901 115.77 178.381Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M131.49 156.001C131.157 156.474 130.768 156.903 130.33 157.281C132.08 152.821 129.44 146.631 123.81 142.671C118.18 138.711 111.47 138.311 107.86 141.451C108.072 140.919 108.344 140.412 108.67 139.941C111.82 135.471 119.49 135.431 125.79 139.871C132.09 144.311 134.63 151.521 131.49 156.001Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M101.77 151.781C101.438 152.251 101.052 152.681 100.62 153.061C102.37 148.591 99.7404 142.411 94.1004 138.441C88.4604 134.471 81.7604 134.081 78.1504 137.231C78.3603 136.698 78.6322 136.191 78.9604 135.721C82.1104 131.241 89.7704 131.211 96.0704 135.651C102.37 140.091 104.88 147.301 101.77 151.781Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M145.48 182.601C145.148 183.068 144.762 183.495 144.33 183.871C146.08 179.401 143.44 173.221 137.81 169.261C132.18 165.301 125.47 164.891 121.86 168.051C122.068 167.514 122.34 167.003 122.67 166.531C125.82 162.051 133.48 162.021 139.78 166.461C146.08 170.901 148.64 178.121 145.48 182.601Z"
            fill="#6246EA"
          />
          <path
            opacity="0.5"
            d="M115.77 178.381C115.444 178.853 115.057 179.28 114.62 179.651C116.37 175.191 113.73 169.001 108.1 165.041C102.47 161.081 95.7604 160.681 92.1504 163.831C92.3562 163.293 92.6283 162.782 92.9604 162.311C96.1104 157.831 103.77 157.811 110.07 162.241C116.37 166.671 118.88 173.901 115.77 178.381Z"
            fill="#6246EA"
          />
          <path
            d="M125.35 73.2312C125.35 73.2312 111.85 90.7512 100.09 105.831C98.4199 107.934 96.2318 109.565 93.7404 110.567C91.2491 111.568 88.5403 111.904 85.8799 111.541C75.6099 110.271 58.8799 117.541 58.8799 117.541C58.8799 117.541 90.5299 65.5512 125.35 73.2312Z"
            fill="#6246EA"
          />
          <path
            opacity="0.3"
            d="M125.35 73.2312C125.35 73.2312 111.85 90.7512 100.09 105.831C98.4199 107.934 96.2318 109.565 93.7404 110.567C91.2491 111.568 88.5403 111.904 85.8799 111.541C75.6099 110.271 58.8799 117.541 58.8799 117.541C58.8799 117.541 90.5299 65.5512 125.35 73.2312Z"
            fill="black"
          />
          <path
            d="M188.66 117.821C188.66 117.821 176.77 136.431 166.48 152.581C165.064 154.862 164.266 157.472 164.164 160.154C164.063 162.837 164.661 165.5 165.9 167.881C170.56 177.131 169.34 195.371 169.34 195.371C169.34 195.371 207.63 148.001 188.66 117.821Z"
            fill="#6246EA"
          />
          <path
            opacity="0.3"
            d="M188.66 117.821C188.66 117.821 176.77 136.431 166.48 152.581C165.064 154.862 164.266 157.472 164.164 160.154C164.063 162.837 164.661 165.5 165.9 167.881C170.56 177.131 169.34 195.371 169.34 195.371C169.34 195.371 207.63 148.001 188.66 117.821Z"
            fill="black"
          />
          <path
            d="M232.28 251.611C244.77 221.051 190.77 212.391 169.4 220.061C148.03 227.731 126.24 233.431 125.4 212.981C124.56 192.531 141.02 179.851 133.17 175.131C128.82 172.511 127.58 177.131 125.43 183.871C118.85 204.521 81.5798 209.441 98.7298 239.331C115.88 269.221 106.73 262.731 77.8798 274.721C49.0298 286.711 63.8798 321.241 91.7898 321.241H259.87C336.91 321.241 263.97 173.781 232.28 251.611Z"
            fill="#6246EA"
          />
          <path
            opacity="0.6"
            d="M232.28 251.611C244.77 221.051 190.77 212.391 169.4 220.061C148.03 227.731 126.24 233.431 125.4 212.981C124.56 192.531 141.02 179.851 133.17 175.131C128.82 172.511 127.58 177.131 125.43 183.871C118.85 204.521 81.5798 209.441 98.7298 239.331C115.88 269.221 106.73 262.731 77.8798 274.721C49.0298 286.711 63.8798 321.241 91.7898 321.241H259.87C336.91 321.241 263.97 173.781 232.28 251.611Z"
            fill="white"
          />
          <path
            d="M90.3202 145.091C88.0802 137.311 75.9602 147.091 64.0202 158.941C52.0802 170.791 46.1902 197.841 34.6402 211.941C23.0902 226.041 -9.97976 238.781 2.95024 260.001C22.0202 291.271 -21.8098 321.271 30.1002 321.271H136.57C156.04 321.271 177.15 297.461 146.83 281.271C116.51 265.081 71.0902 302.831 58.8302 266.821C52.7502 248.951 74.8302 257.151 64.6002 227.891C54.3702 198.631 55.0502 190.661 60.2602 177.621C72.9402 145.841 93.7702 156.911 90.3202 145.091Z"
            fill="#6246EA"
          />
          <path
            opacity="0.6"
            d="M90.3202 145.091C88.0802 137.311 75.9602 147.091 64.0202 158.941C52.0802 170.791 46.1902 197.841 34.6402 211.941C23.0902 226.041 -9.97976 238.781 2.95024 260.001C22.0202 291.271 -21.8098 321.271 30.1002 321.271H136.57C156.04 321.271 177.15 297.461 146.83 281.271C116.51 265.081 71.0902 302.831 58.8302 266.821C52.7502 248.951 74.8302 257.151 64.6002 227.891C54.3702 198.631 55.0502 190.661 60.2602 177.621C72.9402 145.841 93.7702 156.911 90.3202 145.091Z"
            fill="white"
          />
          <path
            d="M112.39 148.681C115.03 143.861 124.09 146.751 123.89 153.061C123.69 159.371 100.23 167.641 104.59 189.431C108.95 211.221 150.83 212.781 160.66 234.611C170.49 256.441 132.41 259.501 143.77 273.151C155.13 286.801 190.19 255.451 215.17 263.511C240.15 271.571 265.11 321.241 219.29 321.241H78.1C47.4 321.241 24.98 257.851 54.48 231.771C83.98 205.691 60.18 214.161 71.19 197.451C82.2 180.741 102.26 167.161 112.39 148.681Z"
            fill="#6246EA"
          />
          <path
            opacity="0.8"
            d="M112.39 148.681C115.03 143.861 124.09 146.751 123.89 153.061C123.69 159.371 100.23 167.641 104.59 189.431C108.95 211.221 150.83 212.781 160.66 234.611C170.49 256.441 132.41 259.501 143.77 273.151C155.13 286.801 190.19 255.451 215.17 263.511C240.15 271.571 265.11 321.241 219.29 321.241H78.1C47.4 321.241 24.98 257.851 54.48 231.771C83.98 205.691 60.18 214.161 71.19 197.451C82.2 180.741 102.26 167.161 112.39 148.681Z"
            fill="white"
          />
        </svg>
        <div className="text-center w-70 w-md-90">
          <div className="landing-text mb-2">
            Stress free software License{" "}
            <span className="text-theme">Payments</span> and{" "}
            <span className="text-theme">Renewals </span>
          </div>
          <svg
            width="170"
            height="19"
            viewBox="0 0 170 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.3108 11.189C38.0072 12.906 29.5747 14.6148 21.4627 15.0414C14.5292 15.4056 7.83213 14.84 2.35044 12.4334C1.57772 12.0945 0.610063 12.3275 0.192168 12.9546C-0.226364 13.5812 0.0615728 14.3658 0.834296 14.7052C6.81414 17.3298 14.1056 18.0162 21.6685 17.6185C29.9264 17.1846 38.5111 15.4645 45.9612 13.7227C46.8257 15.1427 48.6157 16.4666 51.769 17.4434C56.6124 18.9439 63.2255 18.9253 70.1921 18.0798C80.2961 16.854 91.1652 13.9309 98.1535 11.8538C98.4401 11.7691 98.8669 11.6343 99.3893 11.4566C99.5486 11.7417 99.7269 12.0227 99.9244 12.2986C101.638 14.7026 104.67 16.6464 107.76 17.3406C127.355 21.7426 150.225 16.4681 168.845 12.1756C169.686 11.9809 170.177 11.266 169.941 10.5806C169.699 9.8951 168.82 9.49684 167.973 9.69158C149.874 13.8642 127.655 19.1289 108.607 14.8513C106.263 14.3245 103.982 12.8306 102.683 11.0062C102.536 10.8027 102.409 10.5945 102.288 10.3832C104.855 9.35168 107.875 7.91362 109.499 6.37431C111.168 4.79626 111.582 3.11181 110.13 1.52084C108.881 0.160774 106.989 0.0450656 105.021 0.750152C102.899 1.50534 100.714 3.27087 100.007 4.09941C98.6822 5.64699 98.2617 7.32579 98.5038 8.96272C97.8795 9.17657 97.3725 9.33566 97.0597 9.42864C90.2243 11.4597 79.6005 14.3266 69.7207 15.5255C63.3637 16.2972 57.3253 16.4 52.9055 15.0311C51.0205 14.4469 49.7751 13.7651 49.0992 12.9737C50.4332 12.6504 51.7194 12.3322 52.9482 12.0284C55.3785 11.4277 60.4385 10.4333 64.0536 8.66107C66.9286 7.25193 68.8779 5.33502 68.7645 2.93204C68.7065 1.6975 67.8255 0.873591 66.4234 0.411799C64.3282 -0.277791 60.7047 0.0558908 59.3555 0.288337C55.2632 0.991874 49.8013 3.90418 47.0989 7.1858C46.0205 8.49525 45.379 9.86513 45.3108 11.189ZM48.6724 10.3822C49.8286 10.1002 50.946 9.82328 52.0194 9.55777C54.2879 8.9968 59.0299 8.10575 62.4056 6.45074C64.1931 5.57467 65.6526 4.52506 65.5819 3.03069C65.5761 2.91447 65.4341 2.88142 65.3086 2.8339C65.1143 2.76107 64.8919 2.71095 64.655 2.67169C63.0516 2.40619 60.8977 2.6629 60.0161 2.81476C56.5825 3.40518 52.0149 5.86653 49.7477 8.62024C49.2687 9.20187 48.8871 9.79436 48.6724 10.3822ZM101.651 7.77363C103.148 7.14913 104.715 6.39392 105.951 5.5721C106.607 5.13561 107.161 4.68675 107.512 4.22083C107.805 3.83548 107.919 3.44082 107.569 3.05961C107.429 2.90516 107.218 2.90208 107.002 2.931C106.773 2.962 106.537 3.0281 106.301 3.11333C104.747 3.6681 103.141 4.96412 102.625 5.5721C102.02 6.27718 101.721 7.02309 101.651 7.77363Z"
              fill="#E45858"
            />
          </svg>

          <div className="d-flex align-items-center justify-content-center mt-5">
            <p style={{ lineHeight: "32px" }} className="w-70 w-md-90">
              Small businesses in Africa are having difficulties paying for
              invoiced software in foreign currencies due to central bank
              policies and forex regulations. Lifee Remit is collaborated with
              leading OEMs, software and SaaS providers to offer a convenient
              alternative for license payment and renewals in local currencies.
            </p>
          </div>
          {/* <button className="btn btn_theme w-auto px-5 mt-2">Pay Now</button> */}
        </div>
      </div>

      <div className="text-center mt-10 px-5">
        <h5 className="mb-4">Collaborators</h5>

        <Row className="px-5">
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="https://download.logo.wine/logo/Sage_Group/Sage_Group-Logo.wine.png"
              alt=""
              width="116px"
              height="75px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2022/02/SAP-Symbol.png"
              alt=""
              width="116px"
              height="45px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="https://pngimg.com/uploads/microsoft/microsoft_PNG20.png"
              alt=""
              width="136px"
              height="55px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2021/04/Oracle-logo.png"
              alt=""
              width="116px"
              height="75px"
            />
          </Col>
        </Row>
      </div>

      <div className="px-3 px-md-5 mt-5 h-75 d-flex bg-black">
        <Row className="w-100 align-items-center">
          <Col md={5}>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(1)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 1}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Pay in Local Currency</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 1} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Paying for invoiced software in a foreign currency can be a
                  hassle, as you have to worry about exchange rates and
                  international fees. Lifee Remit eliminates this problem by
                  allowing you to pay in your local currency. This makes the
                  payment process much simpler and more straightforward.
                </div>
              </Collapse>
            </div>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(2)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 2}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Streamlined Renewal Process</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 2} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Lifee Remit is working with leading solution providers to make
                  software purchase and renewals less tedious. in few simple
                  steps your software gets renewed. Worry less about software
                  expiration, Lifee Remit has it covered.
                </div>
              </Collapse>
            </div>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(3)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 3}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Affordable Transaction Fees</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 3} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Unlike paying through a bank, where fees can start at $60
                  regardless of the transaction amount. Lifee Remit's rates and
                  transactions fees are affordable irrespective of the cost of
                  the software. Even if the software costs $20 or $5,000, rest
                  assured, you are guaranteed a competitive rate. (choose any
                  picture below that looks good)
                </div>
              </Collapse>
            </div>
          </Col>

          <Col md={7}>
            <img
              src={displayedImage}
              alt="img"
              className="w-100 rounded"
              height={450}
            ></img>
          </Col>
        </Row>
      </div>

      <div className="bg-black text-white p-5">
        <h3>Testimonials</h3>
        <div className="text-center fw-bold fs-3 my-4">
          What our clients are saying
        </div>

        <div className="d-flex align-items-center x-scroll mb-5">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="man"
            className="testimonial_img rounded"
          ></img>
          <div className="mx-5">
            <b className="fs-4 mb-3">Kola</b>
            <p style={{ width: "300px" }}>
              It was easier than I thought, I made payment in Naira and that was
              it, couple minutes later my Sage Business Cloud account was
              active.
            </p>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="woman"
            className="testimonial_img rounded"
          ></img>
          <div className="mx-5">
            <b className="fs-4 mb-3">Aisha</b>
            <p style={{ width: "300px" }}>
              I didn't need to call anyone or beg for my license key. I made
              payment and was kept up to date on the status of my license key
              from the OEM.
            </p>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="woman"
            className="testimonial_img rounded"
          ></img>
          <div className="mx-5">
            <b className="fs-4 mb-3">David</b>
            <p style={{ width: "300px" }}>
              The charges are lower than the bank and the exchange rate is also
              good, compared to black market.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mx-2 my-5 d-flex align-items-center justify-content-center flex-column"
        id="faq"
      >
        <div className="w-75 w-md-90">
          <div className="faq-text">Frequently asked questions</div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What is Lifee Remit?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open} className="mb-3">
              <div id="example-collapse-text">
                As a digital distribution service, Lifee Remit makes it easy to
                pay for and renew software licences in your local currency. We
                accept Naira as payment for invoices issued in any foreign
                currency.
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen2(!open2)}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">How does it work?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open2} className="mb-3">
              <div id="example-collapse-text">
                It only takes a few easy steps. Choose the currency of your
                service provider's invoice, then choose OEM or service
                provider's product, fill out your information, and get the
                amount in Naira. Then you can pay. We will handle the rest and
                keep you updated at each stage until you receive your license or
                your account is activated.
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen3(!open3)}
              aria-controls="example-collapse-text"
              aria-expanded={open3}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What do I need to provide?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open3} className="mb-3">
              <div id="example-collapse-text">
                All you need is the Invoice, invoice number or unique identifier
                for your product or account. You can get this from your software
                or your service provider
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen4(!open4)}
              aria-controls="example-collapse-text"
              aria-expanded={open4}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What is the transaction limit?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open4} className="mb-3">
              <div id="example-collapse-text">
                At this time, we are only able to process a maximum of $5,000
                per invoice transaction. Depending on the exchange rate that has
                been approved by the OEM or service provider, a Naira equivalent
                will be provided for your payment when you are ready to check
                out.
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <div style={{ height: "220px", backgroundColor: "#353535" }}>
        <Row className="h-100 position-relative">
          <div className="position-absolute w-100 text-white h-100">
            <div className="d-block d-md-flex align-items-center justify-content-between flex-row h-100 w-100 p-4">
              <div>
                <h2 className="w-100">Sign up to our newsletter</h2>
                <div style={{ opacity: 0.6 }} className="mb-3">
                  Sign up and get latest updates from Lifee Remit in your
                  mailbox
                </div>
              </div>

              <div style={{ zIndex: 9 }}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    className="form_inputs"
                    placeholder="Enter your email"
                    style={{
                      borderRadius: "10px 0px 0px 10px",
                      // minWidth: "200px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div
                    className="d-flex align-items-center px-4 cursor-pointer"
                    style={{
                      borderRadius: "0px 10px 10px 0px",
                      backgroundColor: "#9b62cd",
                    }}
                    onClick={signUpToNewsletter}
                  >
                    Sign Up
                  </div>
                </InputGroup>
              </div>
            </div>
          </div>
          <Col xs={4} className="newsletter"></Col>
          <Col xs={4} className="newsletter"></Col>
          <Col xs={4} className="newsletter"></Col>
        </Row>
      </div>

      <div className="bg-black text-white p-4 p-md-5">
        <Row className="mb-5 d-none d-md-flex">
          <Col md={5}>
            <div className="d-flex align-items-left justify-content-between flex-column h-100">
              <b>&copy; Lifeeremit</b>
              <a
                href="https://www.notion.so/Policies-05f03a421a0047658fb633ecbc5ec8cc"
                className="fw-bold no-underline text-white"
                target="_blank"
                rel="noreferrer"
              >
                Terms & Conditions
              </a>
            </div>
          </Col>
          <Col md={7}>
            <Row className="mb-4">
              <Col md={4}>
                <b
                  onClick={() => navigate("/about")}
                  className="cursor-pointer"
                >
                  About
                </b>
              </Col>
              <Col md={4}>
                <b>Help</b>
              </Col>
              <Col md={4}>
                <b>Socials</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  Team
                </p>
              </Col>
              <Col md={4}>
                <p
                  className="faint-text text-small"
                  onClick={() => navigate("/contact")}
                >
                  Contact us
                </p>
              </Col>
              <Col md={4}>
                <p className="faint-text text-small">Twitter</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small"
                  onClick={() => navigate("/about")}
                >
                  Our Story
                </p>
              </Col>
              <Col md={4}>
                <a
                  href="#faq"
                  className="faint-text text-small no-underline text-white"
                >
                  FAQs
                </a>
              </Col>
              <Col md={4}>
                <a
                  className="faint-text text-small no-underline text-white"
                  href="https://www.linkedin.com/company/lifee-remit/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small"
                  onClick={() => navigate("/contact")}
                >
                  Careers
                </p>
              </Col>
              <Col md={4}>
                <a
                  className="faint-text text-small no-underline text-white"
                  href="https://www.linkedin.com/company/lifee-remit/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help
                </a>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Col>
        </Row>

        <div className="d-md-none mb-5">
          <b>&copy; Lifeeremit</b>
          <Row className="my-4">
            <Col xs={4}>
              <b>About</b>
            </Col>
            <Col xs={4}>
              <b>Help</b>
            </Col>
            <Col xs={4}>
              <b>Socials</b>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small">Team</p>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small">Contact us</p>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small">Instagram</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small">Our Story</p>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small">FAQs</p>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small">LinkedIn</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small">Careers</p>
            </Col>
            <Col xs={4}></Col>
            <Col xs={4}>
              <p className="faint-text text-small">Twitter</p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col xs={4}></Col>
            <Col xs={4}></Col>
            <Col xs={4}>
              <p className="faint-text text-small">Facebook</p>
            </Col>
          </Row>
          <div className="text-center">
            <b>Terms & Conditions</b>
          </div>
        </div>
      </div>
    </div>
  );
};
