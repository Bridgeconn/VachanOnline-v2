import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Login from "../login/Login";
import Badge from "@material-ui/core/Badge";
import LoginMenu from "../login/LoginMenu";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { SIGNBIBLE } from "../../store/views";
import * as actions from "../../store/actions";
import { isFeatureNew } from "../common/utility";

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
  signBible: {
    color: "#e0e0e0",
    marginTop: 2,
    "&:hover": {
      color: "#d0d0d0",
    },
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
}));

const PageHeader = (props) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("sm"));
  let { login, userDetails, setParallelView } = props;


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
          </div>
          {process.env.REACT_APP_SIGNBIBLE_URL !== undefined && mobile === false ? (
            <Badge
              className={classes.islBadge}
              color="secondary"
              variant="dot"
              badgeContent={isFeatureNew('12-01-2022')}
            >
              <Link
                to={{
                  pathname: "/read",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className={classes.signBible}
                  title="Sign Language Bible"
                  aria-label="sign language bible"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setParallelView(SIGNBIBLE)}
                >
                  {mobileLandscape === true ? "ISLV" : "Sign Language (ISLV) Bible"}
                </Button>
              </Link>
            </Badge>
          ) : (
            ""
          )}
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
                {mobileLandscape === true ? "Stories" : "Bible Stories"}{" "}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setParallelView: (value) =>
      dispatch({
        type: actions.SETVALUE,
        name: "parallelView",
        value: value,
      }),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PageHeader);
