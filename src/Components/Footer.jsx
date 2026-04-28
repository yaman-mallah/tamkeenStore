import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

import "./Footer.css";
import { useContext } from "react";
import { LangContext } from "../Context/LangContext";
import { Images } from "../Utils/Imgs";
import { ThemeContext } from "../Context/ThemeContext";

const Footer = () => {
  const { lang, toggleLang } = useContext(LangContext);
  const {mode} = useContext(ThemeContext)

  return (
    <footer className="pt-5">
      <div className="container">
        <div className="footerLinks">
          <div className="mb-4 footer-desc">
            {
                  mode === 'dark' ?
                  <img
                  src={Images.Whitelogo}
                  alt="Borcelle-logo"
                  className="nav-logo"
                />
                :
                <img
                  src={Images.Darklogo}
                  alt="Borcelle-logo"
                  className="nav-logo"
                />
                }
            <p className="companyDesc">
              Best information about the company gies here but now lorem ipsum
              is
            </p>
            <ul className="socials">
              <li>
                <button className="socialBtn">
                  <FaFacebookF />
                </button>
              </li>
              <li>
                <button className="socialBtn">
                  <FaTwitter />
                </button>
              </li>
              <li>
                <button className="socialBtn">
                  <FaLinkedinIn />
                </button>
              </li>
              <li>
                <button className="socialBtn">
                  <FaInstagram />
                </button>
              </li>
              <li>
                <button className="socialBtn">
                  <FaYoutube />
                </button>
              </li>
            </ul>
          </div>
          <div className=" mb-4 footer-contents">
            <h5 className="mb-4">About</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  About Us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Find store
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Categories
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 footer-contents">
            <h5 className="mb-4">Partnership</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  About Us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Find store
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Categories
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 footer-contents">
            <h5 className="mb-4">Information</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Help Center
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Money Refund
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Shipping
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 footer-contents">
            <h5 className="mb-4">For users</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Login
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Register
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  Settings
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="footer-link p-0 text-body-secondary">
                  My Orders
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4 footer-contents">
            <h5 className="mb-4">Get app</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  <button className="downloadBtn">
                    <FaApple className="downloadIcon" />
                    <div>
                      <span>Download on the</span>
                      <span>App Store</span>
                    </div>
                  </button>
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  <button className="downloadBtn">
                    <FaGooglePlay className="downloadIcon" />
                    <div>
                      <span>GET IT ON</span>
                      <span>Google Play</span>
                    </div>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-3 pt-4 footer-end">
        <div className="container">
          <div>
            <p className="copyright">© 2023 Ecommerce. </p>
            <DropdownButton id="dropdown-basic-button" title="language">
              <button className="dropdown-lang" onClick={toggleLang}>
                {lang === "ltr" ? (
                  <div>
                    <img src="/flags/uae.svg" alt="arabic" /> <span>AR</span>
                  </div>
                ) : (
                  <div>
                    <img src="/flags/usa.svg" alt="english" /> <span>EN</span>
                  </div>
                )}
              </button>
            </DropdownButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
