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
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    display: "flex",
    width: "100%",
    position: "absolute",
    height: 74,
    [theme.breakpoints.only("xs")]: {
      height: 60,
    },
  },
  appBar: {
    background: BLUE,
    padding: "0px 10px",
    marginBottom: "10px",
    zIndex: 900,
    [theme.breakpoints.only("xs")]: {
      marginBottom: 0,
      padding: 0,
    },
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
    [theme.breakpoints.only("xs")]: {
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
    color: "#e0e0e0",
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: "#d0d0d0",
    },
  },
  feedback: {
    color: "#e0e0e0",
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: "#d0d0d0",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
        <MenuItem icon="sign_language" title="ISLV Bible" item={SIGNBIBLE} />
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="inherit"
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
          color="inherit"
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
  const StudyBibleButton = () => {
    return (
      <Link to="/read">
        <Button
          variant="outlined"
          size="small"
          color="inherit"
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
          <FeedbackIcon />
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
