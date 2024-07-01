import mockup from "../../imag/Group 24.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// import required modules

const Header = () => {
  return (
    <div>
      <div class="hero-banner">
        <div class="hero-text">
          <div class="container">
            <div class="row justify-content-between  pt-5 pb-5">
              <div class=" col-5 col-sms-5 mt-4">
                <h1
                  class=" text-white mb-2 herotext "
                  style={{ width: "100%" }}
                  data-aos="slide-up"
                  data-aos-offset="100"
                >
                  Create and share unforgettable moments with SnapGreet.{" "}
                </h1>
                <p
                  class="fs-6 fw-medium text-white mb-2 "
                  data-aos="slide-up"
                  data-aos-offset="100"
                >
                  Create unforgettable moments.{" "}
                </p>
                <Link
                  to="/template"
                  id="gold"
                  class="btn btn-purple text-white rounded-pill py-sm-2 px-sm-4 mt-2 animated slideInLeft"
                  data-aos="slide-up"
                  data-aos-offset="100"
                >
                  Let's Start
                </Link>
              </div>
              <div
                class=" col-3 col-sms-5 mockup"
                data-aos="slide-up"
                data-aos-offset="100"
              >
                <img src={mockup} className="img-fluid"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
