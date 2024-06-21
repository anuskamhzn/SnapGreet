import React from "react";
import { Link } from "react-router-dom";
import bg from "../imag/Aboutus.jpg";
import SubBanner from "./js/SubBanner";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Top from "./js/AboutUs/Top";
import Testimonials from "./js/Testimonial";
import Choosing from "./js/ChoosingUs";
// import Card from "./CaseStudy";

const About = () => {
  return (
    <>
    <Header/>

{/* Banner Section  */}
<section>
  <SubBanner heading="About Us" subHeading="Home /About Us" img={bg} />
</section>

{/* Top Section  */}
<section>
  <Top />
</section>
<section>
  <div
    className="text-center pt-5 pb-5 pl-5 container "
    data-aos="slide-up"
    data-aos-offset="100"
  >
    <Choosing />
  </div>
</section>
{/* Middle Section  */}

<section>
  <Testimonials />
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

export default About;
