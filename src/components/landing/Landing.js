import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import screenshot from "../common/images/screenshot.jpg";
import playStore from "../common/images/playStore.png";
import Link from "@material-ui/core/Link";
import { useMediaQuery } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { AUDIO, VIDEO } from "../../store/views";
import BibleIndex from "../landing/BibleIndex";
import Banner from "./Banner";
import ImageCard from "./ImageCard";
import "./Landing.css";
import LandingFooter from "./LandingFooter";
import LanguageBar from "./LanguageBar";
import PageHeader from "./PageHeader";
import BigTooltip from "../common/BigTooltip";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
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
  textRow: {
    marginBottom: 70,
    width: "calc(100% - 30px)",
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
  storeLink: {
    textAlign: "center",
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
        <BigTooltip title="Get the app on the Google Play Store">
          <img
            src={playStore}
            alt="Get it on the play store"
            className={classes.playStore}
          />
        </BigTooltip>
      </Link>
    ) : (
      ""
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
          <div className={classes.text}>
            <h3>Welcome to VachanOnline.com</h3>
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
          </div>
        </Grid>
        <Grid item md={12} lg={6}>
          <div className={classes.screenshotDiv}>
            <img
              src={screenshot}
              alt="Screenshot"
              className={classes.screenshot}
            />
            <div>{addLink()}</div>
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
