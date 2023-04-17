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
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Badge from "@material-ui/core/Badge";
import { isFeatureNew } from "../common/utility";

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
    [theme.breakpoints.down("xs")]: {
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
    "&:hover": {
      color: "#d0d0d0",
    },
  },
  islBadge: {
    marginRight: 8,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("sm"));
  let { login, userDetails, setParallelView } = props;
  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);

  const ISLButton = () => {
    const Btn = () => {
      return (
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
          {mobileLandscape === true ? "ISLV" : "Sign Language Bible (ISLV)"}
        </Button>
      );
    };
    return process.env.REACT_APP_SIGNBIBLE_URL !== undefined &&
      mobile === false ? (
      <Badge
        className={classes.islBadge}
        color="secondary"
        variant="dot"
        badgeContent={isFeatureNew("12-01-2022")}
      >
        {window.location.pathname.startsWith("/biblestories") ? (
          <Link to="/read">{Btn()}</Link>
        ) : (
          Btn()
        )}
      </Badge>
    ) : (
      ""
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
          {mobileLandscape === true ? "Stories" : "Bible Stories"}
        </Button>
      </Link>
    ) : (
      ""
    );
  };
  const HymnSongs = () => {
    return (
      <Link to="/song">
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          aria-label="Hymn Songs"
          className={classes.button}
          href="/song"
          rel="noopener"
          title="Hymn Songs"
        >
          Hymn Songs
        </Button>
      </Link>
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
          {mobile === true ? "Bible" : "Study Bible"}
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
          {ISLButton()}
          {window.location.pathname.startsWith("/biblestories")
            ? StudyBibleButton()
            : BibleStoriesButton()}
          {window.location.pathname.startsWith("/song")
            ? StudyBibleButton()
            : HymnSongs()}

          {FeedbackButton()}

          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
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

export default connect(null, mapDispatchToProps)(TopBar);
