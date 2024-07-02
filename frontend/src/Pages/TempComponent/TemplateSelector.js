import React from "react";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Style.css";
import { Pagination, Navigation } from "swiper/modules";

const templateContext = require.context("./Templates", false, /\.jsx$/);
const templateTypes = templateContext
  .keys()
  .map((key) => key.match(/\.\/(.*)\.jsx$/)[1]);

const TemplateSelector = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (type) => {
    navigate(`/templatedetail/${type}`);
  };

  const getImageSrc = (type) => {
    const jpgSrc = `/template-previews/${type}.jpg`;
    const pngSrc = `/template-previews/${type}.png`;

    const img = new Image();
    img.src = jpgSrc;
    img.onerror = () => {
      img.src = pngSrc;
    };

    return img.src;
  };

  return (
    <div className="template-selector">
      <Swiper
        slidesPerView={4} // Default value for slidesPerView
        spaceBetween={10} // Default value for spaceBetween
        centeredSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {templateTypes.map((type) => (
          <SwiperSlide>
            <div className="template-option">
              <div className="temp-card">
                <img
                  src={getImageSrc(type)}
                  alt={`${type} preview`}
                  className="template-image"
                />
                <div className="card-text px-3">
                  <div className="title">
                    <p className="text-start">SnapGreet Special Cards</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Rs. 299</p>
                    <p
                      className="btn-hero"
                      key={type}
                      onClick={() => handleSelectTemplate(type)}
                    >
                      Get now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TemplateSelector;
