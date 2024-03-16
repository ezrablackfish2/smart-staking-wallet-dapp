import React from "react";

import {
  FaMapMarker,
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <React.Fragment>
      <div className="footer-area">
        <div className="footer-row">
          <div className="footer-col">
            <h3>About Us</h3>
            <p>
              We are a dedicated team of creators, innovators, and dreamers. Our
              mission is to bring your ideas to life and make a difference in
              the world.
            </p>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>
              <FaMapMarker /> Kadiköy, Istanbul, Turkey
              <br />
              <FaPhone /> +90 (542) 282-7740
              <br />
              <FaEnvelope />{" "}
              <a
                href="mailto:aliihsantas34@gmail.com"
                className="footer-anchor"
              >
                aliihsantas34@gmail.com
              </a>
            </p>
          </div>
          <div className="footer-col">
            <h3>Follow Us</h3>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://github.com/ihsan215"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-anchor"
                >
                  <FaGithub /> Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ali-ihsan-tas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-anchor"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://avesis.yildiz.edu.tr/17296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-anchor"
                >
                  <FaGlobe /> Academic Works
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-line" />
        <div className="footer-row">
          <p>
            &copy; {new Date().getFullYear()} Smart Staking Wallet. All rights
            reserved.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
