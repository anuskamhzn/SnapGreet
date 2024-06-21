import React from "react";
import styles from "./Real.module.css";
import improveImg from "../../../imag/visionmision.png";

const Real = () => {
  return (
    <div className="Menucard">
      {" "}
      <div className="mb-5 mt-5 overflow-hidden container py-5 ">
        <div className=" overflow-hidden ">
          {" "}
          <div className="row ">
            <div className={`col-md-6 ${styles.imgDiv}`}>
              <img
                data-aos="slide-right"
                data-aos-offset="150"
                src={improveImg}
                alt=""
                className={styles.img}
              />
            </div>
            <div className="col-md-6 container">
              <div className={styles.text}>
                <p className={styles.subHeading}>
                  Our <span className="gold">Vision</span>{" "}
                </p>
                <p className={styles.content}>
                  Empowering every local and street pet to find their perfect
                  forever home, one adoption at a time
                </p>
              </div>
              <div className={styles.text}>
                <p className={styles.subHeading}>
                  Our <span className="gold">Mission</span>{" "}
                </p>
                <p className={styles.content}>
                  To connect loving families with adorable pets in need,
                  fostering lifelong companionship and happiness.
                </p>

                {/* <div data-aos="zoom-in" style={{ textAlign: "left" }}>
                <button className={`btn custom_btn ${styles.btn}`}>
                  LET&apos;S TALK
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Real;
