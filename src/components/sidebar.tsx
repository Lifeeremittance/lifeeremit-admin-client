import { useEffect } from "react";
import Cookies from "universal-cookie";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem("userId");

    window.location.href = "/signin";
  };

  // use useEffect hook to check if jwt is in cookie
  useEffect(() => {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    if (!jwt) {
      window.location.href = "/signin";
    }
  }, []);

  return (
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
                <i className={`fa fa-th-large icli fs-5 align-middle me-4`}></i>
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
                <i className={`fa fa-users icli fs-5 align-middle me-4`}></i>
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
                <i className={`fa fa-money icli fs-5 align-middle me-4`}></i>
                <span className="align-middle fs-6">Currencies</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div
          className="p-3 border-top border-bottom mb-5 cursor-pointer"
          onClick={logout}
        >
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
  );
};

export default Sidebar;
