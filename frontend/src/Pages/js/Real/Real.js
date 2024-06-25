import React from "react";
import styles from "./Real.module.css";
import improveImg from "../../../imag/snaplogo.png";
import { Link } from "react-router-dom";

const Real = () => {
  return (
    <div className=" mt-5 overflow-hidden container real ">
      <div className="row g-0">
        <div className={`col-md-6 ${styles.imgDiv}`}>
          <img
            data-aos="slide-right"
            data-aos-offset="150"
            src={improveImg}
            alt=""
            className={styles.img}
          />
        </div>
        <div className="col-md-6">
          <div className={styles.text}>
            <p
              data-aos="slide-right"
              data-aos-offset="150"
              className={styles.heading}
            >
              Craft memorable digital greetings{" "}
            </p>
            <p
              data-aos="slide-left"
              data-aos-offset="150"
              className={styles.subHeading}
            >
              What SnapGreet actually is?{" "}
            </p>
            <p
              data-aos="zoom-in"
              data-aos-offset="150"
              className={styles.content}
            >
              Welcome to SnapGreet, your go-to platform for creating
              personalized greeting websites. Perfect for birthdays,
              anniversaries, and more, SnapGreet lets you craft unique,
              heartfelt surprises that make your loved ones feel special. Simply
              enter your details, choose a template, and your custom greeting
              site is ready to share. You can also generate an image preview for
              easy social media sharing. Optimized for mobile users, SnapGreet
              ensures a seamless experience. Celebrate and connect with
              SnapGreet, turning every occasion into a memorable digital
              celebration.
            </p>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Real;
