import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
      bottom: "15%",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "35%",
    minHeight: "300px",
    "& img": {
      width: "100%",
      verticalAlign: "top",
      height: "100%",
      border: 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
}));
export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <img src={require("./images/3.jpg")} alt="" />
      <p className={classes.legend}>
        Your word is a lamp to my feet,
        <br />
        and a light to my path.
      </p>
    </div>
  );
}
