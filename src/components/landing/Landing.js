import React from "react";
import BibleIndex from "../landing/BibleIndex";
import PageHeader from "./PageHeader";
import Banner from "./Banner";
import LandingFooter from "./LandingFooter";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
    [theme.breakpoints.down("sm")]: {
      top: "unset",
      marginTop: 20,
      marginBottom: 20,
    },
    "& img": {
      width: "90%",
      margin: "0 5%",
    },
  },
  website: {
    width: "85%",
    margin: "0 10%",
    border: "1px solid #000000a1",
    boxShadow: "2px 2px 3px #968e8e",
  },
  websiteText: {
    fontSize: "1.3em",
    textAlign: "center",
    paddingTop: 5,
  },
  mobile: {
    width: "25%",
    border: "1px solid #000000a1",
    boxShadow: "2px 2px 3px #968e8e",
    display: "inline-block",
  },
  playStore: {
    width: "25%",
    margin: "0 10%",
    display: "inline-block",
  },
  mobileText: {
    fontSize: "1.3em",
    paddingTop: 5,
  },
  mobileDiv: {
    marginBottom: 120,
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
              <img
                src={require("./images/website.png")}
                alt="Website"
                className={classes.website}
              />
              <Typography variant="h6" className={classes.websiteText}>
                Website VachanOnline.net
              </Typography>
            </div>
          </Grid>
        )}
        <Grid item xs={12} md={6} className={classes.rightLinks}>
          <div className={classes.wordCloud}>
            <img
              src={require("./images/wordCloud.png")}
              alt="words in 12 gateway languages"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={3} className={classes.rightLinks}>
          <div className={classes.mobileDiv}>
            <img
              src={require("./images/mobile.png")}
              alt="Mobile"
              className={classes.mobile}
            />
            <Link
              href="https://play.google.com/store/apps/details?id=com.bridgeconn.autographago"
              target="_blank"
            >
              <img
                src={require("./images/playStore.png")}
                alt="Get it on play store"
                className={classes.playStore}
              />
            </Link>
            <Typography variant="h6" className={classes.mobileText}>
              Companion Mobile App VachanGo
            </Typography>
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
