import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import logo from "../common/images/logo.png";

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
  },
  title: {
    flexGrow: 1,
    "& img": {
      height: 50,
    },
  },
}));

const PageHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link
            className={classes.title}
            to={{
              pathname: "/read",
              // hash: "#submit",
              // search: "?quick-search=true",
            }}
          >
            <img src={logo} alt={"logo"} />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default PageHeader;
