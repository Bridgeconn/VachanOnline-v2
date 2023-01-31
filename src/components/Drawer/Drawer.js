import * as React from "react";
import * as views from "../../store/views";
import * as actions from "../../store/actions";
import firebase from "firebase/app";

import clsx from "clsx";
import { Button, Drawer, ListItem, makeStyles } from "@material-ui/core";
import Login from "../login/Login";
import LoginMenu from "../login/LoginMenu";
import MenuItem from "../read/MenuItem";
import { connect } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  iconText: {
    padding: 8,
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
});

function SideDrawer(props) {
  const [loginButton, setLoginButton] = React.useState();
  const { login, toggleDrawer, userDetails, state, setValue } = props;
  const classes = useStyles();
  const signOut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function () {
        setValue("login", false);
        setValue("userDetails", {
          uid: null,
          email: null,
        });
        console.log("Sign Out Successful");
      })
      .catch(function (error) {
        console.log("Error Signing Out");
      });
  };

  React.useEffect(() => {
    setLoginButton(
      login ? (
        <LoginMenu userDetails={userDetails} base="drawer" />
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Login />
        </div>
      )
    );
  }, [login, userDetails]);
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={!login ? "closeButton" : "logMenuBox closeButton"}>
        <ListItem>{loginButton}</ListItem>
      </div>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.DRAWERCOMMENTARY}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className={"bottomBar"}>
          <MenuItem
            icon="sign_language"
            title="ISLV Bible"
            item={views.DRAWERSIGNBIBLE}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="image"
            title="infographics"
            item={views.INFOGRAPHICS}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="volume_up"
            title="Audio Bible"
            item={views.AUDIO}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="videocam"
            title="Videos"
            item={views.VIDEO}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="format_shapes"
            title="Dictionaries"
            item={views.DICTIONARY}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="bookmark"
            title="Bookmarks"
            item={views.BOOKMARK}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="border_color"
            title="Highlights"
            item={views.HIGHLIGHT}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem icon="note" title="Notes" item={views.NOTE} base="drawer" />
        </div>
      </ListItem>
      {login ? (
        <ListItem className={classes.iconText}>
          <div className="bottomBar">
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </ListItem>
      ) : null}
    </div>
  );
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(null, mapDispatchToProps)(SideDrawer);
