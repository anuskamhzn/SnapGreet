import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaMapMarker,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [formContent, setFormContent] = useState({});
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0i929pv",
        "template_i8pmnpm",
        form.current,
        "0wgnqyg70eQ5lWSzG"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
          setFormContent({});
        },
        (error) => {
          console.log(error.text);
          toast.error("Message failed to send. Please try again.");
        }
      )
      .finally(() => {
        // Explicitly reset the form fields, including textarea
        form.current.reset();

        // Ensure textarea value is cleared in state
        setFormContent((prevState) => ({
          ...prevState,
          message: "",
        }));
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div
      className="container-fluid  text-white-50 footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
      id="dark"
    >
      <div className="container py-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 py-2">
            <h3 className="text-white mb-4">Contact us</h3>

            <p className="mb-2">
              <i className="fa fa-phone-alt me-3">
                <FaPhoneAlt />
              </i>
              977+9801077123, 01-4371068
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3">
                <FaEnvelope />
              </i>
              snapgreet@gmail.com
            </p>
            <div className="d-flex pt-2">
              <a
                className="btn btn-social"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter">
                  <FaTwitter />
                </i>
              </a>
              <a
                className="btn btn-social"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f">
                  <FaFacebook />
                </i>
              </a>
              <a
                className="btn btn-social"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube">
                  <FaYoutube />
                </i>
              </a>
              <a
                className="btn btn-social"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in">
                  <FaLinkedin />
                </i>
              </a>
              <a
                className="btn btn-social"
                href="https://www.instagram.com/snap.greet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram-in">
                  <FaInstagram />
                </i>
              </a>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 py-2">
            <h3 className="text-white mb-4">Any enquiry?</h3>
            <p>Please message us for any enquiries</p>
            <div
              className="position-relative mx-auto"
              style={{ maxWidth: "800px" }}
            >
              <form ref={form} onSubmit={sendEmail} className="footer-form">
                <input
                  placeholder="Email"
                  name="from_email"
                  value={formContent.email}
                  onChange={handleChange}
                  className="form-control bg-transparent w-100 py-2 ps-4 pe-2 text-white my-2"
                  type="email"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formContent.message}
                  onChange={handleChange}
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5 text-white"
                  type="text"
                />
                <button
                  type="submit"
                  id="gold"
                  className="btn btn-light texty-2 mt-3 me-2 text-dark"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; All Rights Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="/">Home</a>
                <a href="/">Cookies</a>
                <Link to="/contact" href="/">
                  Help
                </Link>
                <a href="/">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
