import React from "react";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
/* import SerachBox from "../common/SearchBox"; */
import logo from "../common/images/logo.png";
const useStyles = makeStyles(theme => ({
  root: {
    top: 0,
    display: "flex",
    width: "100%",
    position: "absolute",
    height: 74
  },
  appBar: {
    background: "#089de3",
    padding: "0px 10px",
    marginBottom: "10px"
  },
  title: {
    flexGrow: 1,
    width: "30%",
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      lineHeight: "75px"
    },
    "& img": {
      height: 50
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginRight: theme.spacing(15),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 240
      }
    }
  },
  button: {
    margin: theme.spacing(0),
    color: "white",
    borderColor: "white",
    backgroundColor: "#007bff"
  },

  form: {
    display: "inline-block",
    marginTop: 7,
    float: "right",
    lineHeight: "72px"
  }
}));
export default function TopBar({ pScroll, setValue, parallelBible }) {
  const classes = useStyles();

  const handleChange = () => event => {
    setValue("parallelScroll", event.target.checked);
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
              <img src={logo} alt={"logo"} />{" "}
            </Link>
            {parallelBible ? (
              <FormGroup className={classes.form}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={pScroll}
                      onChange={handleChange()}
                      value="checked"
                      color="primary"
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
