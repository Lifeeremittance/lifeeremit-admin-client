import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Modal,
  Card,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  createProvider,
  getProviders,
  updateProvider,
} from "../../services/providers";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Providers: React.FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [providerId, setProviderId] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");

  const [image2, setImage2] = useState<any>({
    preview: "",
    raw: "",
  });
  const [image, setImage] = useState<any>({
    preview: "",
    raw: "",
  });
  const [providers, setProviders] = useState<any>([]);

  useEffect(() => {
    getProviders()
      .then((res) => {
        setProviders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const firebaseConfig = {
    // ...
    storageBucket: "gs://lifeeremit-e7281.appspot.com",
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

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
        onClick={() => navigate("/products/" + providerId)}
      >
        Edit Rate
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" onClick={() => setShow2(true)}>
        Edit OEM
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="3"
        className="text-danger"
        onClick={() => setShow3(true)}
      >
        Delete OEM
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

  console.log(providerId);

  const triggerFileInput = () => {
    const hold = document?.getElementById("upload-button");
    hold?.click();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, image.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await createProvider(name, photoUrl);
    console.log(response);
    if (response.status === 201) {
      setProviders([...providers, response.data.data]);
      toast.success("Provider created successfully");
      setShow(false);
      setName("");
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
    const storageRef = ref(storage, name2);
    const uploadTask = uploadBytesResumable(storageRef, image2.raw);
    await uploadTask;
    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await updateProvider(providerId, {
      name: name2,
      logo: photoUrl,
    });
    console.log(response);
    if (response.status === 200) {
      const newProviders = providers.map((provider: any) => {
        const { name, logo, ...rest } = provider;
        if (provider._id === providerId) {
          return {
            ...rest,
            name: name2,
            logo: photoUrl,
          };
        } else {
          return provider;
        }
      });
      setProviders(newProviders);

      toast.success("Provider edited successfully");
      setShow2(false);
      setName2("");
      setImage2({
        preview: "",
        raw: "",
      });
    } else {
      toast.error(response);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    const response = await updateProvider(providerId, {
      is_active: false,
    });
    console.log(response);
    if (response.status === 200) {
      const newProviders = providers.filter((provider: any) => {
        return provider._id !== providerId;
      });
      setProviders(newProviders);

      toast.success("Provider deleted successfully");
      setShow3(false);
    } else {
      toast.error(response);
    }
  };

  return (
    <Container fluid className="vw-100 vh-100 body-bg">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 bg-white">
          <Header title="Providers" />

          <div className="body-bg vh-90 py-5 px-3 y-scroll">
            <Container fluid>
              <b className="fs-3">Service Providers</b>

              <div className="grid-4 mt-5">
                {providers.length > 0
                  ? providers.map((provider: any, index: string) => (
                      <div className="grid-item position-relative" key={index}>
                        <Dropdown
                          className="position-absolute"
                          style={{ right: "-20px", top: "-20px" }}
                        >
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                            split
                          >
                            <div
                              className="d-flex align-items-center justify-content-center pencil_icon"
                              onClick={() => {
                                setProviderId(provider._id);
                                setProviderName(provider.name);
                              }}
                            >
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.0396041 16.3069L0 20.7822C0 21.0198 0.0792082 21.297 0.277228 21.4554C0.475248 21.6139 0.712871 21.7327 0.950495 21.7327L5.42574 21.6931C5.66337 21.6931 5.90099 21.5743 6.09901 21.4158L21.4653 6.0495C21.8218 5.69307 21.8218 5.05941 21.4653 4.70297L17.0297 0.267327C16.6733 -0.0891089 16.0396 -0.0891089 15.6832 0.267327L12.5941 3.35644L0.316832 15.6337C0.118812 15.8317 0.0396041 16.0693 0.0396041 16.3069ZM19.4455 5.37624L17.703 7.11881L14.6139 4.0297L16.3564 2.28713L19.4455 5.37624ZM1.94059 16.703L13.2673 5.37624L16.3564 8.46535L5.0297 19.7921H1.94059V16.703Z"
                                  fill="#263238"
                                />
                              </svg>
                            </div>
                          </Dropdown.Toggle>
                          {menu}
                        </Dropdown>

                        <div
                          className="providers_list d-flex align-items-center justify-content-center bg-white"
                          onClick={() =>
                            navigate(
                              "/products/list/" +
                                provider._id +
                                "/" +
                                provider.name
                            )
                          }
                        >
                          <img
                            src={provider.logo}
                            alt=""
                            width="80%"
                            height="40px"
                          />
                        </div>
                      </div>
                    ))
                  : null}
                <div
                  className="grid-item providers_list d-flex align-items-center justify-content-center bg-white flex-column text-theme"
                  id="5"
                  onClick={() => setShow(true)}
                >
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.2915 17.9583H23.0415V2.70834C23.0415 2.03425 22.7737 1.38776 22.2971 0.911109C21.8204 0.434454 21.1739 0.166672 20.4998 0.166672C19.8257 0.166672 19.1793 0.434454 18.7026 0.911109C18.226 1.38776 17.9582 2.03425 17.9582 2.70834V17.9583H2.70817C2.03408 17.9583 1.3876 18.2261 0.910941 18.7028C0.434286 19.1794 0.166504 19.8259 0.166504 20.5C0.166504 21.1741 0.434286 21.8206 0.910941 22.2972C1.3876 22.7739 2.03408 23.0417 2.70817 23.0417H17.9582V38.2917C17.9582 38.9658 18.226 39.6123 18.7026 40.0889C19.1793 40.5656 19.8257 40.8333 20.4998 40.8333C21.1739 40.8333 21.8204 40.5656 22.2971 40.0889C22.7737 39.6123 23.0415 38.9658 23.0415 38.2917V23.0417H38.2915C38.9656 23.0417 39.6121 22.7739 40.0887 22.2972C40.5654 21.8206 40.8332 21.1741 40.8332 20.5C40.8332 19.8259 40.5654 19.1794 40.0887 18.7028C39.6121 18.2261 38.9656 17.9583 38.2915 17.9583Z"
                      fill="#6246EA"
                    />
                  </svg>
                  <span className="mt-3">Add Provider</span>
                </div>
              </div>
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
              <b className="fs-5">Add Service Provider</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>OEM</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>
                  <b>OEM Logo</b>
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
              <b className="fs-5">Edit Service Provider</b>
            </div>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>
                  <b>OEM</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs mb-3 w-100"
                  defaultValue={providerName}
                  onChange={(e) => setName2(e.target.value)}
                />
                <Form.Label>
                  <b>OEM Logo</b>
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-5">Are you sure you want to delete this OEM?</b>
            </div>
            <hr className="mt-2 mb-3" />

            <span className="fs-6">
              Note: Deleting this OEM is an action that cannot be undone
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
    </Container>
  );
};
