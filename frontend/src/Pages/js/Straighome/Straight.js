import React from "react";
import styles from "./Real.module.css";
import coastline from "../../../imag/SmallLogo.png";
import { Link } from "react-router-dom";

const Real = () => {
  return (
    <div className=" pt-5  overflow-hidden  real ">
      <div className="row g-0">
        <div className="col-md-7">
          <div className={styles.text}>
            <p
              data-aos="slide-left"
              data-aos-offset="150"
              className={styles.subHeading}
            >
              Proudly Sponsored by Coastal Nepal
            </p>
            <p
              data-aos="zoom-in"
              data-aos-offset="150"
              className={styles.content}
            >
              SnapGreet is proudly sponsored by Coastal Nepal, a leading IT
              company established in 2023. Coastal Nepal is committed to
              fostering innovation and creativity, enabling us to offer
              personalized and memorable digital greeting experiences. Their
              support and expertise ensure SnapGreet remains at the cutting edge
              of technology, helping you celebrate special moments in unique and
              meaningful ways. With Coastal Nepal by our side, we're dedicated
              to making every celebration extraordinary.
            </p>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}>
              <Link to="/contact">
                <button className={`btn custom_btn ${styles.btn} mb-4`}>
                  More details{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-5 d-flex align-item-center justify-content-center">
          <div className="home ">
            <div className="waves">
              <img src={coastline} class="float" />{" "}
              <div class="wave wave1"></div>
              <div class="wave wave2"></div>
              <div class="wave wave3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Real;
