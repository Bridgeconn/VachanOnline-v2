import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  legend: {
    position: "absolute",
    bottom: "30%",
    left: "26%",
    marginLeft: "-20%",
    width: "90%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: 36,
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.only("xs")]: {
      bottom: "15%"
    }
  }
}));
export default function Banner() {
  const classes = useStyles();
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
      <div className="imageContainer">
        <img src={require("./images/1.jpg")} alt="" />
        <p className={classes.legend}>
          Your word is lamp of my feet ,<br />A light on my path
        </p>
      </div>
      <div className="imageContainer">
        <img src={require("./images/2.jpg")} alt="" />
        <p className={classes.legend}>
          Your word is lamp of my feet ,<br />A light on my path
        </p>
      </div>
      <div className="imageContainer">
        <img src={require("./images/3.jpg")} alt="" />
        <p className={classes.legend}>
          Your word is lamp of my feet ,<br />A light on my path
        </p>
      </div>
    </Carousel>
  );
}
