import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoPerson } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { FaMoon } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import Dropdown from "react-bootstrap/Dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHelpCircleOutline } from "react-icons/io";
import Accordion from "react-bootstrap/Accordion";

import "./Navbar.css";
import "swiper/css";

import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { LangContext } from "../Context/LangContext";
import { Col, Row } from "react-bootstrap";
import { Images } from "../Utils/Imgs";
import { CartContext } from "../Context/CartContext";
import { api_config } from "../Config/API";
import CartCard from "../Store/CartCard";

const MainNavbar = () => {
  const { userInfo } = useContext(AuthContext);
  const { mode, toggleMode } = useContext(ThemeContext);
  const { lang, toggleLang } = useContext(LangContext);
  const { cartItems,updateQuantity, totalCartPrice } = useContext(CartContext);

  const navigate = useNavigate()

  //handling offcanvas cart
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const [showCart, setShowCart] = useState(false);

  const subTotal = (qty,price)=>{
    return qty * price
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="Navbar">
          <Container>
            <Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <NavLink to="/">
                {mode === "dark" ? (
                  <img
                    src={Images.Whitelogo}
                    alt="Borcelle-logo"
                    className="nav-logo"
                  />
                ) : (
                  <img
                    src={Images.Darklogo}
                    alt="Borcelle-logo"
                    className="nav-logo"
                  />
                )}
              </NavLink>
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    src={Images.Darklogo}
                    alt="Borcelle-logo"
                    className="nav-logo"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="ps-4">
                <Nav className="justify-content-center flex-grow-1 pe-lg-3 pe-0 ms-lg-4">
                  <form className="SearchForm">
                    <input type="text" placeholder="Search" />
                    <select name="" id="" value={"all"}>
                      <option value="all" hidden>
                        All category
                      </option>
                    </select>
                    <button>Search</button>
                  </form>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3 offcanvas-nav">
                  <div className="bottom-nav-small">
                    <Nav.Link as={Link} to="/products" className="navLink">
                      All Products
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" className="navLink">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/services" className="navLink">
                      Our Services
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about-us" className="navLink">
                      About
                    </Nav.Link>
                    <Accordion flush className="navLink">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="accordionTitle-nav">
                          Help
                        </Accordion.Header>
                        <Accordion.Body>
                          <Nav.Link as={Link} to="/FAQ">
                            FAQ
                          </Nav.Link>
                          <Nav.Link as={Link} to="/privacy-policy">
                            Privacy Policy
                          </Nav.Link>
                          <Nav.Link as={Link} to="/terms-conditions">
                            Terms & Conditions
                          </Nav.Link>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  {!userInfo ? (
                    <Nav.Link as={Link} to="/user/login" className="navLink">
                      <FiLogIn className="nav-icon" /> Login
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/user/profile" className="navLink">
                      <IoPerson className="nav-icon" /> Profile
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="/contact-us" className="navLink">
                    <MdMessage className="nav-icon" />
                    Contact us
                  </Nav.Link>
                  {!userInfo ? (
                    <span style={{ display: "none" }}></span>
                  ) : (
                    <Nav.Link as={Link} to="/user/profile" className="navLink">
                      <FaHeart className="nav-icon" /> Wishlist
                    </Nav.Link>
                  )}
                  <div>
                    <button className="nav-btn" onClick={toggleMode}>
                      {mode === "light" ? (
                        <div>
                          <FaMoon className="nav-icon" /> <span>Dark</span>
                        </div>
                      ) : (
                        <div>
                          <HiSun className="nav-icon" /> <span>Light</span>
                        </div>
                      )}
                    </button>
                    <button className="nav-btn" onClick={toggleLang}>
                      {lang === "ltr" ? (
                        <div>
                          <MdLanguage className="nav-icon" /> <span>AR</span>
                        </div>
                      ) : (
                        <div>
                          <MdLanguage className="nav-icon" /> <span>EN</span>
                        </div>
                      )}
                    </button>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div className="nav-show">
              <button className="nav-btn" onClick={handleShowCart}>
                <FaShoppingCart className="nav-icon" /> Cart
              </button>
              <Offcanvas
                show={showCart}
                onHide={handleCloseCart}
                placement={"end"}
                name={"end"}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>CART</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {cartItems.length !== 0 ? (
                    <div>
                      {
                        cartItems.map((item) => (
                      <div
                        style={{
                          borderBottom: "solid 2px var(--border)",
                          paddingBottom: "20px",
                          paddingTop: "20px"
                        }}
                        key={item.id}
                      >
                        <CartCard
                          cartImg={item.product.image}
                          cartTitle={item.product.name}
                          cartPrice={subTotal(item.quantity, item.product.price)}
                          cartQuantity={item.quantity}
                          cartId={item.id}
                        >
                          <div className="quantityBtn">
                            <button
                              style={{
                                borderStartStartRadius: "10px",
                                borderEndStartRadius: "10px",
                                border: "solid 2px var(--border)",
                                borderInlineEnd: "none",
                                width: "30px",
                                height: "35px",
                              }}
                              onClick={() => {
                                updateQuantity(item.product.id, item.quantity - 1);
                              }}
                              disabled={item.quantity === 1 ? "disabled" : ""}
                            >
                              -
                            </button>
                            <span style={{ width: "40px", height: "35px" }}>
                              {item.quantity}
                            </span>
                            <button
                              style={{
                                borderEndEndRadius: "10px",
                                borderStartEndRadius: "10px",
                                border: "solid 2px var(--border)",
                                borderInlineStart: "none",
                                width: "30px",
                                height: "35px",
                              }}
                              onClick={() => {
                                
                                updateQuantity(item.product.id, item.quantity + 1);
                              }}
                              disabled={item.quantity === 10 ? "disabled" : ""}
                            >
                              +
                            </button>
                          </div>
                        </CartCard>
                      </div>
                    ))
                      }
                    <div className="checkoutCart">
                      <div className="totalPrice">
                        <span>Total Price: </span>
                        <span>{`${totalCartPrice}$`}</span>
                      </div>
                      <button className='checkoutBtn'
                    onClick={()=>{
                      navigate('/checkout')
                    }}
                    >Checkout</button>
                    </div>
                    </div>

                  ) : (
                    <div className="emptyCart">Your cart is feeling a bit light! Let's find something to fill it up</div>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Container>
        </Navbar>
      ))}
      <div className="bottomNavbar pt-2 pb-2">
        <Container>
          <Row>
            <Col className="secondary-nav">
              <Nav.Link as={Link} to="/" className="secondary-nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="secondary-nav-link">
                All Products
              </Nav.Link>
              <Nav.Link as={Link} to="/services" className="secondary-nav-link">
                Our Services
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us" className="secondary-nav-link">
                About
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="helpBtn">
                  Help
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <h6 className="dropdownTitle">
                    <IoMdHelpCircleOutline /> Help
                  </h6>
                  <hr />
                  <Dropdown.Item as={Link} to="/FAQ">
                    FAQ
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/privacy-policy">
                    Privacy Policy
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/terms-conditions">
                    Terms & Conditions
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainNavbar;
