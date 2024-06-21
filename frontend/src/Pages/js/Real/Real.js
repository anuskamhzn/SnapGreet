import React from "react";
import styles from "./Real.module.css";
import improveImg from "../../../imag/Real.png";
import { Link } from "react-router-dom";

const Real = () => {
  return (
    <div className="mb-5 mt-5 overflow-hidden  real ">
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
              Find Your Perfect Pet Companion
            </p>
            <p
              data-aos="slide-left"
              data-aos-offset="150"
              className={styles.subHeading}
            >
              Great Pet Adoption Experiences{" "}
            </p>
            <p
              data-aos="zoom-in"
              data-aos-offset="150"
              className={styles.content}
            >
              At PetPals, we've curated the perfect environment for connecting
              loving families with furry companions in need of homes. Our
              mission is to make the adoption process seamless and joyful for
              both pets and their new owners. With a warm atmosphere and expert
              guidance, we ensure that every adoption is a match made in heaven.
              Whether you're seeking a playful puppy, a cuddly kitten, or a
              loyal senior pet, PetPals is here to make your adoption journey
              unforgettable. Come meet your new best friend today!
            </p>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}>
              <button className={`btn custom_btn ${styles.btn}`}>
                <Link to="/contact">LET&apos;S TALK</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Real;
