import React, { useEffect, useState } from "react";
import { LuPhone } from "react-icons/lu";
import "./Auth.css";
import { Link, NavLink, useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Images } from "../Utils/Imgs";

const Login = ({ setSide, side }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState({
    phone: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    CallLoginAPI();
  };

  const base_url = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
  const loginPath = "/login";

  const CallLoginAPI = () => {
    setError(null);
    setLoading(true);

    fetch(`${base_url}${loginPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return res.json().then((serverError) => {
            throw new Error(serverError.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        localStorage.setItem("temp_login", JSON.stringify(data.data.phone));

        navigate("/user/verify");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        console.log("API Call ended");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-bg">
          <img src={Images.Whitelogo} alt="logo" />
          <h2>Let’s get started</h2>
          <p>
            Where opportunities meet simplicity! Whether you’re here to fill out
            your cart <br /> or to check irresistible offers.
          </p>
        </div>

        <Container>
          <Row>
            <Col lg={{ span: 6, offset: 6 }}>
              <div className="login-container">
                <h2>Welcome Back!</h2>
                <span>Please Login to continue</span>
                <form onSubmit={handleLoginSubmit} className="auth-form">
                  <div className="mb-5 inputSection">
                    <label htmlFor="number">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Add number"
                      id="number"
                      onInput={(e) => {
                        const val = e.target.value;
                        setPhone({
                          phone: e.target.value,
                        });
                        {
                          val.length == 0 || val.length == 10
                            ? setIsValid(true)
                            : setIsValid(false);
                        }
                      }}
                      required
                      disabled={loading ? "disabled" : ""}
                    />
                    <LuPhone className="inputIcon" />
                    {phone.phone.length == 0 || phone.phone.length == 10 ? (
                      <div></div>
                    ) : phone.phone.length < 10 ? (
                      <div className="alert alert-warning">
                        Number is less than 10 digits
                      </div>
                    ) : (
                      <div className="alert alert-warning">
                        Number is over 10 digits
                      </div>
                    )}
                  </div>
                  <button disabled={!isValid || loading}>
                    {loading ? <i>Logging...</i> : "Login in"}
                  </button>
                  {!error ? (
                    <div></div>
                  ) : (
                    <div className="alert-danger alert">{error}</div>
                  )}
                </form>
                <span>
                  Don't have an account?{" "}
                  <NavLink as={Link} to="/user/register" className="sign-link">
                    Sign Up
                  </NavLink>
                </span>
                <button
                  className="back-btn mt-3"
                  onClick={() => {
                    localStorage.removeItem("temp_login");
                    navigate("/");
                  }}
                  disabled={loading ? "disabled" : ""}
                >
                  Go back
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
