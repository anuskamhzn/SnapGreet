import React, { useEffect } from "react";
import "./Temp1.css";
import LocomotiveScroll from "locomotive-scroll"; // Adjust the import based on how Locomotive Scroll is installed and imported
import logo from "../../../imag/snapgreetlogo.png";

const Temp1 = ({ name, nickname, description1, description2, photos }) => {
  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });

    // Function to create confetti
    const createConfetti = (canvas) => {
      // Function body remains the same as in your original script
    };

    // Event listener for confetti button
    document.addEventListener("DOMContentLoaded", () => {
      const buttonWrapper = document.querySelector(".button-wrapper");
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buttonWrapper.appendChild(canvas);

      const confettiButton = document.querySelector(".confetti-button");
      confettiButton.addEventListener("click", () => createConfetti(canvas));
    });

    // Loader animation function
    const loaderAnimation = () => {
      const loader = document.querySelector("#loader");
      setTimeout(() => {
        loader.style.top = "-100%";

        // Create canvas and start confetti after loader animation
        const buttonWrapper = document.querySelector(".button-wrapper");
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buttonWrapper.appendChild(canvas);
        createConfetti(canvas);
      }, 4200);
    };

    // Call loader animation on DOM content load
    loaderAnimation();
  }, []);
  const createConfetti = (canvas) => {
    const ctx = canvas.getContext("2d");
    const pieces = [];
    const colors = [
      "#ff0",
      "#0f0",
      "#00f",
      "#f00",
      "#0ff",
      "#f0f",
      "#ff6347",
      "#ee82ee",
      "#adff2f",
      "#40e0d0",
    ];

    // Increase the number of confetti pieces to 500 for a more vibrant effect
    for (let i = 0; i < 500; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 2, // Adjust size range for more variety
        speed: Math.random() * 5 + 2, // Adjust speed range for more variety
        angle: Math.random() * 2 * Math.PI, // Angle in radians
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        p.x += p.speed * Math.cos(p.angle);
        p.y += p.speed * Math.sin(p.angle);
        p.size *= 0.98;

        if (p.size < 1) return;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(update);
    }

    update();
  };
  const loaderAnimation = () => {
    const loader = document.querySelector("#loader");
    setTimeout(() => {
      loader.style.top = "-100%";

      // Create canvas and start confetti after loader animation
      const buttonWrapper = document.querySelector(".button-wrapper");
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buttonWrapper.appendChild(canvas);
      createConfetti(canvas);
    }, 4200);
  };

  useEffect(() => {
    loaderAnimation();
  }, []);
  return (
    <div>
      {/* Loader */}
      <div id="loader">
        <h1>HAPPY</h1>
        <h1>BIRTHDAY</h1>
        <h1 className="name">{name}</h1>
      </div>

      {/* Main */}
      <div id="main">
        {/* Page 1 */}
        <div id="page1">
          <nav>
            <img src={logo} className="logoimg" alt="" />
          </nav>
          <div id="center">
            <div id="left">
              <h3 className="capitalize">{description1}</h3>
              <div className="button-wrapper"></div>
              <audio autoPlay src="50cent.mp3" type="audio/mp3"></audio>
            </div>
            <div id="right">
              <h1 className="name">
                JOYFUL <br />
                BDAY <br />
                {nickname}
              </h1>
            </div>
          </div>
          <div id="hero-shape"></div>

          {/* Animation-1 Section */}
          <div className="animation-1">
            <div className="container">
              <img src={photos[0]} className="saharsha" alt="" />
            </div>
            <div className="container pt-4">
              <div className="row">
                <div className="col-sm-5">
                  <img src={photos[1]} className="saharsha" alt="" />
                </div>
                <div className="col-sm-5">
                  <img src={photos[2]} className="saharsha" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div id="page2">
          <div id="moving-text">
            <div className="con">
              <h1>HAVE</h1>
              <div id="gola"></div>
              <h1>GREAT</h1>
              <div id="gola"></div>
              <h1>DAY</h1>
              <div id="gola"></div>
            </div>
            <div className="con">
              <h1>HAVE</h1>
              <div id="gola"></div>
              <h1>GREAT</h1>
              <div id="gola"></div>
              <h1>DAY</h1>
              <div id="gola"></div>
            </div>
            <div className="con">
              <h1>HAVE</h1>
              <div id="gola"></div>
              <h1>GREAT</h1>
              <div id="gola"></div>
              <h1>DAY</h1>
              <div id="gola"></div>
            </div>
          </div>
          <div id="page2-bottom">
            <h1>{description2}</h1>
          </div>
          <div id="gooey"></div>
        </div>

        {/* Page 5 */}
        <div id="page5"></div>

        {/* Full Screen */}
        <div id="full-scr">
          <div id="full-div1"></div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer">
        <div id="footer-div"></div>
        <h1>
          FROM <br />
          SNAPGREET
        </h1>
        <div id="footer-bottom"></div>
      </div>
    </div>
  );
};

export default Temp1;
