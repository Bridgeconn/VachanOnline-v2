import React from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import screenshot from "../common/images/screenshot.jpg";
import playStore from "../common/images/playStore.png";
import Link from "@mui/material/Link";
import { Box, useMediaQuery } from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { VIDEO } from "../../store/views";
import BibleIndex from "../landing/BibleIndex";
import Banner from "./Banner";
import ImageCard from "./ImageCard";
import "./Landing.css";
import LandingFooter from "./LandingFooter";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import VerseOfTheDayCard from "./VerseOfTheDayCard";
import TopBar from "../read/TopBar";
const ImageScreen = styled("img")(({ theme }) => ({
  width: "90%",
  display: "inline-block",
  marginBottom: 10,
  [theme.breakpoints.only("md")]: {
    width: "60%",
  },
}));
const ImagePlayStore = styled("img")(({ theme }) => ({
  width: "20%",
  margin: "0 7%",
  maxWidth: 280,
  display: "inline-block",
  [theme.breakpoints.down("md")]: {
    width: "30%",
  },
}));
const Landing = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const { setValue } = props;
  const skipLanding = () => {
    localStorage.setItem("skipPage", true);
  };
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
          <ImagePlayStore src={playStore} alt={t("landingAlt")} />
        </BigTooltip>
      </Link>
    ) : (
      ""
    );
  };
  return (
    <Grid sx={{ backgroundColor: "white" }}>
      <TopBar />
      <Banner />
      <BibleIndex />
      <Grid
        container
        justifyContent="center"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginX: { lg: 1.25, xs: 0.625 },
          marginY: { lg: 0, xs: 0.625 },
          width: "auto",
        }}
      >
        <ImageCard icon="volume_up" type="Listen" />
        <ImageCard
          icon="videocam"
          type="Watch"
          onClick={() => setValue("parallelView", VIDEO)}
        />
        <ImageCard icon="local_library" type="Read" />
        <ImageCard icon="menu_book" type="Study" />
      </Grid>
      <Box
        sx={{
          float: "right",
          padding: 1,
          display: "block",
        }}
      >
        <Link href="#" color="inherit" onClick={skipLanding}>
          {t("skipPageHeading")}
        </Link>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: 8.75,
          marginTop: { lg: "auto", xs: -1.25 },
          width: "calc(100% - 30px)",
          textAlign: "center",
        }}
      >
        <Grid item md={12} lg={6}>
          <Box
            sx={{
              fontSize: { lg: 20, xs: 16 },
              marginTop: { lg: 6.25, xs: 2.5 },
              marginRight: { lg: "auto", xs: 2.5 },
              marginBottom: { lg: "auto", xs: 2.5 },
              marginLeft: { lg: "auto", xs: 2.5 },
              paddingLeft: 3.75,
              textAlign: "center",
            }}
          >
            <h3>{t("landingWelcomeHeading")} VachanOnline.com</h3>
            <p>{t("landingWelcomeMessage1")}</p>
            <p>{t("landingWelcomeMessage2")}</p>
            <p>{t("landingWelcomeMessage3")}</p>
          </Box>
        </Grid>
        <Grid item md={12} lg={6}>
          <Box sx={{ textAlign: "center" }}>
            <ImageScreen src={screenshot} alt="Screenshot" />
            <div>{addLink()}</div>
          </Box>
        </Grid>
      </Grid>
      <VerseOfTheDayCard />
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
