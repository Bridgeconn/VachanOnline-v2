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
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  legacySite: {
    textTransform: "unset",
    fontSize: "1.2rem",
    margin: "3px 0 0 15px",
    "&:hover": {
      color: "inherit",
    },
  },
}));

const PageHeader = ({ login, userDetails }) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
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
              <img src={logo} alt={"logo"} className={classes.logo} />
            </Link>
            <Button
              color="inherit"
              className={classes.legacySite}
              startIcon={<ReplyIcon />}
              href="https://legacy.vachanonline.com/"
              target="_blank"
              rel="noopener"
            >
              Back to classic site
            </Button>
          </div>
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
