import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Login from "../login/Login";
import LoginMenu from "../login/LoginMenu";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { SIGNBIBLE } from "../../store/views";
import { SETVALUE } from "../../store/actions";
import { WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MultiLanguageDropdown from "../common/MultiLanguageDropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    display: "flex",
    width: "100%",
  },
  appBar: {
    background: "rgba(0,0,0,0.5)",
    paddingLeft: 10,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  links: {
    flexGrow: 1,
  },
  logo: {
    height: 60,
  },
  favicon: {
    height: 50,
  },
  stories: {
    color: "#e0e0e0",
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: "#d0d0d0",
    },
  },
  signBible: {
    color: "#e0e0e0",
    marginTop: 2,
    marginRight: 10,
    "&:hover": {
      color: "#d0d0d0",
    },
  },
  languageMenu: {
    width: 150,
  },
  islBadge: {
    marginRight: 8,
  },
  legacySite: {
    textTransform: "unset",
    fontSize: "1.2rem",
    margin: "3px 0 0 15px",
    "&:hover": {
      color: "inherit",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  islIcon: {
    padding: "8px 12px 0",
    color: WHITE,
  },
  languageIcon: {
    cursor: "pointer",
    marginLeft: 10,
    width: "25px",
    fontSize: "2rem",
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("sm"));
  let { login, userDetails, setParallelView, setLocale } = props;
  const { t } = useTranslation();
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert("");
    setMessage("");
  };

  React.useEffect(() => {
    setLoginButton(
      login ? (
        <LoginMenu userDetails={userDetails} />
      ) : (
        <Login setMessage={setMessage} setAlert={setAlert} />
      )
    );
  }, [login, userDetails]);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.links}>
            <Link to={{ pathname: "/study" }}>
              <img src={favicon} alt="logo" className={classes.favicon} />
              {mobile === true ? (
                ""
              ) : (
                <img src={logo} alt={"logo"} className={classes.logo} />
              )}
            </Link>
          </div>
          <Link to={process.env.REACT_APP_DOCUMENT_URL} target="_blank">
            {mobileLandscape ? (
              // <i className={`material-icons ${classes.islIcon}`}>help_outline</i>
              ""
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className={classes.signBible}
                title="help"
                aria-label="help"
                rel="noopener"
                startIcon={<i className="material-icons">help_outline</i>}
              >
                Help
              </Button>
            )}
          </Link>
          <Link
            to={{
              pathname: "/audiobible",
            }}
          >
            {mobileLandscape ? (
              <i className={`material-icons ${classes.islIcon}`}>headphones</i>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className={classes.signBible}
                title={t("audioBibleText")}
                aria-label="audio bible"
                target="_blank"
                rel="noopener"
                startIcon={<i className="material-icons">headphones</i>}
              >
                {t("landingPageHeaderAudio")}
              </Button>
            )}
          </Link>
          {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? (
            <Link
              to={{
                pathname: "/study",
              }}
            >
              {mobileLandscape ? (
                <i
                  className={`material-icons ${classes.islIcon}`}
                  onClick={() => setParallelView(SIGNBIBLE)}
                >
                  sign_language
                </i>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={classes.signBible}
                  title={t("landingPageHeaderISLVToolTip")}
                  aria-label="sign language bible"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setParallelView(SIGNBIBLE)}
                  startIcon={<i className="material-icons">sign_language</i>}
                >
                  {t("ISLVBibleText")}
                </Button>
              )}
            </Link>
          ) : (
            ""
          )}
          {process.env.REACT_APP_SONGS_URL !== undefined ? (
            <Link
              to={{
                pathname: "/songs",
              }}
            >
              {mobileLandscape ? (
                <i className={`material-icons ${classes.islIcon}`}>
                  music_note
                </i>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={classes.signBible}
                  title={t("songsText")}
                  aria-label="Song"
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
          )}
          {process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
            <Link to="/biblestories">
              {mobileLandscape ? (
                <i className={`material-icons ${classes.islIcon}`}>
                  auto_stories
                </i>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={classes.stories}
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
          )}
          {loginButton}
          <MultiLanguageDropdown iconstyle={classes.languageIcon} />
        </Toolbar>
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
      </AppBar>
    </div>
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
    setParallelView: (value) =>
      dispatch({ type: SETVALUE, name: "parallelView", value: value }),
    setLocale: (value) =>
      dispatch({ type: SETVALUE, name: "locale", value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
