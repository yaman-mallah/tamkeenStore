import React, { useState } from "react";
import { api_config } from "../Config/API";
import { Col } from "react-bootstrap";

const ContactUs = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [contactInfo, setContactInfo] = useState({
    temp_user_id: userData ? userData.data.id : null,
    type: userData ? "PHONE" : "EMAIL",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const base_url = api_config.BASE_URL;
  const contactPath = api_config.ENDPOINTS.CONTACT;

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch(`${base_url}${contactPath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify(contactInfo),
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
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
        setLoading(false);
      });

      console.log(contactInfo.type)
  };

  return (
    <>
      <Col sm={12}>
        <form onSubmit={handleSubmit}>
          {contactInfo.type === "EMAIL" ? (
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" id="email"
              onInput={(e) => {
              setContactInfo({
                ...contactInfo,
                email: e.target.value,
              });
            }}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone">Phone: </label>
              <input type="text" id="phone"
              onInput={(e) => {
              setContactInfo({
                ...contactInfo,
                phone: e.target.value,
              });
            }}
              />
            </div>
          )}
          <div>
              <label htmlFor="message">Message: </label>
              <textarea name="" id="message"
              onInput={(e) => {
              setContactInfo({
                ...contactInfo,
                message: e.target.value,
              });
            }}
              ></textarea>
            </div>
            <button disabled={loading ? "disabled" : ""}>
          {loading ? <i>Submitting</i> : "Submit"}
        </button>
        </form>
      </Col>
    </>
  );
};

export default ContactUs;
