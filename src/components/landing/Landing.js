import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { AUDIO, VIDEO } from "../../store/views";
import playStore from "../common/images/playStore.png";
import screenshot from "../common/images/screenshot.jpg";
import BibleIndex from "../landing/BibleIndex";
import Banner from "./Banner";
import ImageCard from "./ImageCard";
import "./Landing.css";
import LandingFooter from "./LandingFooter";
import LanguageBar from "./LanguageBar";
import PageHeader from "./PageHeader";

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
    [theme.breakpoints.only("md")]: {
      width: "60%",
    },
  },
  playStore: {
    width: "20%",
    margin: "0 7%",
    maxWidth: 280,
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
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
      [theme.breakpoints.down("md")]: {
        fontSize: "1.3em",
      },
    },
  },
  textRow: {
    marginBottom: 70,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: -10,
    },
  },
  imageRow: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "0 10px",
    width: "auto",
    [theme.breakpoints.only("sm")]: {
      margin: 5,
    },
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    paddingLeft: 30,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      textAlign: "center",
      margin: 20,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 16,
    },
  },
  storeLinkMobile: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  storeLinkPC: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Landing = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [language, setLanguage] = React.useState("English");
  const { setValue } = props;
  React.useEffect(() => {
    if (isMobile) {
      setValue("mobileView", true);
    } else {
      setValue("mobileView", false);
    }
  }, [isMobile, setValue]);
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
      {!isMobile ? <LanguageBar setLanguage={setLanguage} /> : ""}
      <Banner language={language} />
      <BibleIndex />
      <Grid
        container
        justifyContent="center"
        spacing={1}
        className={classes.imageRow}
      >
        <ImageCard
          icon="volume_up"
          text="Listen"
          onClick={() => setValue("parallelView", AUDIO)}
        />
        <ImageCard
          icon="videocam"
          text="Watch"
          onClick={() => setValue("parallelView", VIDEO)}
        />
        <ImageCard icon="local_library" text="Read" />
        <ImageCard icon="menu_book" text="Study" />
      </Grid>
      <Grid container spacing={2} className={classes.textRow}>
        <Grid item md={12} lg={6}>
          <Typography className={classes.text}>
            <p>
              <h3>Welcome to VachanOnline.com</h3>
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
        <Grid item md={12} lg={6}>
          <div className={classes.screenshotDiv}>
            <img
              src={screenshot}
              alt="Screenshot"
              className={classes.screenshot}
            />
            <div className={classes.storeLinkPC}>{addLink()}</div>
            <div className={classes.storeLinkMobile}>{addLink()}</div>
          </div>
        </Grid>
      </Grid>
      <LandingFooter />
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(null, mapDispatchToProps)(Landing);
