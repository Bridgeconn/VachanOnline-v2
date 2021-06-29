import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import Login from "../login/Login";
import LoginMenu from "../login/LoginMenu";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  legacySite: {
    textTransform: "unset",
    fontSize: "1.2rem",
    margin: "3px 0 0 15px",
    "&:hover": {
      color: "inherit",
    },
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
}));

const PageHeader = ({ login, userDetails }) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.links}>
            <Link to={{ pathname: "/read" }}>
              <img src={favicon} alt="logo" className={classes.favicon} />
              {mobile === true ? (
                ""
              ) : (
                <img src={logo} alt={"logo"} className={classes.logo} />
              )}
            </Link>
            <Button
              color="inherit"
              className={classes.legacySite}
              startIcon={<ReplyIcon />}
              href="https://legacy.vachanonline.com/"
              target="_blank"
              rel="noopener"
            >
              {mobile === true ? "Classic" : "Back to classic site"}
            </Button>
          </div>
          {process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
            <Link to="/biblestories">
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                className={classes.stories}
                title="Bible Stories"
                aria-label="bible stories"
                target="_blank"
                rel="noopener"
              >
                {mobile === true ? "Stories" : "Bible Stories"}{" "}
              </Button>
            </Link>
          ) : (
            ""
          )}
          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.local.login,
    userDetails: state.local.userDetails,
  };
};

export default connect(mapStateToProps)(PageHeader);
