import React from "react";
import BibleIndex from "../landing/BibleIndex";
import PageHeader from "./PageHeader";
import Banner from "./Banner";
import LanguageBar from "./LanguageBar";
import LandingFooter from "./LandingFooter";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import screenshot from "../common/images/screenshot.jpg";
import playStore from "../common/images/playStore.png";
import Link from "@material-ui/core/Link";
import { detectMob } from "../common/utility";
import "./Landing.css";
import listen from "../common/images/listen.jpg";
import read from "../common/images/read.jpg";
import watch from "../common/images/watch.jpg";
import ImageCard from "./ImageCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
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
  screenshot: {
    width: "90%",
    display: "inline-block",
    marginBottom: 30,
  },
  playStore: {
    width: "25%",
    margin: "0 7%",
    display: "inline-block",
  },
  screenshotDiv: {
    textAlign: "center",
  },
  points: {
    marginTop: 15,
    margin: "auto",
    maxWidth: 500,
    listStyleType: "none",
    "& li": {
      paddingTop: 10,
      fontSize: "1.3rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.3em",
      },
    },
  },
  textRow: {
    margin: 15,
    marginBottom: 30,
    width: "calc(100% - 30px)",
  },
  imageRow: {
    margin: "0 12px 90px",
    width: "calc(100% - 30px)",
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    paddingLeft: 30,
  },
  storeLink:{
    textAlign:"center",
    [theme.breakpoints.up("sm")]: {
      display:"none",
    },
  },
  storeLink2:{
    [theme.breakpoints.down("sm")]: {
      display:"none",
    },
  }
}));

const Landing = () => {
  const classes = useStyles();
  const mobile = detectMob();
  const [language, setLanguage] = React.useState("English");
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
      {!mobile ? <LanguageBar setLanguage={setLanguage} /> : ""}
      <Banner language={language} />
      <BibleIndex />
      <div className={classes.storeLink}>{addLink()}</div>
      <Grid container spacing={2} className={classes.textRow}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.text}>
            <p>
              <b>Welcome to VachanOnline.com</b>
            </p>
            <p>
              VachanOnline.com and the companion VachanGo app is a premier
              Scripture Engagement website in Indian Languages!
            </p>
            <p>
              So what is Scripture engagement? It is a way of studying the Bible
              with resources and tools to assist you understand the Bible. With
              a host of commentaries, videos, audio Bibles and reading plans in
              your heart language, our desire is that you will find this website
              to be a place where you can interact with Scripture, find
              resources to understand it, journal your spiritual growth and
              enjoy developing a growing relationship with God.
            </p>
            <p>
              The VachanGo companion app enables you take your Bible and your
              Notes with you wherever you go!
            </p>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.screenshotDiv}>
            <img
              src={screenshot}
              alt="Screenshot"
              className={classes.screenshot}
            />
          <div className={classes.storeLink2}>{addLink()}</div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        className={classes.imageRow}
      >
        <ImageCard src={read} text="read" />
        <ImageCard src={watch} text="watch" />
        <ImageCard src={listen} text="listen" />
      </Grid>

      <LandingFooter />
    </Grid>
  );
};
export default Landing;
