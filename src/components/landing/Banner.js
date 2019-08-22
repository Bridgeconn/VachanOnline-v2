import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Banner() {
  return (
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
        <img src={require("./images/1.jpg")} alt="" />
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
        <img src={require("./images/3.jpg")} alt="" />
        <p className="legend">
          Your word is lamp of my feet ,<br />A light on my path
        </p>
      </div>
    </Carousel>
  );
}
