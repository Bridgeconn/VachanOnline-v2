import React from "react";
import { Fade } from "react-slideshow-image";
import { makeStyles } from "@material-ui/core/styles";
import listen from "../common/images/listen.jpg";
import read from "../common/images/read.jpg";
import watch from "../common/images/watch.jpg";
import "react-slideshow-image/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  eachFade: {
    display: "flex",
    width: "100%",
    "& div": {
      width: "90%",
      left: "5%",
      position: "relative",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
}));
export default function ImageSlider() {
  const classes = useStyles();
  const properties = {
    duration: 4000,
    indicators: true,
  };
  return (
    <div>
      <div className="slide-container">
        <Fade {...properties}>
          <div className={classes.eachFade}>
            <div>
              <img src={listen} alt="listen" />
            </div>
          </div>
          <div className={classes.eachFade}>
            <div>
              <img src={read} alt="listen" />
            </div>
          </div>
          <div className={classes.eachFade}>
            <div>
              <img src={watch} alt="listen" />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
