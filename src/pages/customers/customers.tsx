import React, { useState, useEffect } from "react";
import { Container, Col, Row, Dropdown, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/user";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Customers: React.FC<Props> = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
        console.log(res);
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

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />

        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title="Customers" />

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <Table className="text-smaller">
              <thead>
                <tr className="text-muted">
                  <th>#</th>
                  <th>NAME</th>
                  <th>COMPANY NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NO</th>
                  <th>ADDRESS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0
                  ? users.map((user: any, index: any) => (
                      <>
                        <tr className="transaction_row" key={index}>
                          <td>{index + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.companyName}</td>
                          <td>{user.email_address}</td>
                          <td>{user.phone_number}</td>
                          <td>{user.address}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                                split
                              >
                                ...
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="fs-6 border-0 drop-down-menu">
                                <Dropdown.Item
                                  eventKey="1"
                                  onClick={() =>
                                    navigate(`/customers/${user._id}`)
                                  }
                                >
                                  View Details
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        <br />
                      </>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
