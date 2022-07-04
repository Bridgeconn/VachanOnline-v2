import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Login from "../login/Login";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import LoginMenu from "../login/LoginMenu";
import IconButton from "@material-ui/core/IconButton";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Tooltip from "@material-ui/core/Tooltip";
import { BLUE } from "../../store/colorCode";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    display: "flex",
    width: "100%",
    position: "absolute",
    height: 74,
  },
  appBar: {
    background: BLUE,
    padding: "0px 10px",
    marginBottom: "10px",
    zIndex: 900,
  },
  title: {
    flexGrow: 1,
    width: "30%",
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      lineHeight: "75px",
    },
  },
  icon: {
    height: 50,
  },
  logo: {
    height: 60,
  },
  button: {
    margin: theme.spacing(0),
    color: "white",
    borderColor: "white",
    backgroundColor: "#007bff",
  },
  feedback: {
    color: "#e0e0e0",
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: "#d0d0d0",
    },
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
}));

export default function TopBar({ login, userDetails }) {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.title}>
            <Link to="/">
              <img src={favicon} alt={"icon"} className={classes.icon} />
              {mobile === true ? (
                ""
              ) : (
                <img src={logo} alt={"logo"} className={classes.logo} />
              )}
            </Link>
          </div>
          {window.location.pathname.startsWith("/read") ? (
            process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
              <Link to="/biblestories">
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={classes.feedback}
                  title="Bible Stories"
                  aria-label="bible stories"
                  target="_blank"
                  rel="noopener"
                >
                  {mobile === true ? "Stories" : "Bible Stories"}
                </Button>
              </Link>
            ) : (
              ""
            )
          ) : (
            <Link to="/read">
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className={classes.feedback}
                title="Study Bible"
                aria-label="bible"
                target="_blank"
                rel="noopener"
              >
                {mobile === true ? "Bible" : "Study Bible"}
              </Button>
            </Link>
          )}
          {mobile === true ? (
            ""
          ) : (
            <Tooltip title="Feedback">
              <IconButton
                aria-label="feedback"
                className={classes.feedback}
                href="https://docs.google.com/forms/d/e/1FAIpQLSd75swOEtsvWrzcQrynmCsu-ZZYktWbeeJXVxH7zNz-JIlEdA/viewform?usp=sf_link"
                target="_blank"
                rel="noopener"
              >
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          )}
          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}
