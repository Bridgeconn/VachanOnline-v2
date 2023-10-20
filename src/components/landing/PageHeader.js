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
            <Link to={{ pathname: "/study" }}>
              <img src={favicon} alt="logo" className={classes.favicon} />
              {mobile === true ? (
                ""
              ) : (
                <img src={logo} alt={"logo"} className={classes.logo} />
              )}
            </Link>
          </div>
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
                title="Audio Bible"
                aria-label="audio bible"
                target="_blank"
                rel="noopener"
                startIcon={<i className="material-icons">headphones</i>}
              >
                Audio
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
                  title="Sign Language Bible"
                  aria-label="sign language bible"
                  target="_blank"
                  rel="noopener"
                  onClick={() => setParallelView(SIGNBIBLE)}
                  startIcon={<i className="material-icons">sign_language</i>}
                >
                  ISLV Bible
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
                  title="Songs"
                  aria-label="Song"
                  target="_blank"
                  rel="noopener"
                  startIcon={<i className="material-icons">music_note</i>}
                >
                  songs
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
                  title="Bible Stories"
                  aria-label="bible stories"
                  target="_blank"
                  rel="noopener"
                  startIcon={<i className="material-icons">auto_stories</i>}
                >
                  Bible Stories
                </Button>
              )}
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
      dispatch({ type: SETVALUE, name: "parallelView", value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
