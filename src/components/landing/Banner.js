import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LanguageBar from './LanguageBar';
export default function Banner() {
  let languages = ["English", "हिंदी", "मराठी", "മലയാളം", "English", "Hindi", "Marathi", "Malayalam", "English", "Hindi", "Marathi", "Malayalam"];
  return (
    <>
      <div>
        <LanguageBar languages={languages} />
      </div>
      <Carousel
        autoPlay
        emulateTouch
        useKeyboardArrows
        infiniteLoop
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        transitionTime={500}
      >
        <div>
          <img src={require("./images/5.jpeg")} alt="" />
          <p className="legend">
            Your word is lamp of my feet ,<br />A light on my path
        </p>
        </div>
        <div>
          <img src={require("./images/2.jpg")} alt="" />
          <p className="legend">
            Your word is lamp of my feet ,<br />A light on my path
        </p>
        </div>
        <div>
          <img src={require("./images/1.jpg")} alt="" />
          <p className="legend">
            Your word is lamp of my feet ,<br />A light on my path
        </p>
        </div>
      </Carousel>
    </>
  );
}
