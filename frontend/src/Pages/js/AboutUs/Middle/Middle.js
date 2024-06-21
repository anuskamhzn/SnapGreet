import React from "react";
import styles from "./Middle.module.css";

import drinks from "../../../imag/cat1.jpg";
import space from "../../../imag/cat1.jpg";
import friends from "../../../imag/cat1.jpg";
import { GiEightBall } from "react-icons/gi";
import { RiSpaceShipFill } from "react-icons/ri";
import { GiSwordsEmblem } from "react-icons/gi";

const Middle = () => {
  return (
    <div className="overflow-hidden highlights">
      <div className={`container ${styles.contain}`}>
        <p
          data-aos="fade-down-right"
          data-aos-offset="170"
          className={styles.mainHead}
        >
          All These Highlights In One Place
        </p>

        <div className="row">
          <div data-aos="fade-right" data-aos-offset="170" className="col-md-4">
            <div className={styles.box}>
              <div className={styles.boxtext}>
                <icon>
                  <GiEightBall />
                </icon>
                <p className={styles.head}>Bar and Snacks</p>
                <p className={styles.content}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor.
                </p>
              </div>{" "}
              <img src={drinks} className="img-fluid" alt="" />
            </div>
          </div>

          <div data-aos="fade-up" className="col-md-4">
            <div className={styles.box}>
              <div className={styles.boxtext}>
                <icon>
                  {" "}
                  <RiSpaceShipFill />
                </icon>
                <p className={styles.head}>Space</p>
                <p className={styles.content}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor.
                </p>
              </div>{" "}
              <img src={space} className="img-fluid" alt="" />
            </div>
          </div>

          <div data-aos="fade-left" className="col-md-4">
            <div className={styles.box}>
              <div className={styles.boxtext}>
                <icon>
                  <GiSwordsEmblem />
                </icon>{" "}
                <p className={styles.head}>Friends</p>
                <p className={styles.content}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor.
                </p>
              </div>{" "}
              <img src={friends} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Middle;
