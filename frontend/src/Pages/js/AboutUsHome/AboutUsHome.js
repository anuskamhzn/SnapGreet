import React from "react";
import styles from "./AboutUsHome.module.css";
import img1 from "../../assets/gallery-img13.jpg";
import img2 from "../../assets/gallery-img09.jpg";
import img3 from "../../assets/gallery-img10.jpg";

const AboutUsHome = () => {
  return (
    <>
      <div className={`container ${styles.contain}`}>
        <div className="row overflow-hidden">
          <div className="col-md-6">
            <p data-aos="slide-right" className={styles.head}>
              ABOUT US
            </p>
            <p data-aos="slide-left" className={styles.heading}>
              Come & Experience One Of The Best Sports In The World{" "}
            </p>
            <div data-aos="zoom-in">
              <p className={styles.content}>
                Discover SnookerHouse, a place born from our love for cuesports
                and camaraderie. We envisioned a spot where players and friends
                could share in the excitement of snooker and pool. Here, we
                offer not just tables, but an inviting atmosphere, quality cues,
                and accessories to enhance your experience. Join us in creating
                memorable moments and celebrating the spirit of cuesports at
                SnookerHouse!
              </p>
            </div>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}>
              <button
                to="/aboutus  "
                className={`btn custom_btn ${styles.btn}`}
              >
                {" "}
                Learn more{" "}
              </button>
            </div>
          </div>

          <div className="col-md-6 mt-5 overflow-hidden">
            <div className={styles.row}>
              <div className={`${styles.column} ${styles.col1}`}>
                <img data-aos="zoom-in-right" src={img1} alt="" />
              </div>
              <div className={styles.column}>
                <img
                  data-aos="zoom-in-left"
                  src={img2}
                  style={{ width: "110%" }}
                  alt=""
                />
                <img data-aos="zoom-in-left" src={img3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsHome;
