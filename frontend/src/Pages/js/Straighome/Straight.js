import React from "react";
import styles from "./Real.module.css";
import improveImg from "../../../imag/straight.jpg";
import { Link } from "react-router-dom";

const Real = () => {
  return (
    <div className=" mt-5 overflow-hidden  real ">
      <div className="row g-0">
        <div className="col-md-6">
          <div className={styles.text}>
            <p
              data-aos="slide-left"
              data-aos-offset="150"
              className={styles.subHeading}
            >
              Straight forward Pet Rehoming And Adoption{" "}
            </p>
            <p
              data-aos="zoom-in"
              data-aos-offset="150"
              className={styles.content}
            >
              PetPals is a new digital platform with real people behind the
              scenes. Our platform connects potential adopters with people who
              need to rehome their pets. This makes it easier for good people to
              adopt the right pet whilst maximising the chance of pets finding
              their forever home.<br></br>
              We offer a non-judgmental service to rehomers and give them full
              control of the process.
            </p>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}>
              <Link to="/contact">
              <button className={`btn custom_btn ${styles.btn}`}>
                LET&apos;S TALK
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`col-md-6 ${styles.imgDiv}`}>
          <img
            data-aos="slide-left"
            data-aos-offset="150"
            src={improveImg}
            alt=""
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};
export default Real;
