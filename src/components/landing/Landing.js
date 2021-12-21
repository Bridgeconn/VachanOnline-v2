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
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import { detectMob } from "../common/utillity";
import "./Landing.css";
import listen from "../common/images/listen.jpg";
import read from "../common/images/read.jpg";
import watch from "../common/images/watch.jpg";
import Box  from "@material-ui/core/Box";
import Typography  from "@material-ui/core/Typography";

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
    marginBottom: 110,
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
}));

const Landing = () => {
  const classes = useStyles();
  const mobile = detectMob();
  const [message, setMessage] = React.useState(mobile);
  const [language, setLanguage] = React.useState("English");
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
      {!mobile ? <LanguageBar setLanguage={setLanguage} /> : ""}
      <Banner language={language} />
      <BibleIndex />
      <Grid container className={classes.landingFooter}>
  <Box style={{display:"flex", width:"100%"}}>
              <img src={read} alt="read" style={{width:"33%", height:"100%"}}/>
              <img src={watch} alt="watch" style={{width:"33%", height:"100%"}}/>
              <img src={listen} alt="listen" style={{width:"33%", height:"100%", paddingRight:"1%"}}/>
 </Box>
 <Grid item xs={12} md={6}>
    <Typography variant="h6" style={{fontSize:24, marginTop: 50, paddingLeft:30}}><p><b>Welcome to VachanOnline.com</b></p>

<p>VachanOnline.com and the companion VachanGo app is a premier Scripture Engagement website in Indian Languages!</p>

<p>So what is Scripture engagement? It is a way of studying the Bible with resources and tools to assist you understand the Bible. With a host of commentaries, videos, audio Bibles and reading plans in your heart language, our desire is that you will find this website to be a place where you can interact with Scripture, find resources to understand it, journal your spiritual growth and enjoy developing a growing relationship with God.</p>

<p>The VachanGo companion app enables you take your Bible and your Notes with you wherever you go!</p> </Typography>
     
 </Grid>
 <Grid item xs={12} md={6}>
          <div className={classes.screenshotDiv}>
            <img
              src={screenshot}
              alt="Screenshot"
              className={classes.screenshot}
            />
            {addLink()}
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
