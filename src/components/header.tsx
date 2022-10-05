import React from "react";
// import { Dropdown } from "react-bootstrap";

const Header = (data: any ) => {
  // type CustomToggleProps = {
  //   children: React.ReactNode;
  //   onClick: (event: any) => {};
  // };

  // const CustomToggle = React.forwardRef(
  //   (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
  //     <b
  //       ref={ref}
  //       onClick={(e) => {
  //         e.preventDefault();
  //         props.onClick(e);
  //       }}
  //       className="float-right cursor-pointer weird-margin"
  //     >
  //       {props.children}
  //     </b>
  //   )
  // );

  return (
    <header className="d-flex align-items-center justify-content-between vh-10 body-bg p-3 border-bottom">
      <div></div>
      <span className="fs-6 text-theme">{data.title}</span>

      <div className="d-flex align-items-center">
        <i className="fa fa-bell fs-3 me-3" aria-hidden="true"></i>
        {/* <Dropdown>
          <Dropdown.Toggle
            as={CustomToggle}
            id="dropdown-custom-components"
            split
          > */}
            <div className="d-flex align-items-center">
              <div className="header_profile_img me-2 d-flex align-items-center justify-content-center text-white fs-4">
                A
              </div>
              {/* <i className="fa fa-caret-down" aria-hidden="true"></i> */}
            </div>
          {/* </Dropdown.Toggle> */}

          {/* <Dropdown.Menu>
            <Dropdown.Item eventKey="1">
              <div className="d-flex align-items-center">
                <i className="fw-bold fa fa-user me-2" aria-hidden="true"></i>
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
        </Dropdown> */}
      </div>
    </header>
  );
};

export default Header;
