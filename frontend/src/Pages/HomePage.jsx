import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Hero from "./js/Hero.jsx";
import ChoosingUs from "./js/ChoosingUs/ChoosingUs.js";
import Real from "./js/Real";
import Straight from "./js/Straighome";
import TemplateSelector from "./TempComponent/TemplateSelector";
import Popup from "./Popup/Popup.jsx";
import "./Style.css";

const HomePage = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const shouldShowPopup = sessionStorage.getItem("showPopup");
    if (
      location.state &&
      location.state.showPopup &&
      shouldShowPopup === "true"
    ) {
      setShowPopup(true);
      sessionStorage.removeItem("showPopup");
    }
  }, [location.state]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Header />
      <Hero />
      <Real />
      <div
        className="text-center  pb-5 pl-5 container"
        data-aos="slide-up"
        data-aos-offset="100"
      >
        <Straight />
      </div>

      <div className="mt-3">
        <div className="Featured">
          <h1 className="text-center">Featured Templates</h1>
          <div className="container">
            <div className="row justify-content-center flex-wrap">
              <div className="mt-5">
                <TemplateSelector />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup
          message="Your request has been submitted. Please wait a few moments for your template to be ready. You will receive a notification once it is available."
          onClose={handleClosePopup}
        />
      )}

      <Footer />
    </>
  );
};

export default HomePage;
