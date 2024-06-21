import React, { useState, useRef } from "react";

import styles from "./ContactUsForm.module.css";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPhoneSquareAlt } from "react-icons/fa";
// import {Map, GoogleApiWrapper} from 'google-maps-react';

const ContactUsForm = () => {
  const [formContent, setFormContent] = useState({});
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0i929pv",
        "template_qhghh5b",
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
    <>
      <div className={`container ${styles.contain} overflow-hidden`}>
        <div
          class="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 class="mb-3">Get In Touch</h1>
          <p>
            Your feedback is invaluable to us. Whether you have questions,
            suggestions, or need support, our team is ready to respond promptly.
            Contact us and let's start a conversation!
          </p>
        </div>

        <div class="row g-4 mb-5">
          <div
            class="col-md-6 col-lg-4 text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div
              class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4 icon"
              style={{ width: "75px", height: "75px" }}
            >
              <FaMapMarkerAlt />
            </div>
            <h6>Imadol, Lalitpur, Nepal, 44600</h6>
          </div>
          <div
            class="col-md-6 col-lg-4 text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div
              class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4 icon"
              style={{ width: "75px", height: "75px" }}
            >
              <IoMail />
            </div>
            <h6>snapgreet@gmail.com</h6>
          </div>
          <div
            class="col-md-6 col-lg-4 text-center wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <div
              class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4 icon"
              style={{ width: "75px", height: "75px" }}
            >
              <FaPhoneSquareAlt />
            </div>
            <h6>+977 98010 00661</h6>
          </div>
        </div>

        <div className="row">
          <div
            className="col-md-6"
            data-aos="fade-right"
            style={{ textAlign: "left" }}
          >
            <form ref={form} onSubmit={sendEmail}>
              <input
                placeholder="Your Name"
                name="from_name"
                value={formContent.name}
                onChange={handleChange}
                className={styles.input}
                type="text"
              />

              <input
                placeholder="Email"
                name="from_email"
                value={formContent.email}
                onChange={handleChange}
                className={styles.input}
                type="email"
              />

              <div data-aos="fade-left" style={{ textAlign: "left" }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formContent.message}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.msg}`}
                  type="text"
                />
                <div style={{ textAlign: "left" }}>
                  <button
                    type="submit"
                    value="Send"
                    className=" btn-more text-white mb-3 py-3 px-5"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7068.318555154886!2d85.350769!3d27.65054340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1715362627497!5m2!1sen!2snp"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUsForm;
