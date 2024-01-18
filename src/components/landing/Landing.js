import React from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import screenshot from "../common/images/screenshot.jpg";
import playStore from "../common/images/playStore.png";
import Link from "@mui/material/Link";
import { useMediaQuery } from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { AUDIO, VIDEO } from "../../store/views";
import BibleIndex from "../landing/BibleIndex";
import Banner from "./Banner";
import ImageCard from "./ImageCard";
import "./Landing.css";
import LandingFooter from "./LandingFooter";
import PageHeader from "./PageHeader";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
  },
  screenshot: {
    width: "90%",
    display: "inline-block",
    marginBottom: 10,
    [theme.breakpoints.only("md")]: {
      width: "60%",
    },
  },
  playStore: {
    width: "20%",
    margin: "0 7%",
    maxWidth: 280,
    display: "inline-block",
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
  },
  screenshotDiv: {
    textAlign: "center",
  },
  textRow: {
    marginBottom: 70,
    [theme.breakpoints.up("lg")]: {
      width: "calc(100% - 30px)",
    },
    textAlign: "center",
    [theme.breakpoints.down("lg")]: {
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
    [theme.breakpoints.down("lg")]: {
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
  const { setValue } = props;

  const { t } = useTranslation();
  React.useEffect(() => {
    if (isMobile) {
      setValue("mobileView", true);
    } else {
      setValue("mobileView", false);
    }
  }, [isMobile, setValue]);
  const addLink = () => {
    return process.env.REACT_APP_DOWNLOAD_URL ? (
      <Link
        href={process.env.REACT_APP_DOWNLOAD_URL}
        target="_blank"
        underline="hover"
      >
        <BigTooltip title={t("landingPlayStoreToolTip")}>
          <img
            src={playStore}
            alt={t("landingAlt")}
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
      <Banner />
      <BibleIndex />
      <Grid
        container
        justifyContent="center"
        spacing={1}
        className={classes.imageRow}
      >
        <ImageCard
          icon="volume_up"
          type="Listen"
          onClick={() => setValue("parallelView", AUDIO)}
        />
        <ImageCard
          icon="videocam"
          type="Watch"
          onClick={() => setValue("parallelView", VIDEO)}
        />
        <ImageCard icon="local_library" type="Read" />
        <ImageCard icon="menu_book" type="Study" />
      </Grid>
      <Grid container spacing={2} className={classes.textRow}>
        <Grid item md={12} lg={6}>
          <div className={classes.text}>
            <h3>{t("landingWelcomeHeading")} VachanOnline.com</h3>
            <p>
              VachanOnline.com {t("landingWelcomeMessage1")} VachanGo{" "}
              {t("landingWelcomeMessage2")}
            </p>
            <p>{t("landingWelcomeMessage3")}</p>
            <p>
              {t("landingWelcomeMessage4")} VachanGo{" "}
              {t("landingWelcomeMessage5")}
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
