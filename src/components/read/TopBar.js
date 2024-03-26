import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Snackbar, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Login from "../login/Login";
import logo from "../common/images/logo1.png";
import favicon from "../common/images/favicon_black.png";
import LoginMenu from "../login/LoginMenu";
import { BLACK, WHITE } from "../../store/colorCode";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import SearchPassage from "../search/SearchPassage";
import { Alert } from "@mui/material";
import i18n from "../../i18n";
import MultiLanguageDropdown from "../common/MultiLanguageDropdown";
import TopBarDrawer from "./TopBarDrawer";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

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

const TopBar = (props) => {
  const theme = useTheme();
  const [loginButton, setLoginButton] = React.useState();
  const [hideIcons, setHideIcons] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const path = location?.pathname;
  let { login, userDetails, setParallelView, setLocale } = props;
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    const key = event.key;
    if (event.type === "keydown" && (key === "Tab" || key === "Shift")) {
      return;
    }
    setOpen(open);
  };

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

  const searchBox = () => {
    return <SearchPassage setHideIcons={setHideIcons} />;
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        position: "absolute",
        height: { lg: 74, xs: 60 },
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: WHITE,
          paddingX: { lg: 1.25, xs: 0 },
          paddingY: { lg: 0, xs: 0 },
          marginBottom: { lg: 1.25, xs: 0 },
          border: BLACK,
          color: BLACK,
          zIndex: 900,
        }}
      >
        <Toolbar sx={{ paddingX: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              width: { lg: "auto", xs: "10%" },
              "& a": {
                color: "inherit",
                textDecoration: "none",
                lineHeight: "75px",
              },
            }}
          >
            <span onClick={toggleDrawer(true)}>
              <Box
                sx={{
                  width: 40,
                  paddingTop: 0.75,
                  paddingLeft: 1.25,
                  color: BLACK,
                  "& p": {
                    color: "#000",
                    fontSize: "0.65rem",
                    paddingTop: 0.625,
                  },
                }}
              >
                <MenuIcon
                  sx={{
                    marginTop: "4px",
                    marginLeft: "-10px",
                    height: "2em",
                    fontSize: "1.8rem",
                  }}
                />
              </Box>
            </span>

            <Link to="/">
              <ImageStyle src={favicon} alt={"icon"} />
              <ImageStyleLogo src={logo} alt={"logo"} />
            </Link>
          </Box>
          {path.startsWith("/read") ? searchBox() : ""}
          {mobileView && hideIcons ? (
            ""
          ) : (
            <>
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

        <TopBarDrawer
          toggleDrawer={toggleDrawer}
          open={open}
          setParallelView={setParallelView}
        />
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
    setParallelView: (value) =>
      dispatch({ type: SETVALUE, name: "parallelView", value: value }),
    setLocale: (value) =>
      dispatch({ type: SETVALUE, name: "locale", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
