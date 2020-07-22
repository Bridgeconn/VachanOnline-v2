import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import banner from "../common/images/3.jpg";

const useStyles = makeStyles((theme) => ({
  legend: {
    position: "absolute",
    bottom: "30%",
    width: "100%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: 36,
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.only("xs")]: {
      bottom: "3%",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "25%",
    height: "300px",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "round",
    backgroundSize: "cover",
  },
}));
export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <p className={classes.legend}>
        Your word is a lamp to my feet,
        <br />
        and a light to my path.
      </p>
    </div>
  );
}
