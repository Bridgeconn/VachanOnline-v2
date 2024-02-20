import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Login from "../login/Login";
import LoginMenu from "../login/LoginMenu";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SIGNBIBLE } from "../../store/views";
import { SETVALUE } from "../../store/actions";
import { WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { Box, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import MultiLanguageDropdown from "../common/MultiLanguageDropdown";
import { styled } from "@mui/system";

const ImageLogo = styled("img")(({ theme }) => ({
  height: 60,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const ImageFavicon = styled("img")({
  height: 50,
});
const I = styled("i")({ padding: "8px 8px 0", color: WHITE });

const PageHeader = (props) => {
  const [loginButton, setLoginButton] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
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
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        top: 0,
        display: "flex",
        width: "100%",
      }}
    >
      <AppBar
        sx={{
          background: "rgba(0,0,0,0.5)",
          paddingLeft: { lg: 1.25, xs: 0 },
          zIndex: 1,
        }}
        position="static"
      >
        <Toolbar
          sx={{
            [`&.MuiToolbar-root
           `]: { paddingX: 1.5, paddingY: 0 },
          }}
        >
          <Box flexGrow={1}>
            <Link to={{ pathname: "/study" }}>
              <ImageFavicon src={favicon} alt="logo" />
              {mobile === true ? "" : <ImageLogo src={logo} alt={"logo"} />}
            </Link>
          </Box>
          <Link
            to={{
              pathname: "/audiobible",
            }}
          >
            {mobileLandscape ? (
              <I className={`material-icons`}>headphones</I>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                sx={{
                  color: "#e0e0e0",
                  marginTop: 0.25,
                  marginRight: 1.25,
                  "&:hover": {
                    color: "#d0d0d0",
                  },
                }}
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
                <I
                  className={`material-icons`}
                  onClick={() => setParallelView(SIGNBIBLE)}
                >
                  sign_language
                </I>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: "#e0e0e0",
                    marginTop: 0.25,
                    marginRight: 1.25,
                    "&:hover": {
                      color: "#d0d0d0",
                    },
                  }}
                  title={t("landingPageHeaderISLVToolTip")}
                  aria-label="sign language bible"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setParallelView(SIGNBIBLE)}
                  startIcon={<i className="material-icons">sign_language</i>}
                >
                  {isTablet ? t("ISLVTopBarBtnTab") : t("ISLVBibleText")}
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
                <I className={`material-icons`}>music_note</I>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: "#e0e0e0",
                    marginTop: 0.25,
                    marginRight: 1.25,
                    "&:hover": {
                      color: "#d0d0d0",
                    },
                  }}
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
                <I className={`material-icons`}>auto_stories</I>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: "#e0e0e0",
                    marginRight: 0.5,
                    marginTop: 0.25,
                    "&:hover": {
                      color: "#d0d0d0",
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
          )}
          {process.env.REACT_APP_DOCUMENT_URL ? (
            <Link to={process.env.REACT_APP_DOCUMENT_URL} target="_blank">
              {mobileLandscape ? (
                ""
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  sx={{
                    color: "#e0e0e0",
                    marginTop: 0.25,
                    marginRight: 1.25,
                    "&:hover": {
                      color: "#d0d0d0",
                    },
                  }}
                  title={t("landingHelpBtn")}
                  aria-label="Help"
                  rel="noopener"
                  startIcon={<i className="material-icons">help_outline</i>}
                >
                  {t("landingHelpBtn")}
                </Button>
              )}
            </Link>
          ) : (
            ""
          )}
          {loginButton}
          <MultiLanguageDropdown
            iconstyle={{
              cursor: "pointer",
              marginLeft: 0.375,
              width: "25px",
              fontSize: "2rem",
            }}
          />
        </Toolbar>
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
      </AppBar>
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
    setParallelView: (value) =>
      dispatch({ type: SETVALUE, name: "parallelView", value: value }),
    setLocale: (value) =>
      dispatch({ type: SETVALUE, name: "locale", value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
