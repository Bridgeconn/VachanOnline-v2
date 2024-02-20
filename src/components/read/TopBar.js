import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Snackbar, useMediaQuery } from "@mui/material";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Login from "../login/Login";
import logo from "../common/images/logo1.png";
import favicon from "../common/images/favicon_black.png";
import LoginMenu from "../login/LoginMenu";
import IconButton from "@mui/material/IconButton";
import { BLACK, WHITE } from "../../store/colorCode";
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import { Tooltip } from "@mui/material";
import SearchPassage from "../search/SearchPassage";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import MultiLanguageDropdown from "../common/MultiLanguageDropdown";
import { styled } from "@mui/system";

const ImageStyle = styled("img")(({ theme }) => ({
  height: 50,
  [theme.breakpoints.down("sm")]: {
    height: 40,
  },
}));
const ImageStyleLogo = styled("img")(({ theme }) => ({
  height: 60,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));
const I = styled("i")({ padding: "6px 6px 0", color: BLACK });

const TopBar = (props) => {
  const theme = useTheme();
  const [loginButton, setLoginButton] = React.useState();
  const [hideIcons, setHideIcons] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobilePortrait = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const path = location?.pathname;
  let { login, userDetails, setParallelView, setLocale } = props;
  const { t } = useTranslation();
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  React.useEffect(() => {
    setLoginButton(
      login ? (
        <LoginMenu userDetails={userDetails} />
      ) : (
        <Login
          setMessage={setMessage}
          setAlert={setAlert}
          message={message}
          person={{
            color: BLACK,
            fontSize: "2rem",
            cursor: "pointer",
            paddingX: 1,
            paddingY: 0,
            boxSizing: "content-box",
          }}
        />
      )
    );
  }, [login, userDetails, message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert("");
    setMessage("");
  };
  const ISLButton = () => {
    const Btn = () => {
      return mobileView ? (
        <I className={`material-icons `} onClick={setParallelView}>
          sign_language
        </I>
      ) : (
        <Button
          variant="outlined"
          size="small"
          sx={{
            marginTop: 0.25,
            marginRight: 1.25,
            color: BLACK,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            "&:hover": {
              backgroundColor: BLACK + "0a",
              border: "1px solid rgba(0, 0, 0, 0.23)",
            },
          }}
          title={t("ISLVBibleText")}
          aria-label="sign language bible"
          target="_blank"
          rel="noOpener"
          onClick={setParallelView}
          startIcon={<i className="material-icons">sign_language</i>}
        >
          {isTablet ? t("ISLVTopBarBtnTab") : t("ISLVBibleText")}
        </Button>
      );
    };
    if (
      process.env.REACT_APP_SIGNBIBLE_URL === undefined ||
      path.startsWith("/read")
    ) {
      return "";
    }
    return path.startsWith("/study") ? Btn() : <Link to="/study">{Btn()}</Link>;
  };
  const StoriesButton = () => {
    return process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
      <Link to="/biblestories">
        {mobileView ? (
          <I className={`material-icons`}>auto_stories</I>
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginRight: 0.5,
              marginTop: 0.25,
              color: BLACK,
              border: "1px solid rgba(0, 0, 0, 0.23)",
              "&:hover": {
                backgroundColor: BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            title={t("bibleStoriesText")}
            aria-label="bible stories"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">auto_stories</i>}
          >
            {t("bibleStoriesText")}
          </Button>
        )}
      </Link>
    ) : (
      ""
    );
  };
  const SongsButton = () => {
    return process.env.REACT_APP_SONGS_URL !== undefined ? (
      <Link to="/songs">
        {mobileView ? (
          <I className={`material-icons`}>music_note</I>
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginRight: 0.5,
              marginTop: 0.25,
              color: BLACK,
              border: "1px solid rgba(0, 0, 0, 0.23)",
              "&:hover": {
                backgroundColor: BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            title={t("songsText")}
            aria-label="songs"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">music_note</i>}
          >
            {t("songsText")}
          </Button>
        )}
      </Link>
    ) : (
      ""
    );
  };
  const AudioBible = () => {
    return (
      <>
        <Link to="/audiobible">
          {mobileView ? (
            <I className={`material-icons`}>headphones</I>
          ) : (
            <Button
              variant="outlined"
              size="small"
              sx={{
                marginRight: 0.5,
                marginTop: 0.25,
                color: BLACK,
                border: "1px solid rgba(0, 0, 0, 0.23)",
                "&:hover": {
                  backgroundColor: BLACK + "0a",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                },
              }}
              title={t("audioBibleText")}
              aria-label="audio bible"
              target="_blank"
              rel="noopener"
              startIcon={<i className="material-icons">headphones</i>}
            >
              {t("TopbarAudioBtn")}
            </Button>
          )}
        </Link>
      </>
    );
  };
  const ReadButton = () => {
    return (
      <Link to="/read">
        {isMobilePortrait ? (
          <I className={`material-icons`}>local_library</I>
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginRight: 0.5,
              marginTop: 0.25,
              color: BLACK,
              border: "1px solid rgba(0, 0, 0, 0.23)",
              "&:hover": {
                backgroundColor: BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            title={t("readTopBarBtn")}
            aria-label="read bible"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">local_library</i>}
          >
            {mobileView === true ? t("readTopBarBtnMob") : t("readTopBarBtn")}
          </Button>
        )}
      </Link>
    );
  };
  const StudyButton = () => {
    return (
      <Link to="/study">
        {isMobilePortrait ? (
          <I className={`material-icons`}>menu_book</I>
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginRight: 0.5,
              marginTop: 0.25,
              color: BLACK,
              border: "1px solid rgba(0, 0, 0, 0.23)",
              "&:hover": {
                backgroundColor: BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            title={t("studyBibleTopBarBtn")}
            aria-label="study bible"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">menu_book</i>}
          >
            {mobileView === true
              ? t("studyTopBarBtnTab")
              : t("studyBibleTopBarBtn")}
          </Button>
        )}
      </Link>
    );
  };
  const FeedbackButton = () => {
    return (
      <Tooltip title={t("feedbackTopBarBtnToolTip")}>
        <IconButton
          aria-label="feedback"
          sx={{
            color: BLACK,
            marginTop: 0.25,
            "&:hover": {
              color: BLACK,
            },
            display: { lg: "block", xs: "none" },
          }}
          href="https://forms.office.com/r/qiV0Ym335M"
          target="_blank"
          rel="noopener"
          size="large"
        >
          <FeedbackOutlinedIcon />
        </IconButton>
      </Tooltip>
    );
  };
  const searchBox = () => {
    return <SearchPassage setHideIcons={setHideIcons} />;
  };
  return (
    <Box
      sx={{
        top: 0,
        display: "flex",
        width: "100%",
        position: "absolute",
        height: { lg: 74, xs: 60 },
      }}
    >
      <AppBar
        sx={{
          background: WHITE,
          paddingX: { lg: 1.25, xs: 0 },
          paddingY: { lg: 0, xs: 0 },
          marginBottom: { lg: 1.25, xs: 0 },
          border: BLACK,
          zIndex: 900,
        }}
        position="static"
      >
        <Toolbar sx={{ paddingX: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { lg: "inline-block", xs: "block" },
              width: { lg: "auto", xs: "10%" },
              "& a": {
                color: "inherit",
                textDecoration: "none",
                lineHeight: "75px",
              },
            }}
          >
            <Link to="/">
              <ImageStyle src={favicon} alt={"icon"} />
              <ImageStyleLogo src={logo} alt={"logo"} />
            </Link>
          </Box>
          {path.startsWith("/audiobible") || path.startsWith("/read")
            ? ""
            : AudioBible()}
          <div>{ISLButton()}</div>
          {path.startsWith("/songs") || path.startsWith("/read")
            ? ""
            : SongsButton()}
          {path.startsWith("/biblestories") || path.startsWith("/read")
            ? ""
            : StoriesButton()}
          {path.startsWith("/read") ? searchBox() : ""}
          {mobileView && hideIcons ? (
            ""
          ) : (
            <>
              {path.startsWith("/study") ? ReadButton() : StudyButton()}
              {FeedbackButton()}
              {loginButton}
              <MultiLanguageDropdown
                iconstyle={{
                  color: BLACK,
                  cursor: "pointer",
                  marginLeft: { lg: 1.25, xs: 0.75 },
                  width: "25px",
                  fontSize: "2rem",
                }}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      {alert ? (
        <Snackbar
          open={Boolean(alert)}
          autoHideDuration={8000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert variant="filled" onClose={handleClose} severity={alert}>
            {message}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.local.login,
    userDetails: state.local.userDetails,
    locale: state.local.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParallelView: () =>
      dispatch({ type: SETVALUE, name: "parallelView", value: SIGNBIBLE }),
    setLocale: (value) =>
      dispatch({ type: SETVALUE, name: "locale", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
