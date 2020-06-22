import React from "react";
import BibleIndex from "../landing/BibleIndex";
import PageHeader from "./PageHeader";
import Banner from "./Banner";
import LandingFooter from "./LandingFooter";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./Landing.css";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    height: 400,
    top: -20,
    [theme.breakpoints.down("md")]: {
      minHeight: 180,
      marginBottom: 40,
      height: "unset",
    },
    [theme.breakpoints.down("sm")]: {
      top: "unset",
      marginBottom: 80,
      marginTop: 20,
    },
    "& img": {
      verticalAlign: "top",
      height: 370,
      border: 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: "0 auto",
      [theme.breakpoints.down("md")]: {
        height: "unset",
        position: "unset",
        width: "100%",
      },
      [theme.breakpoints.only("md")]: {
        width: "80%",
        marginLeft: "10%",
      },
    },
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.body}>
      <PageHeader />
      <Banner />
      <BibleIndex />
      <div className={classes.imageContainer}>
        <img
          src={require("./images/wordCloud.png")}
          alt="love in 12 gateway languages"
        />
      </div>
      <LandingFooter />
    </Grid>
  );
};
export default Landing;
