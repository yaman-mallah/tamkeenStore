import { div, img } from "motion/react-client";
import { useEffect, useState } from "react";
import "../Profile.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiCamera } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { Images } from "../../Utils/Imgs";
import { Col, Container, Row } from "react-bootstrap";
import { api_config } from "../../Config/API";

const ProfileDetails = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const base_url = api_config.BASE_URL;
  const ProfilePath = api_config.ENDPOINTS.PROFILE;

  const storeData = localStorage.getItem("userData");
  const token = JSON.parse(storeData).data?.token;

  const [profileInfo, setProfileInfo] = useState({
    email: "",
    phone: "",
    name: "",
    image: "",
  });

  const [updateInfo, setUpdateInfo] = useState({
    email: "",
    phone: "",
    name: "",
    image: "",
  });

  // const [updateProfile, setUpdateProfile] = useState();
  const [error, setError] = useState();
  const [initialize, setInitialize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const CallProfileAPI = () => {
    fetch(`${base_url}${ProfilePath}`, {
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
        setProfileInfo(data.data.user);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
        setInitialize(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUserData = JSON.parse(localStorage.getItem("userData"));

    console.log("user Data:");
    console.log(updatedUserData);

    setSaveChanges(true);
    const dataToSend = new FormData();

    if (updateInfo?.name?.length !== 0) {
      dataToSend.append("name", updateInfo.name);
      updatedUserData.data.name = updateInfo.name;
    }
    if (updateInfo?.email?.length !== 0) {
      dataToSend.append("email", updateInfo.email);
      updatedUserData.data.email = updateInfo.email;
    }
    if (updateInfo?.phone?.length !== 0) {
      dataToSend.append("phone", updateInfo.phone);
      updatedUserData.data.phone = updateInfo.phone;
    }
    if (updateInfo?.image instanceof File) {
      dataToSend.append("image", updateInfo.image);
      updatedUserData.data.image = updateInfo.image;
    }

    setLoading(true);

    fetch(`${base_url}${ProfilePath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
        console.log("UPDATE");
        console.log(data);
        setProfileInfo(data.data);
        e.target.reset();
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
        setLoading(false);
        setSaveChanges(false);
      });
  };

  useEffect(() => {
    CallProfileAPI();
  }, [saveChanges]);

  if (!initialize) return <div className="loader"></div>;

  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <div className="profileDetails">
              <div className="mainDetails">
                {profileInfo.image ? (
                  <img src={profileInfo?.image} alt="User Profile" />
                ) : (
                  <div></div>
                )}
                <div>
                  <span className="profileName">{profileInfo.name}</span>
                </div>
                <div>
                  <span className="profileInfo">{profileInfo.email}</span>
                </div>
                <div>
                  <div>
                    <span className="profileInfo">{profileInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="profileDetails">
              <div className="additionInfo">
                <h4>Additional Information:</h4>
                <div>
                  <h6>Orders: </h6>
                  <span>order-num</span>
                </div>
                <div>
                  <h6>Addresses: </h6>
                  <span>order-num</span>
                </div>
                <div>
                  <h6>Wishlist: </h6>
                  <span>order-num</span>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12} className="mt-5">
            <div className="profileDetails">
              <h3 className="updateTitle">Edit Profile</h3>
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="d-flex inputRow">
                  <div className="mb-3 inputSection">
                    <label htmlFor="image">
                      <FiCamera className="inputIcon" />
                      add Photo
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="uploadFile"
                      accept="image/png, image/jpeg"
                      onInput={(e) => {
                        setUpdateInfo({
                          ...updateInfo,
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
                      onInput={(e) => {
                        const val = e.target.value;
                        setUpdateInfo({
                          ...updateInfo,
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
                    {updateInfo.name.length === 0 ||
                    updateInfo.name.length < 25 ? (
                      <div></div>
                    ) : (
                      <div className="alert alert-warning">
                        Name should be less than 25 characters
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex inputRow">
                  <div className="mb-3 inputSection">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    onInput={(e) => {
                      const val = e.target.value;
                      setUpdateInfo({
                        ...updateInfo,
                        email: e.target.value,
                      });
                      {
                        val.length < 60 ? setIsValid(true) : setIsValid(false);
                      }
                    }}
                    disabled={loading ? "disabled" : ""}
                  />
                  {updateInfo.email.length == 0 ||
                  updateInfo.email.length < 60 ? (
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
                    onInput={(e) => {
                      const val = e.target.value;
                      setUpdateInfo({
                        ...updateInfo,
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
                  {updateInfo.phone.length == 0 ||
                  updateInfo.phone.length == 10 ? (
                    <div></div>
                  ) : updateInfo.phone.length < 10 ? (
                    <div className="alert alert-warning">
                      Number is less than 10 digits
                    </div>
                  ) : (
                    <div className="alert alert-warning">
                      Number is over 10 digits
                    </div>
                  )}
                </div>
                </div>
                <button disabled={loading ? "disabled" : ""}>
                  {loading ? <i>Saving</i> : "Save Changes"}
                </button>
                {!error ? (
                  <div></div>
                ) : (
                  <div className="alert-danger alert">{error}</div>
                )}
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileDetails;
