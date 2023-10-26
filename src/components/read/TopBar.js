import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Divider,
  Menu,
  MenuItem,
  Snackbar,
  useMediaQuery,
} from "@material-ui/core";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Login from "../login/Login";
import logo from "../common/images/logo1.png";
import favicon from "../common/images/favicon_black.png";
import LoginMenu from "../login/LoginMenu";
import IconButton from "@material-ui/core/IconButton";
import { BLACK, WHITE } from "../../store/colorCode";
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import { Tooltip } from "@material-ui/core";
import SearchPassage from "../search/SearchPassage";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
//import LocaleContext from "../../LocaleContext";
import i18n from "../../i18n";
import LanguageIcon from "@material-ui/icons/Language";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    display: "flex",
    width: "100%",
    position: "absolute",
    height: 74,
    [theme.breakpoints.down("sm")]: {
      height: 60,
    },
  },
  appBar: {
    background: WHITE,
    padding: "0px 10px",
    marginBottom: "10px",
    border: BLACK,
    zIndex: 900,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
      padding: 0,
    },
  },
  title: {
    flexGrow: 1,
    width: "30%",
    display: "inline-block",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      width: "10%",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      lineHeight: "75px",
    },
  },
  icon: {
    height: 50,
    [theme.breakpoints.down("sm")]: {
      height: 45,
    },
  },
  logo: {
    height: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    marginRight: 4,
    marginTop: 2,
  },
  feedback: {
    color: BLACK,
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: BLACK,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  signBible: {
    marginTop: 2,
    marginRight: 10,
  },
  islIcon: {
    padding: "8px 8px 0",
    color: BLACK,
  },
  languageIcon: {
    color: BLACK,
    cursor: "pointer",
    paddingLeft: 5,
    width: "30px",
  },
  languageMenu: {
    //maxHeight: 68 * 4.5,
    width: 150,
  },
}));

const TopBar = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const [hideIcons, setHideIcons] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  //const [locale, setLocale] = useState(i18n.language);
  const [languageAnchor, setLanguageAnchor] = React.useState(null);
  const open = Boolean(languageAnchor);
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobilePortrait = useMediaQuery(theme.breakpoints.down("xs"));
  const location = useLocation();
  const path = location?.pathname;
  let { login, userDetails, setParallelView, locale, setLocale } = props;
  console.log(locale, "locale");
  const { t } = useTranslation();
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  function openLanguage(event) {
    setLanguageAnchor(event.currentTarget);
  }
  function closeLanguage() {
    setLanguageAnchor(null);
  }
  function setLanguage(locale) {
    setLocale(locale);
    closeLanguage();
  }
  React.useEffect(() => {
    setLoginButton(
      login ? (
        <LoginMenu userDetails={userDetails} />
      ) : (
        <Login setMessage={setMessage} setAlert={setAlert} />
      )
    );
  }, [login, userDetails]);

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
        <i
          className={`material-icons ${classes.islIcon}`}
          onClick={setParallelView}
        >
          sign_language
        </i>
      ) : (
        <Button
          variant="outlined"
          size="small"
          className={classes.signBible}
          title={t("ISLVTopBarBtnToolTip")}
          aria-label="sign language bible"
          target="_blank"
          rel="noOpener"
          onClick={setParallelView}
          startIcon={<i className="material-icons">sign_language</i>}
        >
          {isTablet ? t("ISLVTopBarBtnTab") : t("ISLVTopBarBtn")}
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
          <i className={`material-icons ${classes.islIcon}`}>auto_stories</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            title={t("bibleStoriesTopBarBtn")}
            aria-label="bible stories"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">auto_stories</i>}
          >
            {t("bibleStoriesTopBarBtn")}
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
          <i className={`material-icons ${classes.islIcon}`}>music_note</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            title={t("songsTopBarBtn")}
            aria-label="songs"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">music_note</i>}
          >
            {t("songsTopBarBtn")}
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
            <i className={`material-icons ${classes.islIcon}`}>headphones</i>
          ) : (
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              title={t("TopbarAudioBtnToolTip")}
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
          <i className={`material-icons ${classes.islIcon}`}>local_library</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
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
          <i className={`material-icons ${classes.islIcon}`}>menu_book</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
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
          className={classes.feedback}
          href="https://forms.office.com/r/qiV0Ym335M"
          target="_blank"
          rel="noopener"
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
    <>
      {/* <LocaleContext.Provider value={{ locale, setLocale }}> */}
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <div className={classes.title}>
              <Link to="/">
                <img src={favicon} alt={"icon"} className={classes.icon} />
                <img src={logo} alt={"logo"} className={classes.logo} />
              </Link>
            </div>
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
              </>
            )}
            <LanguageIcon
              className={classes.languageIcon}
              onClick={openLanguage}
            ></LanguageIcon>
            <Menu
              id="long-menu"
              anchorEl={languageAnchor}
              keepMounted
              open={open}
              onClose={closeLanguage}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              PaperProps={{
                className: classes.languageMenu,
              }}
              value={locale}
              onChange={handleChange}
            >
              <MenuItem
                className={classes.menu}
                onClick={() => setLanguage("en")}
              >
                English
              </MenuItem>
              <Divider />
              <MenuItem
                className={classes.menu}
                onClick={() => setLanguage("hi")}
              >
                Hindi
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {alert ? (
          <Snackbar
            open={Boolean(alert)}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert variant="filled" onClose={handleClose} severity={alert}>
              {message}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
      </div>
      {/* </LocaleContext.Provider> */}
    </>
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
