import { useEffect, useState } from "react";
import { api_config } from "../../Config/API";
import { Col, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const Addresses = () => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    city: "",
    neighborhood: "",
    street: "",
    building: "",
    zip_code: "",
    lat: "3.12312",
    lng: "4.12312",
    is_default: false,
  });

  const [addressData, setAddressData] = useState([]);

  const [error, setError] = useState();
  const [initialize, setInitialize] = useState(false);
  const [loading, setLoading] = useState(false);

  const base_url = api_config.BASE_URL;
  const addressPath = api_config.ENDPOINTS.ADDRESS;

  const CallAddressAPI = () => {
    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData).data?.token;

    fetch(`${base_url}${addressPath}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No profile available, please log in.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAddressData(data.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
        console.log("Current Token:", token);
        setInitialize(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData).data.token;

    setLoading(true);

    fetch(`${base_url}${addressPath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAddress),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((serverError) => {
            throw new Error(serverError.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
        setLoading(false);
      });
  };

  useEffect(() => {
    CallAddressAPI();
    console.log(addressData);
  }, []);

  if (!initialize) return <div className="loader"></div>;

  return (
    <>
      <Row>
        <Col lg={12}>
          <h3 className="profile_section">Your Addresses</h3>
          {addressData ? (
            <div className="unavailable">No addresses available</div>
          ) : (
            <div></div>
          )}
        </Col>
        <Col lg={12} className="d-flex justify-content-end mt-5">
        <button className="AddressBtn">Add Address</button>
        </Col>
      </Row>
       <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default Addresses;
