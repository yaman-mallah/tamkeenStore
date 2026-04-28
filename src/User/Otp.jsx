import { useContext, useEffect, useState } from "react";
import "./Auth.css";

import { useNavigate } from "react-router";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { Images } from "../Utils/Imgs";
import { CartContext } from "../Context/CartContext";

const Otp = () => {
  const [tempUser, setTempUser] = useState();
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState();
  const {setUserInfo} = useContext(AuthContext);
  const {mergeCart}= useContext(CartContext)

  const [OtpPayLoad, setOtpPayLoad] = useState({
    phone: "",
    otp: "",
  });

  const [resendCode, setResendCode] = useState({
    "phone": ""
  })

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentPhone = localStorage.getItem("temp_login");
    if (currentPhone) {
      setTempUser(currentPhone);

      setOtpPayLoad({
        ...OtpPayLoad,
        phone: currentPhone.replace(/['"]/g, ""),
      });

      setResendCode({
        phone: currentPhone.replace(/['"]/g, ""),
      });
    }
  }, []);

  useEffect(() => {
    if (OTP.length === 5) {
      setOtpPayLoad({
        ...OtpPayLoad,
        otp: OTP,
      });
    }
  }, [OTP]);

  const base_url = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
  const OtpPath = "/verify";

  const CallOtpAPI = () => {
    setLoading(true);

    fetch(`${base_url}${OtpPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
      body: JSON.stringify(OtpPayLoad),
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
        localStorage.setItem("userData", JSON.stringify(data));
        setUserInfo(data)
        const token = data?.data?.token
        console.log(token)
        mergeCart(token)
        localStorage.removeItem("temp_login");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        console.log("API Call ended");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const ResendPath = '/resend'

  const CallResendAPI = () => {

    fetch(`${base_url}${ResendPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify(resendCode),
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
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        console.log("API Call ended");
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    CallOtpAPI();
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
              <div className="otp-container">
                <h2>Verification </h2>
                <span>Enter the code sent to: {tempUser}</span>
                <form onSubmit={handleSubmit}>
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={5}
                    otpType="number"
                    disabled={false}
                    className="otpInput mb-3"
                  />
                  <span className="codeSpan">didn't receive code? : </span>
                  <ResendOTP
                    className="resendBtn"
                    maxTime={30}
                    timeInterval={1000}
                    onResendClick={CallResendAPI}
                  />
                  <button
                    className="verify-btn"
                    disabled={loading ? "disabled" : ""}
                  >
                    {loading ? <i>Verifying...</i> : "Verify"}
                  </button>
                  {error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    <div></div>
                  )}
                </form>

                <span style={{ textAlign: "center" }}>or</span>
                <button
                  className="back-btn"
                  onClick={() => {
                    localStorage.removeItem("temp_login");
                    navigate("/user/login");
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

export default Otp;
