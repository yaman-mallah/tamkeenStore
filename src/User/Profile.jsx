import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Col, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import ProfileDetails from "./ProfileComponents/ProfileDetails";
import Addresses from "./ProfileComponents/Addresses";
import Orders from "./ProfileComponents/Orders";
import WishList from "./ProfileComponents/WishList";
import { CartContext } from "../Context/CartContext";

const Profile = () => {

  const {cartItems} = useContext(CartContext)


  return (
    <>
      <Tab.Container id="profile-tabs" defaultActiveKey="profile">
        <Col sm={12} className="text-center">
          <h1 className="page-title">Account Details</h1>
        </Col>
        <Col lg={3} sm={12}>
          <div className="account-settings">
            <h4>Account Settings</h4>
            <Nav className="flex-column ">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="address">Address</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="order">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
              </Nav.Item>

              <Nav.Link
                as={Link}
                to="/"
                onClick={() => {
                  localStorage.setItem('cart',JSON.stringify(cartItems))
                  localStorage.removeItem("userData");
                  setUserInfo()
                }}
              >
                Log Out
              </Nav.Link>
            </Nav>
          </div>
        </Col>
        <Col lg={9} sm={12} className="account-contents">
          <Tab.Content>
            <Tab.Pane eventKey="profile">
              <ProfileDetails/>
            </Tab.Pane>

            <Tab.Pane eventKey="address">
              <Addresses/>
            </Tab.Pane>

            <Tab.Pane eventKey="order">
              <Orders/>
            </Tab.Pane>

            <Tab.Pane eventKey="wishlist">
              <WishList/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Tab.Container>
    </>
  );
};

export default Profile;
