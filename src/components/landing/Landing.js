import React from "react";
import BibleIndex from "../landing/BibleIndex";
import PageHeader from "./PageHeader";
import Banner from "./Banner";
import LandingFooter from "./LandingFooter";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import mobileLogo from "../common/images/mobileLogo.png";
import logoBlue from "../common/images/logoBlue.png";
import website from "./images/website.png";
import wordCloud from "./images/wordCloud.png";
import mobileImage from "./images/mobile.png";
import playStore from "./images/playStore.png";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import { detectMob } from "../common/utillity";
import "./Landing.css";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
  },
  wordCloud: {
    position: "relative",
    top: -20,
    left: 20,
    [theme.breakpoints.up("md")]: {
      marginBottom: 55,
    },
    [theme.breakpoints.down("sm")]: {
      top: "unset",
      left: "unset",
      marginTop: 20,
      marginBottom: 20,
    },
    "& img": {
      width: "95%",
      marginLeft: "3%",
      [theme.breakpoints.only("md")]: {
        width: "80%",
        marginLeft: "10%",
      },
    },
  },
  website: {
    width: "85%",
    margin: "0 10%",
    border: "1px solid #000000a1",
    boxShadow: "2px 2px 3px #968e8e",
  },
  websiteLogo: {
    width: "80%",
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  mobile: {
    width: "25%",
    border: "1px solid #000000a1",
    boxShadow: "2px 2px 3px #968e8e",
    display: "inline-block",
  },
  mobileLogo: {
    width: "53%",
    margin: "auto",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
  playStore: {
    width: "25%",
    margin: "0 10%",
    display: "inline-block",
  },
  mobileDiv: {
    marginBottom: 90,
    textAlign: "center",
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  const mobile = detectMob();
  const [message, setMessage] = React.useState(mobile);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage(false);
  };
  const addLink = () => {
    return process.env.REACT_APP_DOWNLOAD_URL ? (
      <Link href={process.env.REACT_APP_DOWNLOAD_URL} target="_blank">
        <img
          src={playStore}
          alt="Get it on play store"
          className={classes.playStore}
        />
      </Link>
    ) : (
      <img
        src={playStore}
        alt="Get it on play store"
        className={classes.playStore}
      />
    );
  };
  return (
    <Grid className={classes.body}>
      <PageHeader />
      <Banner mobile={mobile} />
      <BibleIndex />
      <Grid container className={classes.landingFooter}>
        {mobile ? (
          ""
        ) : (
          <Grid item xs={12} md={3} className={classes.rightLinks}>
            <div>
              <img src={website} alt="Website" className={classes.website} />
              <img
                src={logoBlue}
                alt="Website Logo"
                className={classes.websiteLogo}
              />
            </div>
          </Grid>
        )}
        <Grid item xs={12} md={6} className={classes.rightLinks}>
          <div className={classes.wordCloud}>
            <img src={wordCloud} alt="words in 12 gateway languages" />
          </div>
        </Grid>
        <Grid item xs={12} md={3} className={classes.rightLinks}>
          <div className={classes.mobileDiv}>
            <img src={mobileImage} alt="Mobile" className={classes.mobile} />
            {addLink()}
            <img
              src={mobileLogo}
              alt="Mobile Logo"
              className={classes.mobileLogo}
            />
          </div>
        </Grid>
      </Grid>
      <LandingFooter />
      {message ? (
        <Snackbar open={Boolean(alert)} onClose={handleClose}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="info"
          >
            For a better user experience use our Android App
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </Grid>
  );
};
export default Landing;
