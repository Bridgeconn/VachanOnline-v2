import React from "react";
import { Link } from "react-router-dom";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import * as views from "../../store/views";
import Login from "../login/Login";
import logo from "../common/images/logo.png";
import favicon from "../common/images/favicon.png";
import LoginMenu from "../login/LoginMenu";
import IconButton from "@material-ui/core/IconButton";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Tooltip from "@material-ui/core/Tooltip";
import { BLUE } from "../../store/colorCode";

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
      display: "none",
    },
  },
  logo: {
    height: 60,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(15),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 240,
      },
    },
  },
  button: {
    margin: theme.spacing(0),
    color: "white",
    borderColor: "white",
    backgroundColor: "#007bff",
  },
  form: {
    display: "inline-block",
    marginTop: 7,
    float: "right",
    lineHeight: "72px",
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
  },
}));

const ParallelSwitch = withStyles({
  switchBase: {
    "&$checked": {
      "& + $track": {
        backgroundColor: "white",
      },
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function TopBar({
  pScroll,
  setValue,
  parallelView,
  login,
  userDetails,
  syncPanel,
}) {
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);
  const handleChange = () => (event) => {
    setValue("parallelScroll", event.target.checked);
    if (event.target.checked) {
      syncPanel("panel1", "panel2");
    }
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.title}>
            <Link to="/">
              {" "}
              <img src={favicon} alt={"icon"} className={classes.icon} />
              <img src={logo} alt={"logo"} className={classes.logo} />{" "}
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
            {parallelView === views.PARALLELBIBLE ? (
              <FormGroup className={classes.form}>
                <FormControlLabel
                  control={
                    <ParallelSwitch
                      checked={pScroll}
                      onChange={handleChange()}
                      value="checked"
                      color="default"
                    />
                  }
                  label="Parallel Scroll"
                />
              </FormGroup>
            ) : (
              ""
            )}
            {/* <SerachBox /> */}
          </div>
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
          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
}
