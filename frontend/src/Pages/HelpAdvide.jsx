import React from "react";
import { Link } from "react-router-dom";
import bg from "../imag/helpadvice.jpg";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import SubBanner from "./js/SubBanner";
import Straight from "./js/Straighome";
import Menu from "./js/Menu";

// import Card from "./CaseStudy";

const HelpAdvice = () => {
  return (
    <>
    <Header/>
      {/* Banner Section  */}
      <section>
        <SubBanner
          heading="Help and Advice"
          subHeading="Home / Help and Advice"
          img={bg}
        />
      </section>

      {/* Top Section  */}

      {/* Middle Section  */}

      <section>
        <div
          className="text-center pt-5 pb-5 pl-5 container "
          data-aos="slide-up"
          data-aos-offset="100"
        >
          <Straight></Straight>
          <Menu />
          {/* Adding pt-5, pb-5, pl-5, pr-5 for padding on all sides */}
        </div>{" "}
      </section>
      {/* Bottom Section  */}
      {/* <section>
        <Card />
      </section> */}

      {/* Footer Section  */}
    <Footer/>
    </>
  );
};

export default HelpAdvice;
