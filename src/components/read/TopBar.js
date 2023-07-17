import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
    "&:hover": {
      color: BLACK,
    },
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
    padding: "8px 16px 0",
    color: BLACK,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();

  let { login, userDetails, setParallelView, mobileView } = props;
  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);
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
          title="Sign Language Bible"
          aria-label="sign language bible"
          target="_blank"
          rel="noOpener"
          onClick={setParallelView}
          startIcon={<i className="material-icons">sign_language</i>}
        >
          Sign Language Bible (ISLV)
        </Button>
      );
    };
    if (process.env.REACT_APP_SIGNBIBLE_URL === undefined) {
      return "";
    }
    return window.location.pathname.startsWith("/biblestories") ? (
      <Link to="/read">{Btn()}</Link>
    ) : (
      Btn()
    );
  };
  const BibleStoriesButton = () => {
    return process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
      <Link to="/biblestories">
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          title="Bible Stories"
          aria-label="bible stories"
          target="_blank"
          rel="noopener"
        >
          {mobileView === true ? "Stories" : "Bible Stories"}
        </Button>
      </Link>
    ) : (
      ""
    );
  };
  const SongsButton = () => {
    return process.env.REACT_APP_SONGS_URL !== undefined ? (
      <Link to="/songs">
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          title="Songs"
          aria-label="songs"
          target="_blank"
          rel="noopener"
        >
          Songs
        </Button>
      </Link>
    ) : (
      ""
    );
  };

  const StudyBibleButton = () => {
    return (
      <Link to="/read">
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          title="Study Bible"
          aria-label="bible"
          target="_blank"
          rel="noopener"
        >
          {mobileView === true ? "Bible" : "Study Bible"}
        </Button>
      </Link>
    );
  };
  const FeedbackButton = () => {
    return (
      <Tooltip title="Feedback">
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
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.title}>
            <Link to="/">
              <img src={favicon} alt={"icon"} className={classes.icon} />
              <img src={logo} alt={"logo"} className={classes.logo} />
            </Link>
          </div>

          <div>{ISLButton()}</div>
          {window.location.pathname.startsWith("/read")
            ? BibleStoriesButton()
            : StudyBibleButton()}
          {window.location.pathname.startsWith("/read")
            ? SongsButton()
            : BibleStoriesButton()}
          {FeedbackButton()}
          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParallelView: () =>
      dispatch({ type: SETVALUE, name: "parallelView", value: SIGNBIBLE }),
  };
};
export default connect(null, mapDispatchToProps)(TopBar);
