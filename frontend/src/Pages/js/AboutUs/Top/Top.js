import React from "react";
import styles from "./Top.module.css";
import img1 from "../../../../imag/aboutustop.jpg";
import img2 from "../../../../imag/dog2.jpg";

const Top = () => {
  return (
    <div className={`container overflow-hidden text-center`}>
      <p data-aos="slide-right " className={styles.heading}>
        About Us
      </p>
      <p data-aos="slide-left" className={styles.subHeading}>
        PetPals, Here are your favourite pets
      </p>
      <p data-aos="fade-up" data-aos-offset="80" className={styles.content}>
        Welcome to PetPals, your premier destination for pet adoption and
        companionship! Situated in the heart of your community, PetPals offers a
        wide range of services and activities designed to bring joy and
        fulfillment to both pets and their human companions.
      </p>

      <div className={`row ${styles.contain} flex-column-reverse flex-md-row`}>
        <div data-aos="slide-right" className={`col-md-6 abouttext`}>
          <p className={styles.about}>
            Connecting Pets with Loving Families: Our Mission
          </p>
          <p className={styles.creativity}>We Do with Creativity</p>
          <p className={styles.contn}>
            At PetPals, we believe that every pet deserves a loving home, and
            we're dedicated to connecting furry friends with caring families.
            Whether you're looking to adopt a playful puppy, a cuddly kitten, or
            a loyal senior pet, our experienced staff is here to guide you
            through the adoption process and help you find the perfect match for
            your lifestyle.
          </p>
        </div>
        <div
          data-aos="slide-left"
          data-aos-offset="50"
          className={`col-md-6 ${styles.imgContain}`}
        >
          <img src={img1} alt="" className={styles.img1} />
        </div>
      </div>
      <div data-aos="fade-up" className="row" style={{ textAlign: "left" }}>
        <div className={`col-md-6`}>
          <img src={img2} alt="" className={styles.img2} />
        </div>
      </div>
    </div>
  );
};

export default Top;
