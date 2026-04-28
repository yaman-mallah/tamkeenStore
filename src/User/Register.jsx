import { useState } from "react";
import "./Auth.css";
import { FiCamera } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Images } from "../Utils/Imgs";

const Register = () => {
  const [error, setError] = useState();

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    image: "null",
  });

  const base_url = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
  const loginPath = "/register";

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    dataToSend.append("name", registerData.name);
    dataToSend.append("phone", registerData.phone);
    dataToSend.append("email", registerData.email);
    if (registerData.image instanceof File) {
      dataToSend.append("image", registerData.image);
    }
    setError(null);
    setLoading(true);

    fetch(`${base_url}${loginPath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
      body: dataToSend,
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

        localStorage.setItem("temp_login", JSON.stringify(data.data.phone));

        navigate("/user/verify");
      })
      .catch((err) => {
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
              <div className={"register-container"}>
                <h2>Welcome to Borcelle!</h2>
                <span>Let's get started</span>
                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="mb-3 inputSection">
                    <label htmlFor="image">
                      <FiCamera className="inputIcon" />
                      add Photo
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="uploadFile"
                      onInput={(e) => {
                        setRegisterData({
                          ...registerData,
                          image: e.target.files[0],
                        });
                      }}
                      disabled={loading ? "disabled" : ""}
                    />
                  </div>
                  <div className="mb-3 inputSection">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      required
                      onInput={(e) => {
                        const val = e.target.value;
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        });
                        {
                          val.length < 15
                            ? setIsValid(true)
                            : setIsValid(false);
                        }
                      }}
                      disabled={loading ? "disabled" : ""}
                    />
                    <CgProfile className="inputIcon" />
                    {registerData.name.length == 0 ||
                    registerData.name.length < 25 ? (
                      <div></div>
                    ) : (
                      <div className="alert alert-warning">
                        Name should be less than 25 characters
                      </div>
                    )}
                  </div>
                  <div className="mb-3 inputSection">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      required
                      onInput={(e) => {
                        const val = e.target.value;
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        });
                        {
                          val.length < 60
                            ? setIsValid(true)
                            : setIsValid(false);
                        }
                      }}
                      disabled={loading ? "disabled" : ""}
                    />
                    {registerData.email.length == 0 ||
                    registerData.email.length < 60 ? (
                      <div></div>
                    ) : (
                      <div className="alert alert-warning">
                        Email should be less than 60 characters
                      </div>
                    )}
                    <HiOutlineMail className="inputIcon" />
                  </div>
                  <div className="mb-5 inputSection">
                    <label htmlFor="number">Phone number</label>
                    <input
                      type="text"
                      placeholder="Enter number"
                      required
                      onInput={(e) => {
                        const val= e.target.value
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        });
                        {
                          val.length == 0 || val.length == 10
                            ? setIsValid(true)
                            : setIsValid(false);
                        }
                      }}
                      disabled={loading ? "disabled" : ""}
                    />
                    <LuPhone className="inputIcon" />
                    {registerData.phone.length == 0 ||
                    registerData.phone.length == 10 ? (
                      <div></div>
                    ) : registerData.phone.length < 10 ? (
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
                    {loading ? <i>Signing...</i> : "Sign in"}
                  </button>
                  {!error ? (
                    <div></div>
                  ) : (
                    <div className="alert-danger alert">{error}</div>
                  )}
                </form>
                <span>
                  Already have an account?{" "}
                  <NavLink as={Link} to="/user/login" className="sign-link">
                    Login
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

export default Register;
